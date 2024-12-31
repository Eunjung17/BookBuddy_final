import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserStyles.css'
import { useLoginUserMutation } from '../../redux/slices/userSlice'


const LoginForm = ({token, setToken}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, {error}] = useLoginUserMutation();
  const navigate = useNavigate();

  const userLogin = async (event) => {
   event.preventDefault();

    try {
      if(email && password){
        const value = {email, password}; 
        const response = await loginUser(value).unwrap();
        if(response.token){ //login try, and then get token
          await setToken(response.token);
          navigate("/");
        }
      }
      
    } catch (error) {
      console.log("error:" , error?.data?.message);
    }
  }


  return (
    <>
      <form className = "loginForm" onSubmit={userLogin}>
        <div className="mb-3">
          <label  className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} autoComplete="username"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" />
        </div>
        <div className="mb-3">
          <label  className="form-label">{error?.data?.message}</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;