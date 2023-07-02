import { CategoriesID } from "../types/jamma";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import SmProductCard from "../components/ProductCards/SmProductCard";
import { useProducts } from "../hooks/products";
import Skeletn from "../components/Loading2";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";

export default function Earphone(){
  const {data: products, isLoading, error } = useProducts(undefined, [CategoriesID.Earphone]);
  document.title = "Earphones - Jamma"

  return (
    <Skeletn loading={isLoading} loader={<SmProductCardsLoader/>}>
      <Heading>Earphones</Heading>
      <SimpleGrid columns={{base: 2, sm: 3, lg: 6}} gap={5}>
        {products != undefined && products.map((product) => (
          <SmProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Skeletn>
  )
}