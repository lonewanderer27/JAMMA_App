import { useRecoilValue } from "recoil";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar"
import XlProductCard from "../components/ProductCards/XlProductCard";
import { useFetchProducts } from "../hooks/products";
import { Categories, CategoriesID } from "../types/jamma";
import { productsAtom } from "../atoms/products";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import SmProductCard from "../components/ProductCards/SmProductCard";

export default function Smartwatch(){
  const products = useRecoilValue(productsAtom(CategoriesID.Smartwatch));

  return (
    <Loading>
      <Heading>Smartwatches</Heading>
      <SimpleGrid columns={{base: 2, sm: 3, lg: 6}} gap={5}>
        {products !== undefined && products.map((product) => (
          <SmProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Loading>
  )
}