import { SimpleGrid } from "@chakra-ui/react"
import { Product } from "../../types/jamma"
import SmProductCard from "./SmProductCard"

export default function SmProductCardGrid(props: {
  products: Product[] | undefined
}) {
  return (
    <SimpleGrid columns={{base: 2, sm: 3, lg: 5, xl: 6}} gap={5}>
      {props.products != undefined && props.products.map((product) => (
        <SmProductCard key={product.id} {...product} />
      ))}
    </SimpleGrid>
  )
}