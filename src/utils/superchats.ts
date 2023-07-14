import { Profile } from "../types/jamma";
import { client } from "../client";

export function flagSuperchat(
  superchat: number,
  profile: string,
  reason: string,
  description: string
) {
  return client
    .from("superchats_flags")
    .upsert({ superchat, profile, reason, description });
}

export function getUpvotes(superchat: number) {
  return client
    .from("superchats_votes")
    .select("profile")
    .eq("superchat", superchat);
}

export function unvote(superchat: number, profile: string) {
  return client
    .from("superchats_votes")
    .delete()
    .eq("superchat", superchat)
    .eq("profile", profile);
}

export function upvote(superchat: number, profile: string) {
  return client
    .from("superchats_votes")
    .upsert({ superchat, profile, vote: 1 })
    .eq("superchat", superchat)
    .eq("profile", profile);
}

export function downvote(superchat: number, profile: string) {
  return client
    .from("superchats_votes")
    .upsert({ superchat, profile, vote: -1 })
    .eq("superchat", superchat)
    .eq("profile", profile);
}

export function insertGlobalChat(profile: Profile, message: string) {
  return client.from("superchats").insert({ message, profile: profile.id });
}

export function insertGlobalChatAnon(message: string) {
  return client.from("superchats").insert({ message });
}
