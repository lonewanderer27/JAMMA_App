import { SimpleGrid } from "@chakra-ui/react";
import SmProductCardLoader from "./SmProductCardLoader";

export default function SmProductCardsLoader() {
  return (
    <SimpleGrid columns={{base: 2, sm: 3, lg: 5, xl: 6}} gap={5}>
      {Array(20).fill(0).map(() => (
        <SmProductCardLoader/>
      ))}
    </SimpleGrid>
  )
}