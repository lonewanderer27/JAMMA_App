/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom"
import XlProductCard from "../components/ProductCards/XlProductCard";
import { useFetchProduct } from "../hooks/products";
import { Heading, Text } from "@chakra-ui/react";
import { useRecoilValueLoadable } from "recoil";
import { averageRating, productReviews } from "../atoms/products";
import Skeletn from "../components/Loading2";
import { Review } from "../types/jamma";
import Loading from "../components/Loading";

export default function ProductDetail(){
  const { product_id } = useParams();
  const { data: ProductData, error, isLoading } = useFetchProduct(product_id!);
  const pr = useRecoilValueLoadable(productReviews);
  const ave_rating = useRecoilValueLoadable(averageRating);
  
  if (error || isLoading || ProductData === null) {
    return (
      <>
        {isLoading && 
          <Loading loading={isLoading} circle={true}>
            <></>  
          </Loading>}
        {error && <Heading>Error</Heading>}
      </>
    )
  } else {
    document.title = `${ProductData.name}`;
    return (
      <>
        <XlProductCard {...ProductData} />
        <Skeletn state={ave_rating.state} skeletonProps={{width: '50%'}}>
          <Text>Average Rating: {ave_rating.contents}</Text>
        </Skeletn>
        <Skeletn state={pr.state} skeletonProps={{width: '100%'}}>
          {pr.state == 'hasValue' && pr.contents!.map((review: Review) => (
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