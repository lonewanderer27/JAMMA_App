import { BoxProps, useRadioGroup } from "@chakra-ui/react"
import RadioCard from "./RadioCard"

export default function RadioCardGroup(props: {
  name: string,
  options: string[],
  default: string,
  onChange: (value: string) => void
  RadioCardProps?: BoxProps
}){
  const { getRadioProps } = useRadioGroup({
    name: props.name,
    defaultValue: props.default,
    onChange: props.onChange,
  })

  // const group = getRootProps()

  return (
    <>
      {props.options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio} boxProps={props.RadioCardProps}>
            {value}
          </RadioCard>
        )
      }
      )}
    </>
  )
}