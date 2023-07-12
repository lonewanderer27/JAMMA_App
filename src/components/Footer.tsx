import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function Footer(){
  return (
    <Box textAlign={"center"} marginY={15}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={10}>
        <Stack>
          <Heading size="sm">Customer Service</Heading>
          <Text>Help Center</Text>
          <Text>Payment Methods</Text>
          <Text>Order Tracking</Text>
          <Text>Return and Refund</Text>
          <Text>Contact Us</Text>
        </Stack>
        <Stack>
          <Heading size="sm">About JAMMA</Heading>
          <Link to="/about">
            <Text>About Us</Text>
          </Link>
          <Link to="/news">
            <Text>News</Text>
          </Link>
          <Link to="/privacy_policy">
            <Text>Privacy Policy</Text>
          </Link>
          <Link to="toc">
            <Text>Terms and Conditions</Text>
          </Link>
        </Stack>
        <Stack>
          <Heading size="sm">Follow Us</Heading>
          <Text>Facebook</Text>
          <Text>Instagram</Text>
          <Text>Twitter</Text>
          <Text>Youtube</Text>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}