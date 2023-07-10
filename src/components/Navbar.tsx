import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { profileState, sessionState } from "../atoms/atoms";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";

import BasketIcon from "bootstrap-icons/icons/basket3-fill.svg";
import Loading from "./Loading";
import Logo from "../assets/logo.png";
import { ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { cartAtom } from "../atoms/cart";
import { countCart } from "../utils/cart";

const Links = [
  "All Products",
  "Earphone",
  "Smartwatch",
  "Accessory",
  "Softwares",
  "About",
];
const RouteLinks = [
  "/all",
  "/earphone",
  "/smartwatch",
  "/accessory",
  "/softwares",
  "/about",
];

const NavLink = ({ children, to }: { children: ReactNode; to: string }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    as={ReactRouterLink}
    href={to}
    to={to}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [session, setSession] = useRecoilState<Session | undefined>(
    sessionState
  );
  const { state, contents: profile } = useRecoilValueLoadable(profileState);

  const cart = useRecoilValue(cartAtom);

  function handleLogout() {
    setSession(undefined);
  }

  function handleSignup() {
    navigate("/signup");
  }

  function handleLogin() {
    navigate("/login");
  }

  function handleOrder() {
    navigate("/my_orders");
  }

  function handleMessages() {
    navigate("/messages");
  }

  function handleProfile() {
    navigate("/me");
  }

  function handleRecentlyViewed() {
    navigate("/recently_viewed");
  }

  const navigate = useNavigate();

  return (
    <Loading loading={state === "loading"} fullScreen={false}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image src={Logo} boxSize="50px" onClick={() => navigate("/")} />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NavLink key={link} to={RouteLinks[index]}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              rightIcon={<Image src={BasketIcon} />}
              onClick={() => navigate("/cart")}
            >
              {countCart(cart, false)}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={profile?.avatar_url} />
              </MenuButton>
              <MenuList>
                {!session ? (
                  <>
                    <MenuItem onClick={() => handleLogin()}>Log In</MenuItem>
                    <MenuItem onClick={() => handleSignup()}>Signup</MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => handleProfile()}>
                    {profile.full_name}
                  </MenuItem>
                )}
                {session && (
                  <>
                    <MenuDivider />
                    <MenuItem onClick={() => handleOrder()}>My Orders</MenuItem>
                    <MenuItem onClick={() => handleMessages()}>
                      My Messages
                    </MenuItem>
                    <MenuItem onClick={() => handleRecentlyViewed()}>
                      Recently Viewed
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={link} to={RouteLinks[index]}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Loading>
  );
}
