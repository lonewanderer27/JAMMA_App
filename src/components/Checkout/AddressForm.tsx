import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import RadioCardGroup from "../RadioCardGroup";
import { NewDeliveryAddress } from "../../types/jamma";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atoms/atoms";
import { useFormState } from "../../hooks/form";
import { addNewAddress } from "../../utils/checkout";

export default function AddressForm(props: {
  data: NewDeliveryAddress,
  newAddress: boolean,
}){
  const { data } = props;
  const session = useRecoilValue(sessionState);

  const {
    formData: addressData, 
    handleChange, 
    resetForm, 
    logFormData
  } = useFormState(data, 'New Address Form');

  logFormData();

  async function handleSubmit() {
    const {data, error} = await addNewAddress(addressData);

    if (error) {
      console.log(error);
    }
    else {
      console.log(data);
    }
  }

  return (
    <Box>
      <Stack spacing={3}>
        <Input
          placeholder="Full Name"
          name="name"
          value={addressData.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Region"
          name="region"
          value={addressData.region}
          onChange={handleChange}
        />
        <Input
          placeholder="City"
          name="city"
          value={addressData.city}
          onChange={handleChange}
        />
        <Input
          placeholder="Province"
          name="province"
          value={addressData.province}
          onChange={handleChange}
        />
        <Input
          placeholder="Barangay"
          name="barangay"
          value={addressData.barangay}
          onChange={handleChange}
        />
        <Input
          placeholder="Street Name, Building, House No, Unit No."
          name="address_line2"
          value={addressData.address_line2}
          onChange={handleChange}
        />
        <Input
          placeholder="Postal Code"
          name="postal_code"
          value={addressData.postal_code}
          onChange={handleChange}
        />
        <Input
          placeholder="Phone Number"
          name="phone_number"
          value={addressData.phone_number}
          onChange={handleChange}
        />
      </Stack>
      <Button onClick={resetForm}>Reset Form</Button>
      <Text>Label as</Text>
      <Stack direction="row" spacing={3}>
        <RadioCardGroup
          name="label"
          options={["home", "work"]}
          default=""
          onChange={value => handleChange({name: "label", newValue: value})}
        />
      </Stack>
      <Button onClick={() => handleSubmit()}>Save</Button>
    </Box>
  )
}