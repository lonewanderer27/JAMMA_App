import { Table, Tbody, Tr, Td, Text } from "@chakra-ui/react"
import { phpString } from "../utils/phpString"

export default function Payables(props: {
    merchandise_subtotal: number,
    shippingFee: number,
    voucherDiscount: number | null | undefined,
    totalPaymentWithVoucher: number
  }
){
  return (
    <Table my={5} textAlign="right">
      <Tbody>
        <Tr>
          <Td>
            <Text>Merchandise Subtotal</Text>
          </Td>
          <Td>
            <Text>
              {phpString.format(props.merchandise_subtotal)}
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td>
            <Text>Shipping Fee</Text>
          </Td>
          <Td>
            <Text>
              {phpString.format(props.shippingFee)}
            </Text>
          </Td>
        </Tr>
        {props.voucherDiscount && <Tr>
          <Td>
            <Text>Voucher Discount</Text>
          </Td>
          <Td>
            <Text>
              - {phpString.format(props.voucherDiscount)}
            </Text>
          </Td>
        </Tr>}
        <Tr>
          <Td>
            <Text>Total Payment</Text>
          </Td>
          <Td>
            <Text fontSize="xl">
              {phpString.format(props.totalPaymentWithVoucher)}
            </Text>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}