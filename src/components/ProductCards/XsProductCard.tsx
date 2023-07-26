import { Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

import { Product } from "../../types/jamma";
import { memo } from "react";
import { phpString } from "../../utils/phpString";
import { useNavigate } from "react-router-dom";

function XsProductCard(props: Product) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/product/${props.id}?unique_name=${props.unique_name}`);
  }

  return (
    <Card borderRadius="none" onClick={() => handleClick()} cursor="pointer">
      <Image
        src={props.image_url}
        alt={props.name}
        objectFit="contain"
        boxSize="150px"
        margin="auto"
      />
      <CardBody padding="1" minH="60px" bg="gray.200">
        <Text fontSize="smaller" noOfLines={1}>
          {props.name}
        </Text>
        <Flex justifyContent="space-between" marginTop={5}>
          <Text fontSize="smaller">{phpString.format(props.price)}</Text>
          <Text fontSize="smaller">{props.sales} Sold</Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default memo(XsProductCard);