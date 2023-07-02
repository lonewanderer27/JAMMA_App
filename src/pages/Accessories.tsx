import { CategoriesID, Product } from "../types/jamma";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useProducts } from "../hooks/products";
import Skeletn from "../components/Loading2";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";
import SmProductCardGrid from "../components/ProductCards/SmProductCardGrid";

export default function Accessories(){
  const {data: products, isLoading, error } = useProducts(undefined, [CategoriesID.Accessory]);
  document.title = "Accessories - Jamma"

  return (
    <Skeletn loading={isLoading} loader={<SmProductCardsLoader/>}>
      <Heading>Accesories</Heading>
      <SmProductCardGrid products={products as unknown as Product[]} />
    </Skeletn>
  )
}