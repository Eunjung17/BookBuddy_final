import { Link } from 'react-router-dom';
import './navigationStyles.css';

export default function SingleBook() {
    return(
    <>
        <div className="mainTitle">
            <div><h1>Welcome to visit our BookBuddy Library</h1></div>
            <div className = "signinLogin">
            <Link to="/Signup"><button type="button" className="btn btn-outline-primary">Sign Up</button></Link>&nbsp;&nbsp;
            <Link to="/Login"><button type="button" className="btn btn-outline-success">Log In</button></Link>
            </div>
            </div>

            <div className="topnav">
            <a className="active" href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </div>    
    </>
    );
}