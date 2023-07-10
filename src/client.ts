import { Database } from "./types/supabase";
import { createClient } from "@supabase/supabase-js";

// const supabaseUrlRemote = "https://snivqgzdabtawqfgptyd.supabase.co";
// const supabaseUrlLocal = "http://localhost:54321";
// const supabaseKeyRemote = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaXZxZ3pkYWJ0YXdxZmdwdHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxOTcxNTMsImV4cCI6MjAwMTc3MzE1M30.YVKj6rD5NpY6E9LNEN4--G0aui5lGc6cuGB37yQdi8Y";
// const supabaseKeyLocal =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
// export const client = createClient<Database>(
//   supabaseUrlLocal,
//   supabaseKeyLocal
// );

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

export const client = createClient<Database>(supabaseUrl, supabaseKey);
