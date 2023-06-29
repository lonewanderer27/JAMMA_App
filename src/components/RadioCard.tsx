import { Box, BoxProps } from "@chakra-ui/react";
import { useRadio, UseRadioProps } from "@chakra-ui/react";

interface RadioCardProps extends UseRadioProps {
  children: React.ReactNode;
  boxProps?: BoxProps;
}

export default function RadioCard(props: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={1}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
        h="100%"
        {...props.boxProps}
      >
        {props.children}
      </Box>
    </Box>
  );
}
