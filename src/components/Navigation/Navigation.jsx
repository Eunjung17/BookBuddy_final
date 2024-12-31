import { Link } from 'react-router-dom';
import './navigationStyles.css';
import { useNavigate } from "react-router-dom";
import image from '../../assets/library.jpg';

export default function Navigation({token, setToken}) {

    const navigate = useNavigate();

    const logOut = async () => {
        await setToken(null);
        
        setTimeout(function(){
            navigate("/");
        },1000);
    }

    return(
    <>
        <div className = "whole">
            <div className="mainTitle"><img className = "libraryImg" src={image} alt="image" /><h1>Welcome to visit our BookBuddy Library</h1></div>
            <div className = "signinLogin">
                {!token ? 
                    <>
                        <Link to="/Login"><button type="button" className="btn btn-outline-success">Log In</button></Link> 
                        <Link to="/Signup"><button type="button" className="btn btn-outline-primary">Sign Up</button></Link>
                    </>
                    :
                    <>
                        <button type="button" className="btn btn-outline-success" onClick={logOut}>LogOut</button>
                        <Link to="/UserProfile"><button type="button" className="btn btn-outline-primary">My Profile</button></Link>
                        <Link to="/Reservations"><button type="button" className="btn btn-outline-primary">My Reservation</button></Link>
                    </>

                }
            </div>
        </div>

            <div className="topnav">
            <Link to="/">Home</Link>
        </div>    
    </>
    );
}