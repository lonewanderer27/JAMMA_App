import { Product } from "../../types/jamma";
import { SimpleGrid } from "@chakra-ui/react";
import XsProductCard from "./XsProductCard";

export default function XsProductCardGrid(props: {
  products: Product[] | undefined;
}) {
  return (
    <SimpleGrid columns={{ base: 3, lg: 4 }} gap={2}>
      {props.products != undefined &&
        props.products.map((product) => (
          <XsProductCard key={product.id} {...product} />
        ))}
    </SimpleGrid>
  );
}
