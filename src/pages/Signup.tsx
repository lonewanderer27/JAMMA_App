import {Link} from 'react-router-dom';
import { credInputState } from '../atoms/atoms';
import { useRecoilState } from 'recoil';
import Navbar from "../components/Navbar";
import '../App.css' 
import { addUser } from '../utils/user';
import { Input, Button, Stack, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Signup(){
  const [credInput, setCredInput] = useRecoilState(credInputState);

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCredInput({
      ...credInput,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(){
    const {data, error} = await addUser(credInput);

    if (error) {
      console.log(error)
      alert(error.message)
    } else {
      console.log(data)
      alert("Please check your email for the confirmation link")
    }
  }

  useEffect(() => {
    document.title = "Signup"
  }, [])

  return (
    <div>
      <Heading>Signup</Heading>
      <Stack>
        <Input
          placeholder="Full Name"
          type="text"
          name="fullname"
          onChange={handleChange}
        />
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
      </Stack>
      <Button onClick={() => handleSubmit()}>Signup</Button>
      <Link to="/login"><Button>Login</Button></Link>
    </div>
  )
}