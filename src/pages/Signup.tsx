import {Link} from 'react-router-dom';
import { credInputState } from '../atoms';
import { useRecoilState } from 'recoil';
import Navbar from "../components/Navbar";
import '../App.css' 
import { addUser } from '../utils/user';

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

  return (
    <div>
      <Navbar/>
      <h1>Signup</h1>
      <input
        placeholder="Full Name"
        type="text"
        name="fullname"
        onChange={handleChange}
      />
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
      <button onClick={() => handleSubmit()}>Signup</button>
      <Link to="/login"><button>Login</button></Link>
    </div>
  )
}