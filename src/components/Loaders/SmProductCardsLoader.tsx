import { SimpleGrid } from "@chakra-ui/react";
import SmProductCardLoader from "./SmProductCardLoader";

export default function SmProductCardsLoader() {
  return (
    <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={5}>
      {Array(20).fill(0).map(() => (
        <SmProductCardLoader/>
      ))}
    </SimpleGrid>
  )
}