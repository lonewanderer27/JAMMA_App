import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function CategoryCard(props: {
  title: string;
  image?: string;
  url: string;
}) {
  const nav = useNavigate();

  return (
    <Card borderRadius="0" onClick={() => nav(props.url)} width="100%">
      <CardBody
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Image src={props.image} fallbackSrc="https://via.placeholder.com/50" />
        <Heading size="md" marginY={"auto"}>
          {props.title}
        </Heading>
      </CardBody>
    </Card>
  );
}
