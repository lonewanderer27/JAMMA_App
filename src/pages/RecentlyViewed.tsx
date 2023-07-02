import { useRecoilValueLoadable } from "recoil";
import { recentlyViewedProducts } from "../atoms/products";
import { Heading } from "@chakra-ui/react";
import { Product } from "../types/jamma";
import SmProductCardGrid from "../components/ProductCards/SmProductCardGrid";
import Skeletn from "../components/Loading2";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";

export default function RecentlyViewed() {
  const products = useRecoilValueLoadable(recentlyViewedProducts);

  return (
    <Skeletn state={products.state} loader={<SmProductCardsLoader/>}>
      <Heading>Recently Viewed</Heading>
      <SmProductCardGrid products={products.contents as unknown as Product[]} />
    </Skeletn>
  )
}