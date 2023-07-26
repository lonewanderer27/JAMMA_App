import { Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

import { Product } from "../../types/jamma";
import { memo } from "react";
import { phpString } from "../../utils/phpString";
import { useNavigate } from "react-router-dom";

function SmProductCard(props: Product) {
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
        boxSize="170px"
        margin="auto"
        padding="5"
      />
      <CardBody padding="3" minH="80px" bg="gray.200">
        <Text noOfLines={1}>{props.name}</Text>
        <Flex justifyContent={"space-between"} marginTop={5}>
          <Text>{phpString.format(props.price)}</Text>
          <Text>{props.sales} Sold</Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default memo(SmProductCard);
