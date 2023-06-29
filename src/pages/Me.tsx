import { useRecoilValueLoadable } from "recoil"
import { profileState } from "../atoms/atoms"
import { Heading } from "@chakra-ui/react"
import Loading from "../components/Loading"
import { useResetNextParam } from "../hooks/misc"

export default function Me(){
  useResetNextParam()
  const user = useRecoilValueLoadable(profileState)

  if (user.state === 'hasValue'){
    document.title = `${user.contents?.full_name}`
  }
  
  return (
    <Loading loading={user.state === 'loading'}>
      <Heading>Me</Heading>
    </Loading>
  )
}