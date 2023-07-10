import "../App.css";

import { Heading } from "@chakra-ui/react";
import { Product } from "../types/jamma";
import Skeletn from "../components/Loading2";
import SmProductCardGrid from "../components/ProductCards/SmProductCardGrid";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";
import { useProducts } from "../hooks/products";

export default function AllProducts() {
  const { data: products, isLoading } = useProducts();
  document.title = "All Products - JAMMA";

  return (
    <Skeletn loading={isLoading} loader={<SmProductCardsLoader />}>
      <Heading>All Products</Heading>
      <SmProductCardGrid products={products as unknown as Product[]} />
    </Skeletn>
  );
}
