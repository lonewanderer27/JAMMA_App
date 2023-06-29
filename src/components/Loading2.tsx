import { Skeleton, SkeletonProps } from "@chakra-ui/react";
import { Suspense } from "react";
import { Loadable } from "recoil";

export default function Skeletn(props: {
  children: React.ReactNode,
  loading?: boolean,
  state?: string,
  skeletonProps?: SkeletonProps
}) {
  if ((props.loading) || (props.state == 'loading')) {
    return <Skeleton height="20px" width="50px" my={'2'} {...props.skeletonProps} />
  }

  return (
    <Suspense fallback={
      <Skeleton height="20px" width="50px" {...props.skeletonProps} />
    }>
      {props.children}
    </Suspense>
  )
}