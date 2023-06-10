import { AtomEffect, atom } from 'recoil';
import { Cart, CredInput, LocalCart, Product } from './types/jamma';
import {PostgrestError, Session, User} from '@supabase/supabase-js';

// import { JSession } from './types/jamma';


function log(name: string, data: unknown) {
  console.log(name)
  console.table(data)
}

const sessionStorageEffect = <T>(key: string): AtomEffect<T> => ({setSelf, onSet}) => {
  const savedSession = sessionStorage.getItem(key)
  if (
    savedSession !== null &&
    savedSession !== "null" &&
    savedSession !== undefined &&
    savedSession !== "undefined"
  ) {
    setSelf(JSON.parse(savedSession))
  }
  onSet(newValue => {
    sessionStorage.setItem(key, JSON.stringify(newValue))
  })
} 

export const credInputState = atom<CredInput>({
  key: 'cred',
  default: {
    email: '',
    password: '',
    fullname: ''
  },
  effects: [
    ({ onSet }) => onSet((newCred) => log("cred", newCred))
  ]
})

export const sessionState = atom<Session | undefined >({
  key: 'session',
  default: undefined,
  effects_UNSTABLE: [
    sessionStorageEffect<Session | undefined>('session')
  ]
})

export const userState = atom<User | undefined>({
  key: 'user',
  default: undefined,
  effects: [
    ({ onSet }) => onSet((newUser) => log("user", newUser))
  ]
})

export const cartState = atom<Cart[] | []>({
  key: 'cart',
  default: [],
  effects_UNSTABLE: [
    sessionStorageEffect<Cart[] | []>('cart'),
    ({ onSet }) => onSet((newCart) => log("cart", newCart))
  ]
})

export const localCartState = atom<LocalCart[] | []>({
  key: 'localCart',
  default: [],
  effects_UNSTABLE: [
    sessionStorageEffect<LocalCart[] | []>('localCart'),
    ({ onSet }) => onSet((newLocalCart) => log("localCart", newLocalCart))
  ]
})

export const loadingState = atom<boolean>({
  key: 'loading',
  default: true,
  effects: [
    ({ onSet }) => onSet((newLoading) => log("loading", newLoading))
  ]
})

export const errorState = atom<PostgrestError | null>({
  key: 'error',
  default: null,
  effects: [
    ({ onSet }) => onSet((newError) => log("error", newError))
  ]
})

export const productsState = atom<Product[] | []>({
  key: 'products',
  default: [],
  effects: [
    ({ onSet }) => onSet((newProducts) => log("products", newProducts))
  ]
})

export const productState = atom<Product | null>({
  key: 'product',
  default: null,
  effects: [
    ({ onSet }) => onSet((newProduct) => log("product", newProduct))
  ]
})
