import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

// const supabaseUrl = "https://snivqgzdabtawqfgptyd.supabase.co";
const supabaseUrl = "http://localhost:54321"
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaXZxZ3pkYWJ0YXdxZmdwdHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxOTcxNTMsImV4cCI6MjAwMTc3MzE1M30.YVKj6rD5NpY6E9LNEN4--G0aui5lGc6cuGB37yQdi8Y";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
export const client = createClient<Database>(supabaseUrl, supabaseKey);