import { Heading } from "@chakra-ui/react"
import { useResetNextParam } from "../hooks/misc"

export default function PrivacyPolicy() {
  document.title = "Privacy Policy - JAMMA"

  useResetNextParam()
  return (
    <div>
      <Heading>Privacy Policy</Heading>
    </div>
  )
}