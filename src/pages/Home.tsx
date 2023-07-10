import '../App.css'

import { Box, Heading, Image } from "@chakra-ui/react";

import { Product } from "../types/jamma";
import Skeletn from "../components/Loading2";
import SmProductCardGrid from "../components/ProductCards/SmProductCardGrid";
import SmProductCardsLoader from "../components/Loaders/SmProductCardsLoader";
import slogan_w_motto from "../assets/slogan_w_motto.png";
import { useProducts } from "../hooks/products";

export default function Home() {
  // const { data: products, isLoading, error } = useProducts();
  document.title = "All Products - JAMMA";

  return (
    // <Skeletn loading={isLoading} loader={<SmProductCardsLoader />}>
    //   {/* <Heading>
    //     All Products
    //   </Heading> */}
    //   <Image src={slogan_w_motto} />
    //   <SmProductCardGrid products={products as unknown as Product[]} />
    // </Skeletn>
    <Box></Box>
  );
}