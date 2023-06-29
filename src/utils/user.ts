import { client } from "../client"
import { CredInput, Profile } from "../types/jamma"

export const loginUser = (credInput: CredInput) => {
  return client.auth.signInWithPassword({
    email: credInput.email,
    password: credInput.password
  })
}

export const getProfile = (id: string) => {
  return client.from('profiles').select('*').eq('id', id).single()
}

export const addUser = (credInput: CredInput) => {
  return client.auth.signUp({
    email: credInput.email,
    password: credInput.password
  })
}

export const getSession = () => {
  return sessionStorage.getItem('session')
}