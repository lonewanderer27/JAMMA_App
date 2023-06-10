import { AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import BasketIcon from 'bootstrap-icons/icons/basket3-fill.svg'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  Image,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { localCartState, sessionState, userState } from '../atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { countCart } from '../utils/cart';

// import { JSession } from '../types/jamma';


const Links = ['All Products', 'Earphone', 'Smartwatch', 'About'];
const RouteLinks = ['/', '/earphone', '/smartwatch', '/about'];

const NavLink = ({ children, to }: { children: ReactNode, to:string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    as={ReactRouterLink}
    href={to}
    to={to}>
    {children}
  </Link>
);

export default function Navbar(){
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [session, setSession] = useRecoilState<Session | undefined>(sessionState);
  // const cart = useRecoilValue(cartState);
  const setUser = useSetRecoilState(userState);

  const cart = useRecoilValue(localCartState);

  function handleLogout() {
    setSession(undefined);
    setUser(undefined);
  }

  function handleRegister(){
    navigate('/register');
  }

  function handleLogin(){
    navigate('/login');
  }

  function handleOrder() {
    navigate('/orders')
  }

  function handleMessages() {
    navigate('/messages')
  }

  function handleProfile(){
    navigate('/me')
  }

  const navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, index) => (
                <NavLink key={link} to={RouteLinks[index]}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              rightIcon={<Image src={BasketIcon} />}
              onClick={() => navigate('/cart')}
            >
              {countCart(cart)}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                {!session ? 
                  <>
                    <MenuItem onClick={() => handleLogin()}>Log In</MenuItem> 
                    <MenuItem onClick={() => handleRegister()}>Register</MenuItem> 
                  </> :
                  <MenuItem onClick={() => handleProfile()}>{session.user.user_metadata["full_name"]}</MenuItem>}
                <MenuDivider/>
                {session && <>
                  <MenuItem onClick={() => handleOrder()}>My Orders</MenuItem>
                  <MenuItem onClick={() => handleMessages()}>My Messages</MenuItem>
                  <MenuItem>Recently Viewed</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                </>}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={link} to={RouteLinks[index]}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}