import { Heading } from "@chakra-ui/react"
import { useResetNextParam } from "../hooks/misc"

export default function Admin() {
  document.title = "Admin Interface"

  useResetNextParam()
  return (
    <div>
      <Heading>Admin</Heading>
    </div>
  )
}