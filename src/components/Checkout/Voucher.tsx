import { Alert, AlertIcon, Box, Button, Card, CardBody, Heading, Image, Radio, Stack, Text, UseRadioProps, useRadio } from "@chakra-ui/react";
import { Coupon } from "../../types/jamma";
import CouponIcon from "bootstrap-icons/icons/tag.svg"
import { useRecoilValue } from "recoil";
import { checkoutItemsAtom } from "../../atoms/checkout";
import { phpString } from "../../utils/phpString";

type VoucherProps = {
  voucher: Coupon,
  selected: boolean,
  radioProps: UseRadioProps,
  onChange: (id: string) => void,
}

export default function Voucher(props: VoucherProps) {
  const voucher = props.voucher;
  const { getInputProps, getRadioProps } = useRadio(props.radioProps);
  const { totalPrice } = useRecoilValue(checkoutItemsAtom);

  const input = getInputProps();
  const checkbox = getRadioProps();

  const handleChange = () => {
    if (totalPrice > voucher.min_purchase_amount) {
      props.onChange(voucher.id.toString())
    }
  }

  return (
    <Box>
      <Card
        size='sm'
        direction={{base: 'column', md: 'row'}}
        overflow={'hidden'}
        variant={'outline'}
        boxShadow={'lg'}
        bg={totalPrice > voucher.min_purchase_amount ? 'white' : 'gray.200'}
      >
        <Image
          src={CouponIcon}
          width='50px'
          objectFit={'fill'}
          marginLeft={5}
          marginRight={3}
        />

        <Stack width="100%">
          <CardBody>
            <Heading size='sm'>
              {phpString.format(voucher.discount)}
            </Heading>
            <Text marginBottom={3}>
              Min. Spend {phpString.format(voucher.min_purchase_amount)}
            </Text>
            <Text marginBottom={2}>
              Valid Till: {new Date(voucher.expiry_date).toDateString()}
            </Text>
          </CardBody>
        </Stack>

        <Box display="flex" padding={5} alignItems={'center'}>
          {(
                totalPrice > voucher.min_purchase_amount && 
                !props.selected) && <Button
                size='sm'
                colorScheme={'green'}
                onClick={handleChange}
              >
                Claim
              </Button>}
        </Box>
        
      </Card>
      {totalPrice < voucher.min_purchase_amount &&
      <Alert status="warning" marginTop={-3}>
        <AlertIcon marginX={1}/>
        <Text marginX={4}>Minimum total price not met</Text>
      </Alert>}
      {props.selected && 
      <Alert status="success" marginTop={-3}>
        <AlertIcon marginX={1}/>
        <Text marginX={4}>Selected</Text>

      </Alert>}
    </Box>
  )
}