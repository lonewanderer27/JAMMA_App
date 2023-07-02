import { SkeletonText, Stack } from "@chakra-ui/react";

export default function DeliveryAddressLoader() {
  return (
    <SkeletonText
      noOfLines={5}
      spacing={2}
      skeletonHeight={'20px'}
      marginY={1}
    />
  )
}