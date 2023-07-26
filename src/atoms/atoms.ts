import { AtomEffect, atom, selector } from "recoil";
import { PostgrestError, Session } from "@supabase/supabase-js";

import { CredInput } from "../types/jamma";
import { Profile } from "../types/jamma";
import { getProfile } from "../utils/user";

export function log(name: string, data: unknown) {
  console.log(name);
  console.table(data);
}

export const sessionStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedSession = sessionStorage.getItem(key);
    if (
      savedSession !== null &&
      savedSession !== "null" &&
      savedSession !== undefined &&
      savedSession !== "undefined"
    ) {
      setSelf(JSON.parse(savedSession));
    }
    onSet((newValue) => {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const credInputState = atom<CredInput>({
  key: "cred",
  default: {
    email: "",
    password: "",
    fullname: "",
  },
  effects: [({ onSet }) => onSet((newCred) => log("cred", newCred))],
});

export const nextPathAtom = atom<string | null>({
  key: "nextPath",
  default: null,
  effects_UNSTABLE: [sessionStorageEffect<string | null>("nextPath")],
});

export const sessionState = atom<Session | undefined>({
  key: "session",
  default: undefined,
  effects_UNSTABLE: [sessionStorageEffect<Session | undefined>("session")],
});

export const profileState = selector<Profile | null>({
  key: "profile",
  get: async ({ get }) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const session = get(sessionState);

    if (session) {
      const { data } = await getProfile(get(sessionState)!.user.id);
      return data as Profile;
    } else {
      return null;
    }
  },
});

export const loadingState = atom<boolean>({
  key: "loading",
  default: false,
  effects: [({ onSet }) => onSet((newLoading) => log("loading", newLoading))],
});

export const errorState = atom<PostgrestError | null>({
  key: "error",
  default: null,
  effects: [({ onSet }) => onSet((newError) => log("error", newError))],
});
