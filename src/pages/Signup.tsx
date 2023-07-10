import "../App.css";

import { Button, Heading, Input, Stack } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { addUser } from "../utils/user";
import { credInputState } from "../atoms/atoms";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Signup() {
  const [credInput, setCredInput] = useRecoilState(credInputState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCredInput({
      ...credInput,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    const { data, error } = await addUser(credInput);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      console.log(data);
      alert("Please check your email for the confirmation link");
    }
  }

  useEffect(() => {
    document.title = "Signup";
  }, []);

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
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
