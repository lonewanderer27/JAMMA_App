import '../App.css'

import { Heading, SimpleGrid } from '@chakra-ui/react';
import { useProducts } from '../hooks/products';
import Skeletn from '../components/Loading2';
import SmProductCardsLoader from '../components/Loaders/SmProductCardsLoader';
import SmProductCardGrid from '../components/ProductCards/SmProductCardGrid';
import { Product } from '../types/jamma';

export default function Home() {
  const {data: products, isLoading, error } = useProducts();
  document.title = "All Products - JAMMA"

  return (
    <Skeletn loading={isLoading} loader={<SmProductCardsLoader/>}>
      <Heading>
        All Products
      </Heading>
      <SmProductCardGrid products={products as unknown as Product[]} />
    </Skeletn>
  )
}