import { useState} from "react";
import { useNavigate } from "react-router-dom";
import './UserStyles.css'
import { useAddUserMutation } from '../../redux/slices/userSlice'


const RegisterForm = ({token, setToken}) => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState("");

  const [addUser, {isLoading,error}] = useAddUserMutation();
  const value = {firstName, lastName, email, password};

  const userRegistration = async(event) => {

    event.preventDefault();
    try {
      if(firstName && lastName && password && password2){
        if(password === password2){
  
          const {data , error} = await addUser(value);

          if(!error){ // If there is not an error after addUser
            setAlert("success");
            setToken(data.token);

            setTimeout(function(){
              navigate(`/`);
            },2000);

          }else{
            setAlert("error");
          }
        }else{
          setAlert("password");
        }

      }else{
        setAlert("inputField");
      }

    } catch (error) {
      setAlert("error");
      console.log(error);
    }

  }


  return (
    <>


    <form className="row g-3 registerForm" onSubmit={userRegistration}>
      {alert && (alert === "password" || alert === "inputField" ) &&
        <div className="alert alert-primary d-flex align-items-center alertSize" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2  alertSize" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
            {alert === "password" && <div>Put your password correctly.</div>}
            {alert === "inputField" && <div>Check all the Fields that you entered correctly again.</div>}
        </div>
      }
      {alert && alert === "error" &&
        <div className="alert alert-primary d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2  alertSize" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <div>
            {error?.data?.message}
          </div>
        </div>
      }
      {alert && alert === "success" &&
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Registration successful!</h4>
        <p>Your registration information is stored successfully on our website.</p>
      </div>
      }
      <div className="row">
      <label className="form-label">Name</label>
        <div className="col">
          <input type="text" className="form-control" placeholder="First name" aria-label="First name" onChange={(e)=>setFirstName(e.target.value)}/>
        </div>
        <div className="col">
          <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" onChange={(e)=>setLastName(e.target.value)}/>
        </div>
      </div>
      <div className ="EmailPwd">
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control"  placeholder="sample@google.com" id="inputEmail4" onChange={(e)=>setEmail(e.target.value)} autoComplete="username"/>
        </div>

        <div className="row">
          <label className="form-label">Password</label>
            <div className="col">
              <input type="password" className="form-control" placeholder="Password" aria-label="Password" autoComplete="new-password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="col">
              <input type="password" className="form-control" placeholder="Re-password" aria-label="Re-password" autoComplete="new-password" onChange={(e)=>setPassword2(e.target.value)}/>
            </div>
        </div>

      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Sign in</button>
      </div>
      {isLoading && <output>Uploading information...</output>}
      {error && <output>{error.message}</output>}
    </form>
    </>
  );
};

export default RegisterForm;