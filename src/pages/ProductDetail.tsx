/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom"
import XlProductCard from "../components/ProductCards/XlProductCard";
import { useProduct, useReview } from "../hooks/products";
import { Card, CardBody, Grid, GridItem, Heading, Text, Image, Stack, Box, Flex, CardFooter, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, CardHeader, StackDivider, Divider, Progress } from "@chakra-ui/react";
import Skeletn from "../components/Loading2";
import { Review } from "../types/jamma";
import Loading from "../components/Loading";
import Reviews from "../components/Reviews";
import { phpString } from "../utils/phpString";
import { useRecoilState } from "recoil";
import { cartAtom } from "../atoms/cart";
import { addToCart } from "../utils/cart";
import ReviewItem from "../components/Reviews/ReviewItem";
import { useState } from "react";

export default function ProductDetail() {
  const { product_id } = useParams<{product_id: string}>();
  const { data: product, 
          error: productError, 
          isLoading: productLoading } = useProduct(product_id!);
  const { reviews, averageRating } = useReview(product_id!);
  const [localCart, setLocalCart] = useRecoilState(cartAtom);
  const [displayAllReviews, setDisplayAllReviews] = useState(false);

  const toggleDisplayAllReviews = () => {
    setDisplayAllReviews(!displayAllReviews);
  }

  if (productError || productLoading || product === null) {
    return (
      <>
        {productLoading &&
          <Loading loading={productLoading} circle={true}>
            
          </Loading>}
        {productError && <Heading>Error</Heading>}
      </>
    )
  } else {
    document.title = `${product!.name}`;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="col-span-6 sm:col-span-2">
          <Card maxW='100%' minHeight='100%'>
            <CardBody>
              <Flex height="250px" alignItems={'center'}>
                <Image
                  margin="auto auto auto auto"
                  maxH={{base: '200px', md: '300px'}}
                  src={product.image_url} 
                  alt={product.name} 
                />
              </Flex>
              <Stack textAlign='center' spacing={3} mt='6'>
                <Heading size={{ base: 'md', lg: 'lg' }}>{product.name}</Heading>
                <Text>Price: {phpString.format(product.price)}</Text>
              </Stack>
            </CardBody>
            <CardFooter display='flex' justifyContent={'center'}>
              <Button 
                height='35px'
                colorScheme='green' 
                variant='solid'
                onClick={() => addToCart(localCart, setLocalCart, product.id)}
                >
                  Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-6 sm:col-span-4">
          <Stack gap={4}>
            <Card>
              <CardHeader><Heading fontSize='xl'>Description</Heading></CardHeader>
              <Divider/>
              <CardBody>
                <Text>{product.description}</Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader><Heading fontSize='xl'>Ratings and Reviews</Heading></CardHeader>
              <Divider/>
              { (reviews.data != undefined && 
                reviews.data!.length != 0) ? 
              <CardBody>
                <Flex gap={4} alignItems='center'>
                  <Stack textAlign={'center'}>
                    <Heading size='2xl'>{averageRating}</Heading>
                    <Text>{reviews.data?.length} Rating{reviews.data?.length > 1 ?? 's'}</Text>
                  </Stack>
                  <Stack gap={0}>
                    <Flex alignItems={'center'}>
                      <Text mr={2}>5 ⭐</Text><Progress value={100} size='md' width='100px'/>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <Text mr={2}>4 ⭐</Text><Progress value={75} size='md' width='100px'/>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <Text mr={2}>3 ⭐</Text><Progress value={50} size='md' width='100px'/>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <Text mr={2}>2 ⭐</Text><Progress value={25} size='md' width='100px'/>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <Text mr={2}>1 ⭐</Text><Progress value={0} size='md' width='100px'/>
                    </Flex>
                  </Stack>
                </Flex>
                {displayAllReviews ? <Reviews reviews={reviews.data as unknown as Review[]} /> : 
                <ReviewItem {...reviews.data[0]} />}
                {reviews.data.length > 1 && 
                <Button size='xs' variant='outline' onClick={() => toggleDisplayAllReviews()}>
                  {displayAllReviews ? 'Collapse' : 'See All'}
                </Button>}
              </CardBody> : 
              <CardBody>
                <Text>No one has reviewed this product yet!</Text>
              </CardBody>}
            </Card>
          </Stack>
        </div>
        {/* <XlProductCard {...product!} />
        <Skeletn loading={reviews.isLoading} skeletonProps={{width: '100%'}}>
          {reviews.data != undefined && 
           reviews.data!.length != 0 && 
           <Text marginY={2}>Average Rating: {averageRating}</Text>}
          <Reviews reviews={reviews.data as unknown as Review[]} />
        </Skeletn> */}
      </div>
    )
  }
}