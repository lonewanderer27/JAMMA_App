import { Card, CardHeader, Heading, Image, Modal, ModalOverlay, ModalContent, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, CardBody, Text, Box, Button, Stack, ModalFooter, RadioGroup, useRadioGroup, HStack, Flex } from "@chakra-ui/react";
import CurrencyChange from "bootstrap-icons/icons/currency-exchange.svg"
import TicketPerforated from "bootstrap-icons/icons/ticket-perforated-fill.svg"
import Voucher from "./Voucher";
import { useCheckout } from "../../hooks/checkout";
import Loading from "../Loading";
import { useRecoilValue } from "recoil";
import { checkoutItemsAtom } from "../../atoms/checkout";
import { phpString } from "../../utils/phpString";

export default function VoucherSelector() {
  const modalProps = useDisclosure();
  const { vouchers: coupons, selectedVoucher: selectedVoucher, voucherChange } = useCheckout();

  const { getRadioProps } = useRadioGroup({
    name: "coupon",
    onChange: voucherChange,
  })

  return (
    <>
      <Modal {...modalProps} scrollBehavior='inside' size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="md">Select Voucher</Heading>
          </ModalHeader>
          <ModalCloseButton/>
          <ModalBody display={'flex'} flexDirection={'column'}>
            <RadioGroup name="coupon">
              <Stack gap={4}>
                {coupons.map((coupon) => {
                  const radio = getRadioProps({ coupon })
                  return (
                    <Voucher 
                      voucher={coupon} 
                      key={coupon.id} 
                      {...radio} 
                      radioProps={radio}
                      selected={
                        selectedVoucher ? selectedVoucher.id === coupon.id ? true : false : false}
                      onChange={voucherChange}
                    />
                  )
                })}
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <HStack gap={2}>
              {selectedVoucher && <Button
                onClick={() => {
                  voucherChange(null)
                  modalProps.onClose()
                }}
                className="text-capital"
              >
                Remove Coupon
              </Button>}
              <Button 
                onClick={() => modalProps.onClose()}
                className="text-capital"
              >
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent> 
      </Modal>

      <Card>
        <CardBody 
          display="flex" 
          flexDirection='row' 
          justifyContent='space-between'
        >
          <Flex alignItems={'center'}>
            <Image src={TicketPerforated} boxSize="1.5rem" mr={2} />
            <Heading flexGrow={1} size="md">Voucher</Heading>
          </Flex>
          {selectedVoucher && 
          <Box>
            <Heading size='md'>
              {selectedVoucher.name}
            </Heading>
            <Text fontWeight={'bold'}>
              {phpString.format(selectedVoucher.discount)} off your purchase<br/>
            </Text>
            <Text></Text>
          </Box>}

          <HStack gap={3}>
            <Button onClick={() => modalProps.onOpen()}>
              <Text>
                {selectedVoucher ? 'Change' : 'Select Voucher'}
              </Text>
            </Button>
            {selectedVoucher &&
            <Button onClick={() => voucherChange(null)}>
              Remove
            </Button>}
          </HStack>
        </CardBody>
      </Card>
    </>
  )
}