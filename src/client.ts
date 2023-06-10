import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

const supabaseUrl = "https://snivqgzdabtawqfgptyd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaXZxZ3pkYWJ0YXdxZmdwdHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxOTcxNTMsImV4cCI6MjAwMTc3MzE1M30.YVKj6rD5NpY6E9LNEN4--G0aui5lGc6cuGB37yQdi8Y";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);