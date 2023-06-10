import { supabase } from "../client"
import { CredInput } from "../types/jamma"

export const loginUser = (credInput: CredInput) => {
  return supabase.auth.signInWithPassword({
    email: credInput.email,
    password: credInput.password
  })
}

export const addUser = (credInput: CredInput) => {
  return supabase.auth.signUp({
    email: credInput.email,
    password: credInput.password,
    options: {
      data: {
        full_name: credInput.fullname
      }
    }
  })
}