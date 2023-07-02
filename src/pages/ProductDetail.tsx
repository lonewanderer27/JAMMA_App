/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom"
import XlProductCard from "../components/ProductCards/XlProductCard";
import { useProduct, useReview } from "../hooks/products";
import { Heading, Text } from "@chakra-ui/react";
import Skeletn from "../components/Loading2";
import { Review } from "../types/jamma";
import Loading from "../components/Loading";

export default function ProductDetail() {
  const { product_id } = useParams<{product_id: string}>();
  const { data: product, 
          error: productError, 
          isLoading: productLoading } = useProduct(product_id!);
  const { reviews, averageRating } = useReview(product_id!);

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
      <>
        <XlProductCard {...product!} />
        <Skeletn loading={reviews.isLoading} skeletonProps={{width: '100%'}}>
          {<Text>Average Rating: {averageRating}</Text>}
          {reviews.data && reviews.data!.map((review: Review) => (
            <div key={review.id}>
              <Text>{'⭐'.repeat(review.product_rating)}</Text>
              <Text>{review.comment}</Text>
            </div>
          ))}
        </Skeletn>
      </>
    )
  }
}