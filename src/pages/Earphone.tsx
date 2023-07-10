import { CategoriesID, Product } from "../types/jamma";

import { Heading } from "@chakra-ui/react";
import Skeletn from "../components/Loading2";
import SmProductCardGrid from "../components/ProductCards/SmProductCardGrid";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";
import { useProducts } from "../hooks/products";

export default function Earphone(){
  const {data: products, isLoading } = useProducts(undefined, [CategoriesID.Earphone]);
  document.title = "Earphones - Jamma"

  return (
    <Skeletn loading={isLoading} loader={<SmProductCardsLoader/>}>
      <Heading>Earphones</Heading>
      <SmProductCardGrid products={products as unknown as Product[]} />
    </Skeletn>
  )
}