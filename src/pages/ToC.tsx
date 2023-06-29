import { Heading } from "@chakra-ui/react"
import { useResetNextParam } from "../hooks/misc"

export default function ToC() {
  document.title = "Terms and Conditions - JAMMA"

  useResetNextParam()
  return (
    <div>
      <Heading>Terms and Conditions</Heading>
    </div>
  )
}