import {
  insertGlobalChat,
  insertGlobalChatAnon,
  unvote,
  upvote,
} from "../utils/superchats";
import { useEffect, useState } from "react";

import { Superchats } from "../types/jamma";
import { client } from "../client";
import { profileState } from "../atoms/atoms";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { useRecoilValueLoadable } from "recoil";

export function useUpvote(superchat: number, profile: string) {
  const [votes, setVotes] = useState<number>(0);
  const [voted, setVoted] = useState<boolean>(false);

  const upvotes = useQuery(
    client
      .from("superchats_votes")
      .select("*", { count: "exact" })
      .eq("superchat", superchat)
      .eq("vote", 1),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const upvoted = useQuery(
    client
      .from("superchats_votes")
      .select('*')
      .eq("profile", profile)
      .eq("superchat", superchat)
      .eq("vote", 1)
      .single(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleUpvote = () => {
    // you can only upvote once
    // hence if you try to upvote again, it will unupvote
    if (upvoted.data?.profile == profile) {
      // unupvote
      console.log("removing vote");
      (async () => {
        const { data } = await unvote(superchat, profile);
        console.log(data);
      })();
      setVotes((prev) => prev - 1);
      setVoted(false)
    } else {
      console.log("voting");
      (async () => {
        const { data } = await upvote(superchat, profile);
        console.log(data);
        setVotes((prev) => prev + 1);
        setVoted(true)
      })();
    }
  };

  useEffect(() => {
    if (upvotes.data != undefined) {
      setVotes(upvotes.count as number);
    }
    if (upvoted.data != undefined && upvoted.data.profile === profile) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, [upvotes, upvoted]);

  return {
    upvotes: votes,
    upvoted: voted,
    handleUpvote,
  };
}

export function useDownvote(superchat: number, profile: string) {
  const downvotes = useQuery(
    client
      .from("superchats_votes")
      .select("*", { count: "exact" })
      .eq("superchat", superchat)
      .eq("vote", -1),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  const downvoted = useQuery(
    client
      .from("superchats_votes")
      .select()
      .eq("profile", profile)
      .eq("superchat", superchat)
      .eq("vote", -1)
      .single(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    downvotes,
    downvoted,
  };
}

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

  const { data } = useQuery(client.from("superchats").select("*"), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data != undefined) {
      setSuperchats(data as unknown as Superchats[]);
    }
  }, [data]);

  useEffect(() => {
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
