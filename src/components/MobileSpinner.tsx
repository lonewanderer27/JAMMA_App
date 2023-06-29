import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { HStack, IconButton, IconButtonProps, Input, InputProps } from "@chakra-ui/react";

/**
 * Props for the MobileSpinner component.
 */
interface MobileSpinnerProps {
  /** Props for the subtract button IconButton component. */
  subtractButtonProps?: IconButtonProps;
  /** Props for the plus button IconButton component. */
  plusButtonProps?: IconButtonProps;
  /** Props for the input Input component. */
  inputProps?: InputProps;
  /** The current value of the MobileSpinner. */
  value: number;
  /** Callback function to set a new quantity. */
  onSet: (newQuantity: number) => void;
  /** Callback function when the add button is clicked. */
  onAdd: () => void;
  /** Callback function when the subtract button is clicked. */
  onSubtract: () => void;
  /** Whether to enable add button */
  enableAdd?: true;
  /** Whether to enable subtract button */
  enableSubtract?: true;
}

/**
 * MobileSpinner component that allows adjusting a numerical value.
 */
export default function MobileSpinner(props: MobileSpinnerProps) {
  return (
    <HStack gap={0}>
      {props.enableSubtract && <IconButton
        {...props.plusButtonProps}
        borderRadius="3px 0 0 3px"
        aria-label="Minus"
        variant="solid"
        colorScheme="blue"
        onClick={() => props.onSubtract()}
        icon={<MinusIcon />}
      />}
      <Input
        {...props.inputProps}
        borderRadius={0}
        value={props.value}
        onChange={(e) => props.onSet(parseInt(e.target.value))}
        type="number"
        maxW={20}
        min={1}
        textAlign="center"
      />
      {props.enableAdd && <IconButton
        {...props.subtractButtonProps}
        borderRadius="0 3px 3px 0"
        aria-label="Add"
        variant="solid"
        colorScheme="blue"
        onClick={() => props.onAdd()}
        icon={<AddIcon />}
      />}
    </HStack>
  );
}
