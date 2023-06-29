import '../App.css'

import { sessionState } from '../atoms/atoms';
import { useRecoilValue } from 'recoil';

import { Link } from 'react-router-dom'
import XlProductCard from '../components/ProductCards/XlProductCard';
import { Box, Button, HStack, Heading, SimpleGrid } from '@chakra-ui/react';
import { productsAtom } from '../atoms/products';
import Loading from '../components/Loading';
import SmProductCard from '../components/ProductCards/SmProductCard';

export default function Home() {
  const session = useRecoilValue(sessionState);
  const products = useRecoilValue(productsAtom(undefined));
  document.title = "All Products - JAMMA"

  return (
    <Loading fullScreen={true}>
      <Heading>
        All Products
      </Heading>
      {/* <Box>
        {session === undefined && <>
          <HStack>
            <Link to="login">
              <Button>
                Login
              </Button>
            </Link>
            <Link to="signup">
              <Button>
                Signup
              </Button>
            </Link>
          </HStack>
        </>}
      </Box> */}
      {/* {session === undefined && <p className="read-the-docs">
        It looks like you're not logged in yet. <br/>
        Click the button above to do so!
      </p>} */}
      <SimpleGrid columns={{base: 2, sm: 3, lg: 6}} gap={5}>
        {products !== undefined && products.map((product) => (
          <SmProductCard key={product.id} {...product} />
        ))}
      </SimpleGrid>
    </Loading>
  )
}