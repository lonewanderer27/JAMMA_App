import { Heading } from "@chakra-ui/react";
import { useResetNextParam } from "../hooks/misc";

export default function Messages() {
  document.title = "My Messages - JAMMA";

  useResetNextParam();
  return (
    <div>
      <Heading>Messages</Heading>
    </div>
  );
}
