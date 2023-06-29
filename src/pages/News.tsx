import { Heading } from "@chakra-ui/react"
import { useResetNextParam } from "../hooks/misc"

export default function News() {
  document.title = "News - JAMMA"

  useResetNextParam()
  return (
    <div>
      <Heading>News</Heading>
    </div>
  )
}