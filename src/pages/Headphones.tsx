import { CategoriesID, Product } from "../types/jamma";

import { Heading } from "@chakra-ui/react";
import Skeletn from "../components/Loading2";
import SmProductCardGrid from "../components/ProductCards/SmProductCardGrid";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";
import { useProducts } from "../hooks/products";

export default function Headphones() {
  const { data: products, isLoading } = useProducts(undefined, [
    CategoriesID.Headphone,
  ]);
  document.title = "Headphones - Jamma";

  return (
    <Skeletn loading={isLoading} loader={<SmProductCardsLoader />}>
      <Heading>Headphones</Heading>
      <SmProductCardGrid products={products as unknown as Product[]} />
    </Skeletn>
  );
}
