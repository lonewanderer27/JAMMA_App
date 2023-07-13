import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function CategoryCard(props: {
  title: string;
  image?: string;
  url: string;
}) {
  const nav = useNavigate();

  return (
    <Card
      borderRadius="0"
      onClick={() => nav(props.url)}
      width="100%"
      cursor={"pointer"}
    >
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Image
          boxSize="50px"
          src={props.image}
          fallbackSrc="https://via.placeholder.com/50"
          margin="auto"
        />
        <Heading size="md" marginY={"auto"} textAlign="center">
          {props.title}
        </Heading>
      </CardBody>
    </Card>
  );
}
