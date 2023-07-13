import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
  Card,
  CardBody,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
import { deliveryStatuses } from "../../constants";
// import { getOrderStatus } from '../../utils/order'
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { orderAddress, orderAtom } from "../../atoms/order";
import Skeletn from "../Loading2";
import { OrderStatus } from "../../types/jamma";
import { useOrder } from "../../hooks/order";
import { useParams } from "react-router-dom";
import { profileState } from "../../atoms/atoms";
import DeliveryAddressLoader from "../Loaders/DeliveryAddressLoader";

// function deliveryStatus(orderStatus: OrderStatus) {
//   const status = deliveryStatuses;

//   if (orderStatus.approved != undefined) {
//     status[1].currentStep = true;
//   }
// }

export function OrderStatus2() {
  const { order_id } = useParams<{ order_id: string }>();
  const profile = useRecoilValueLoadable(profileState);
  const { order, deliveryAddress } = useOrder(
    order_id!,
    profile.contents
  );

  return (
    <Card>
      <CardBody>
        <Box pb={5}>
          <Stepper index={0}>
            {deliveryStatuses.map((step, index) => (
              <Step key={index}>
                <Flex flexDir="column" alignItems={"center"}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box pt={2}>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                </Flex>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box>
          <Heading size="md" mb={5}>
            Delivery Address
          </Heading>
          <SimpleGrid columns={{ sm: 1, md: 2 }}>
            <Skeletn
              loading={deliveryAddress.isLoading}
              loader={<DeliveryAddressLoader />}
            >
              {deliveryAddress.data != undefined && (
                <Stack gap={1}>
                  <Text fontSize="lg">{deliveryAddress.data.name}</Text>
                  <Text fontSize="lg">{deliveryAddress.data.phone_number}</Text>
                  <Text fontSize="lg">
                    {deliveryAddress.data.address_line2},{" "}
                    {deliveryAddress.data.barangay}
                  </Text>
                  <Text fontSize="lg">
                    {deliveryAddress.data.city}, {deliveryAddress.data.province}
                    , {deliveryAddress.data.postal_code}
                  </Text>
                  {order.data != undefined && order.data.note != undefined && (
                    <>
                      <Text fontWeight="bold">Note:</Text>
                      <Text>{order?.data.note}</Text>
                    </>
                  )}
                </Stack>
              )}
            </Skeletn>
            <Box></Box>
          </SimpleGrid>
        </Box>
      </CardBody>
    </Card>
  );
}

export default function OrderStatus() {
  const order = useRecoilValue(orderAtom);
  const { contents: address, state: addressState } =
    useRecoilValueLoadable(orderAddress);

  // const { activeStep } = useSteps({
  //   index: 0,
  //   count: deliveryStatuses.length,
  // })

  return (
    <Card>
      <CardBody>
        <Box pb={5}>
          <Stepper index={0}>
            {deliveryStatuses.map((step, index) => (
              <Step key={index}>
                <Flex flexDir="column" alignItems={"center"}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box pt={2}>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                </Flex>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        <Skeletn state={addressState}>
          <Box>
            <Heading size="md" mb={5}>
              Delivery Address
            </Heading>
            <SimpleGrid columns={{ sm: 1, md: 2 }}>
              <Stack gap={1}>
                <Text fontSize="lg">{address.name}</Text>
                <Text fontSize="sm">{address.phone_number}</Text>
                <Text fontSize="sm">
                  {address.address_line2}, {address.barangay}
                </Text>
                <Text fontSize="sm">
                  {address.city}, {address.province}, {address.postal_code}
                </Text>
                {order?.note != null && order.note.length > 0 && (
                  <>
                    <Text fontWeight="bold">Note:</Text>
                    <Text>{order?.note}</Text>
                  </>
                )}
              </Stack>
              <Box></Box>
            </SimpleGrid>
          </Box>
        </Skeletn>
      </CardBody>
    </Card>
  );
}