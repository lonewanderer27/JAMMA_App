import { client } from "../client"
import { useQuery } from "@supabase-cache-helpers/postgrest-swr"

export function useProfile (id: string) {
  return useQuery(
    client
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
}