import { Heading, TabIndicator, TabPanels } from "@chakra-ui/react"
import Loading from "../components/Loading"
import { useRecoilValueLoadable } from "recoil"
import { profileState } from "../atoms/atoms"
import { useResetNextParam } from "../hooks/misc"
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import AllOrders from "../components/AllOrders"

export default function MyOrders(){
  document.title = "My Orders - JAMMA"

  useResetNextParam();
  const user = useRecoilValueLoadable(profileState)
  
  return (
    <Loading loading={user.state === 'loading'}>
      <Heading>Your Orders</Heading>
      <Tabs isFitted>
        <TabList>
          <Tab>All</Tab>
          <Tab>To Ship</Tab>
          <Tab>To Receive</Tab>
          <Tab>Completed</Tab>
          <Tab>Cancelled</Tab>
          <Tab>Return Refund</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <AllOrders/>
        </TabPanels>
      </Tabs>
    </Loading>
  )
}