import '../App.css'

import { Link, useNavigate } from 'react-router-dom';
import { credInputState, sessionState, userState } from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Navbar from '../components/Navbar';
import { loginUser } from '../utils/user';

export default function Login(){
  const [cred, setCred] = useRecoilState(credInputState);
  const setSession = useSetRecoilState(sessionState);
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit() {
    const {data, error} = await loginUser(cred);

    if (error) {
      console.log(error.message)
    } else {
      console.log("Login success!");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setSession(data.session!);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setUser(data.user!);
      navigate("/");
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>Login</h1>
      <input
        placeholder="username@email.com"
        type="email"
        name="email"
        onChange={handleChange}
      />
      <input
        placeholder="password"
        type="password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={() => handleSubmit()}>Login</button>
      <button>Don't have an account yet? <Link to="/signup">Signup</Link></button>
    </div>
  )
}