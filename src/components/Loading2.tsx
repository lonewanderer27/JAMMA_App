import { Skeleton, SkeletonProps } from "@chakra-ui/react";
import { Suspense } from "react";

export default function Skeletn(props: {
  children: React.ReactNode,
  loading?: boolean,
  state?: string,
  skeletonProps?: SkeletonProps,
  loader?: React.ReactNode
}) {
  if (props.loading || props.state == 'loading') {
    if (props.loader) {
      return <>{props.loader}</>
    } else {
      return <Skeleton height="20px" width="50px" my={'2'} {...props.skeletonProps}/>
    }
  }

  return (
    <Suspense fallback={
      props.loader ? <>{props.loader}</> : <Skeleton height="20px" width="50px" {...props.skeletonProps} />
    }>
      {props.children}
    </Suspense>
  )
}