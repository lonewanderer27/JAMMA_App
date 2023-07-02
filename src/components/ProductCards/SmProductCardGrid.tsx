import { SimpleGrid } from "@chakra-ui/react"
import { Product } from "../../types/jamma"
import SmProductCard from "./SmProductCard"

export default function SmProductCardGrid(props: {
  products: Product[] | undefined
}) {
  return (
    <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4, xl: 5}} gap={5}>
      {props.products != undefined && props.products.map((product) => (
        <SmProductCard key={product.id} {...product} />
      ))}
    </SimpleGrid>
  )
}