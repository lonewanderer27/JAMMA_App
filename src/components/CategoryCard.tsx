import { Card, CardBody, Heading, Image } from "@chakra-ui/react";

import logo_loading from "../assets/logo_loading.png";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard(props: { title: string; image?: string; url: string }) {
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
          fallbackSrc={logo_loading}
          margin="auto"
        />
        <Heading size="md" marginY={"auto"} textAlign="center">
          {props.title}
        </Heading>
      </CardBody>
    </Card>
  );
}

export default memo(CategoryCard);