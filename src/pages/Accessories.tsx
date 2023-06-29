import { useRecoilValue } from "recoil";
import { productsAtom } from "../atoms/products";
import Navbar from "../components/Navbar"
import XlProductCard from "../components/ProductCards/XlProductCard";
import { Categories, CategoriesID } from "../types/jamma";
import Loading from "../components/Loading";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import SmProductCard from "../components/ProductCards/SmProductCard";

export default function Accessories(){
  const products = useRecoilValue(productsAtom(CategoriesID.Accessory));

  return (
    <Loading>
      <Heading>Accessory</Heading>
      <SimpleGrid columns={{base: 2, sm: 3, lg: 6}} gap={5}>
      {products !== undefined && products.map((product) => (
        <SmProductCard key={product.id} {...product} />
      ))}
      </SimpleGrid>
    </Loading>
  )
}