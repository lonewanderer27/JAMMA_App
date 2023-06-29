import { useRecoilValueLoadable } from "recoil";
import { recentlyViewedAtom, recentlyViewedProducts } from "../atoms/products";
import Loading from "../components/Loading";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import SmProductCard from "../components/ProductCards/SmProductCard";
import { Product } from "../types/jamma";

export default function RecentlyViewed() {
  const products = useRecoilValueLoadable(recentlyViewedProducts);

  return (
    <Loading circle={true} loading={products.state == 'loading'}>
      <Heading>Recently Viewed</Heading>
      <SimpleGrid columns={{base: 2, sm: 3, lg: 6}} gap={5}>
        {products.state == 'hasValue' && products.contents.map((product: Product) => (
          <SmProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Loading>
  )
}