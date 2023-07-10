/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Image,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useProduct, useReview } from "../hooks/products";

import Loading from "../components/Loading";
import { Review } from "../types/jamma";
import ReviewItem from "../components/Reviews/ReviewItem";
import Reviews from "../components/Reviews";
import { addToCart } from "../utils/cart";
import { cartAtom } from "../atoms/cart";
import { phpString } from "../utils/phpString";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

export default function ProductDetail() {
  const { product_id } = useParams<{ product_id: string }>();
  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useProduct(product_id!);
  const { reviews, stats } = useReview(product_id!);
  const [localCart, setLocalCart] = useRecoilState(cartAtom);
  const [displayAllReviews, setDisplayAllReviews] = useState(false);

  const toggleDisplayAllReviews = () => {
    setDisplayAllReviews(!displayAllReviews);
  };

  console.log("stats");
  console.log(stats);

  const generateProgressVal = (rating: number) => {
    if (stats.data == undefined || stats.data[0].total_reviews == 0) {
      return 0;
    }
    switch (rating) {
      case 5:
        return (stats.data[0].rating_5 / stats.data[0].total_reviews) * 100;
      case 4:
        return (stats.data[0].rating_4 / stats.data[0].total_reviews) * 100;
      case 3:
        return (stats.data[0].rating_3 / stats.data[0].total_reviews) * 100;
      case 2:
        return (stats.data[0].rating_2 / stats.data[0].total_reviews) * 100;
      case 1:
        return (stats.data[0].rating_1 / stats.data[0].total_reviews) * 100;
      default:
        return 0;
    }
  };

  if (productError || productLoading || product === null) {
    return (
      <>
        {productLoading && (
          <Loading loading={productLoading} circle={true}>
            <></>
          </Loading>
        )}
        {productError && <Heading>Error</Heading>}
      </>
    );
  } else {
    document.title = `${product!.name}`;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="col-span-6 sm:col-span-2">
          <Card maxW="100%" minHeight="100%">
            <CardBody>
              <Flex minHeight="250px" alignItems={"center"}>
                <Image
                  margin="auto auto auto auto"
                  maxH={{ base: "200px", md: "300px" }}
                  src={product.image_url}
                  alt={product.name}
                />
              </Flex>
              <Stack textAlign="center" spacing={3} mt="6">
                <Heading size={{ base: "md", lg: "lg" }}>
                  {product.name}
                </Heading>
                <Text>Price: {phpString.format(product.price)}</Text>
              </Stack>
            </CardBody>
            <CardFooter display="flex" justifyContent={"center"}>
              <Button
                height="35px"
                colorScheme="green"
                variant="solid"
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
              <CardHeader>
                <Heading fontSize="xl">Description</Heading>
              </CardHeader>
              <Divider />
              <CardBody>
                <Text>{product.description}</Text>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Heading fontSize="xl">Ratings and Reviews</Heading>
              </CardHeader>
              <Divider />
              {reviews.data != undefined && reviews.data!.length != 0 ? (
                <CardBody>
                  {stats.data != undefined && (
                    <Flex gap={4} alignItems="center">
                      <Stack textAlign={"center"}>
                        <Heading size="2xl">
                          {stats.data[0].average_rating}
                        </Heading>
                        <Text>
                          {stats.data[0].total_reviews} Rating
                          {stats.data[0].total_reviews > 1 ? "s" : ""}
                        </Text>
                      </Stack>
                      <Stack gap={0}>
                        <Flex alignItems={"center"}>
                          <Text mr={2}>5 ⭐</Text>
                          <Progress
                            value={generateProgressVal(5)}
                            size="md"
                            width="120px"
                          />
                        </Flex>
                        <Flex alignItems={"center"}>
                          <Text mr={2}>4 ⭐</Text>
                          <Progress
                            value={generateProgressVal(4)}
                            size="md"
                            width="120px"
                          />
                        </Flex>
                        <Flex alignItems={"center"}>
                          <Text mr={2}>3 ⭐</Text>
                          <Progress
                            value={generateProgressVal(3)}
                            size="md"
                            width="120px"
                          />
                        </Flex>
                        <Flex alignItems={"center"}>
                          <Text mr={2}>2 ⭐</Text>
                          <Progress
                            value={generateProgressVal(2)}
                            size="md"
                            width="120px"
                          />
                        </Flex>
                        <Flex alignItems={"center"}>
                          <Text mr={2}>1 ⭐</Text>
                          <Progress
                            value={generateProgressVal(1)}
                            size="md"
                            width="120px"
                          />
                        </Flex>
                      </Stack>
                    </Flex>
                  )}
                  {displayAllReviews ? (
                    <Reviews reviews={reviews.data as unknown as Review[]} />
                  ) : (
                    <ReviewItem {...reviews.data[0]} />
                  )}
                  {reviews.data.length > 1 && (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => toggleDisplayAllReviews()}
                    >
                      {displayAllReviews ? "Collapse" : "See All"}
                    </Button>
                  )}
                </CardBody>
              ) : (
                <CardBody>
                  <Text>No one has reviewed this product yet!</Text>
                </CardBody>
              )}
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
    );
  }
}