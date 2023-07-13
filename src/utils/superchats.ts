import { Profile } from "../types/jamma";
import { client } from "../client";

export function insertGlobalChat(profile: Profile, message: string) {
  return client.from("superchats").insert({ message, profile: profile.id });
}

export function insertGlobalChatAnon(message: string) {
  return client.from("superchats").insert({ message });
}
