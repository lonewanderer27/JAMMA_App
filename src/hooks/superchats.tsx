import { insertGlobalChat, insertGlobalChatAnon } from "../utils/superchats";
import { useEffect, useState } from "react";

import { Superchats } from "../types/jamma";
import { client } from "../client";
import { profileState } from "../atoms/atoms";
import { useRecoilValueLoadable } from "recoil";

export function useSuperchats() {
  const [superchats, setSuperchats] = useState<Superchats[]>([]);
  const [message, setMessage] = useState<string>("");
  const profile = useRecoilValueLoadable(profileState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      send();
    }
  };

  const send = () => {
    if (profile.contents != undefined) {
      (async () => {
        await insertGlobalChat(profile.contents, message);
        setMessage("");
      })();
    }
    if (profile.contents == undefined) {
      (async () => {
        await insertGlobalChatAnon(message);
        setMessage("");
      })();
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await client.from("superchats").select("*");
      setSuperchats(data as unknown as Superchats[]);
    })();

    const channel = client
      .channel("public:superchats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "superchats",
        },
        (payload) => {
          console.log(payload.new);
          setSuperchats((prev) => [
            ...prev,
            payload.new as unknown as Superchats,
          ]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return {
    superchats,
    setMessage,
    message,
    handleChange,
    handleEnter,
    send,
  };
}
