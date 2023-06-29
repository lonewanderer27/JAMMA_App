import { useRecoilState, useRecoilValue } from "recoil";
import RadioCardGroup from "../RadioCardGroup";
import { PaymentOption } from "../../types/jamma";
import { Card, CardBody, Divider, Heading, Image, SimpleGrid, Flex, Button, Text, Box, Stack, Table } from "@chakra-ui/react";
import BiCashCoin from "bootstrap-icons/icons/cash-coin.svg";
import { useState } from "react";
import { checkoutPricesAtom, paymentOptionAtom, paymentOptionsAtom, selectedVoucherAtom } from "../../atoms/checkout";
import { phpString } from "../../utils/phpString";
import { usePlaceOrder } from "../../hooks/order";
import Payables from "../Payables";

export default function PaymentOptions(){
  const [expandPaymentOpts, setExpandPaymentOpts] = useState(false);
  const paymentOpts = useRecoilValue(paymentOptionsAtom)
  const [paymentOpt, setPaymentOpt] = useRecoilState(paymentOptionAtom)
  const voucher = useRecoilValue(selectedVoucherAtom);
  const prices = useRecoilValue(checkoutPricesAtom)

  const { handlePlaceOrder } = usePlaceOrder();

  function handleChange(fname: string) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newPayment = paymentOpts.find((opt: PaymentOption) => opt.full_name === fname)
    setPaymentOpt(newPayment!)
  }

  return (
    <Card>
      <CardBody>
        <Flex flexDirection={'row'} alignItems="center">
          <Flex 
            justifyContent={'center'} 
            alignItems="center" 
            paddingRight="5" 
            marginRight="auto"
          >
            <Image
              boxSize="1.5rem"
              mr={2}
              src={BiCashCoin}
            />
            <Heading size='md'>
              Payment Method
            </Heading>
          </Flex>
          {expandPaymentOpts && <SimpleGrid columns={{ sm: 2, md: 4, lg: 6}} spacing={2}>
            <RadioCardGroup
              name="paymentOpts"
              options={paymentOpts.map((opt: PaymentOption) => opt.full_name)}
              default="Cash on Delivery"
              onChange={handleChange}
              RadioCardProps={{py: '2.5', textAlign: 'center'}}
            />
          </SimpleGrid>}
          {!expandPaymentOpts && <>
            <Text marginX="5">{paymentOpt?.full_name}</Text>
            <Button onClick={() => setExpandPaymentOpts(true)}>Change</Button>
          </>}
        </Flex>
        <Payables
          merchandise_subtotal={prices.merchandise_subtotal}
          shippingFee={prices.shippingFee}
          voucherDiscount={voucher?.discount}
          totalPaymentWithVoucher={prices.totalPaymentWithVoucher}
        />
        <Flex>
        <Button 
          colorScheme="green" 
          marginLeft="auto" 
          size='lg'
          onClick={() => handlePlaceOrder()}
        >
          Place Order
        </Button>
        </Flex>
      </CardBody>
    </Card>
  )
}