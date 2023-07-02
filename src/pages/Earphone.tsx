import { CategoriesID, Product } from "../types/jamma";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import SmProductCard from "../components/ProductCards/SmProductCard";
import { useProducts } from "../hooks/products";
import Skeletn from "../components/Loading2";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";
import SmProductCardGrid from "../components/ProductCards/SmProductCardGrid";

export default function Earphone(){
  const {data: products, isLoading, error } = useProducts(undefined, [CategoriesID.Earphone]);
  document.title = "Earphones - Jamma"

  return (
    <Skeletn loading={isLoading} loader={<SmProductCardsLoader/>}>
      <Heading>Earphones</Heading>
      <SmProductCardGrid products={products as unknown as Product[]} />
    </Skeletn>
  )
}