import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  ModalCloseButton,
  ModalBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Input,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Fade,
} from "@chakra-ui/react";
import GeoAltFill from "bootstrap-icons/icons/geo-alt-fill.svg";
import { DeliveryAddress, NewDeliveryAddress } from "../../types/jamma";
import { sessionState } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import AddressForm from "./AddressForm";
import {
  checkoutPricesAtom,
  deliveryAddressesAtom,
} from "../../atoms/checkout";
import { useCheckout } from "../../hooks/checkout";
import { useSetDefaultAddress } from "../../hooks/checkout";
import { phpString } from "../../utils/phpString";
import React from "react";

export default function DeliveryAddress() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useRecoilValue(sessionState);
  const addresses = useRecoilValue(deliveryAddressesAtom);
  const { defaultAddress, handleChange } = useSetDefaultAddress();
  const checkout = useCheckout();
  const prices = useRecoilValue(checkoutPricesAtom);

  const newAddressState: NewDeliveryAddress = {
    name: "",
    region: "",
    city: "",
    province: "",
    barangay: "",
    address_line2: "",
    postal_code: "",
    phone_number: "",
    label: "",
    country: "Philippines",
    user_id: session!.user.id,
  };

  return (
    <Fade in={true}>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            justifyContent="end"
            flexDirection="column"
          >
            <AddressForm data={newAddressState} newAddress={true} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Card>
        <CardHeader display="flex" alignItems="center" paddingBottom={0}>
          <Image src={GeoAltFill} boxSize="1.5rem" mr={2} />
          <Heading flexGrow={1} size="md">
            Delivery Address
          </Heading>
        </CardHeader>

        <CardBody>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                {/* There is no set default address but there are other addresses */}
                {!defaultAddress && addresses.length > 0 && (
                  <Text>
                    There is no default address. Click here to set one now!
                  </Text>
                )}

                {/* There are literally no addresses */}
                {!defaultAddress && addresses.length === 0 && (
                  <Button onClick={() => onOpen()}>Add Delivery Address</Button>
                )}

                {defaultAddress && (
                  <Flex
                    direction={"row"}
                    justifyContent={"space-between"}
                    width="100%"
                    alignItems={"center"}
                  >
                    <Box width="100%">
                      <Text fontWeight={"bold"} marginRight={"2"}>
                        {defaultAddress.name} (+63){" "}
                        {defaultAddress.phone_number}
                      </Text>
                      <Text>
                        {defaultAddress.address_line2},{" "}
                        {defaultAddress.barangay}, {defaultAddress.city},{" "}
                        {defaultAddress.province}, {defaultAddress.region}{" "}
                        {defaultAddress.postal_code}
                      </Text>
                    </Box>
                    <Button>
                      <Text>Change</Text>
                    </Button>
                  </Flex>
                )}
              </AccordionButton>
              <AccordionPanel>
                <Stack spacing={4} direction="row">
                  <RadioGroup>
                    {addresses
                      .filter((add) => add._default === false)
                      .map((add) => (
                        <Radio
                          key={add.id}
                          id={add.id.toString()}
                          value={add.id.toString()}
                          onChange={() => handleChange(add.id)}
                        >
                          <Box>
                            <Text fontWeight={"bold"} marginRight={"2"}>
                              {add.name} (+63) {add.phone_number}
                            </Text>
                            <Text>
                              {add.address_line2}, {add.barangay}, {add.city},{" "}
                              {add.province}, {add.region} {add.postal_code}
                            </Text>
                          </Box>
                        </Radio>
                      ))}
                  </RadioGroup>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Th colSpan={2}>
                    <Box display="flex" alignItems="center">
                      <Text mr={5}>Message: </Text>
                      <Input
                        value={checkout.message ?? ""}
                        onChange={checkout.messageChange}
                        placeholder="Leave message for the courier"
                      />
                    </Box>
                  </Th>
                  <Th colSpan={2}>
                    <Box display="flex" alignItems="center">
                      Shipping Fee: {phpString.format(prices.shippingFee)}
                    </Box>
                  </Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Fade>
  );
}
