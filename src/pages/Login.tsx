import '../App.css'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { credInputState, sessionState, profileState } from '../atoms/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Input, Button, HStack, Heading } from '@chakra-ui/react';
import { loginUser } from '../utils/user';
import { nextUrl } from '../hooks/misc';

export default function Login(){
  const searchParams = new URLSearchParams(location.search);
  const [cred, setCred] = useRecoilState(credInputState);
  const setSession = useSetRecoilState(sessionState);

  const navigate = useNavigate();

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit() {
    const {data, error} = await loginUser(cred);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      console.log(error!.message)
    } else {
      console.log("Login success!");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setSession(data.session!);
      location.pathname = nextUrl("/");
      searchParams.delete("next");
    }
  }

  return (
    <div>
      <Heading>Login</Heading>
      <HStack gap={3}>
        <Input
          placeholder="username@email.com"
          type="email"
          name="email"
          onChange={handleChange}
        />
        <Input
          placeholder="password"
          type="password"
          name="password"
          onChange={handleChange}
        />
      </HStack>
      <HStack gap={3}>
        <Button onClick={() => handleSubmit()}>Login</Button>
        <Link to={"/signup"}>
          <Button>
            Don't have an account yet? Signup
          </Button>
        </Link>
      </HStack>
    </div>
  )
}