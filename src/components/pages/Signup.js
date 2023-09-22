import {Link} from 'react-router-dom';
import { useState } from "react";
import {FaFacebook} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
import {FaApple} from 'react-icons/fa';
import {FaGoogle} from 'react-icons/fa';
import {FaYahoo} from 'react-icons/fa';
import {BsArrowLeftShort} from 'react-icons/bs';
// import Signin from './Signin';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import './Register.css';

function Signup(){
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
     const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
     });

     const submitForm = (e) => {
        e.preventDefault();
        const userData = {
            username: user.username,
            phoneNumber: user.phoneNumber,
            email: user.email,
            password: user.password,
        };
        console.log(userData)

        if ( user.username ==="" || user.email ==="" || user.password ==="" || user.phoneNumber ==="" ){
          setErr(true);
        }else {
            setErr(false);
            axios.post("http://localhost:3007/users", userData)
            .then((resp) => {
                console.log(resp.data)
                setUser(resp.data)
                .catch((error) => {console.error(error);})
            })
            
            setErr(false);
            navigate("/");
            
        }
     };
    

     return(
        <div className="reg-bk">
            <div className='reg-text'><h2>Costco</h2>  <p>Admin</p></div>
           
            <div className="form-heading4">
                <h2>Registration with</h2>
            </div>

            <div className='imgur-icons'>
                <div className='grid-5'>
                    <div className='sc-bk'><FaFacebook className='imgur-social-icons'/></div>
                    <div className='sc-bk'><FaTwitter className='imgur-social-icons'/></div>
                    <div className='sc-bk'><FaApple className='imgur-social-icons'/></div>
                    <div className='sc-bk'><FaGoogle className='imgur-social-icons'/></div>
                    <div className='sc-bk'><FaYahoo className='imgur-social-icons'/></div>
                </div>
            </div>

            <div className="form-heading2">
                <h2>or with Costco</h2>
            </div>

            <form className="form-content-reg" onSubmit={submitForm}>
                <div className="form-control">
                    
                    <input type="text" value={user.username} placeholder='Username' onChange={(e) => setUser({...user, username: e.target.value})}/>
                    {err === true && user.username === "" ? <span>Username required</span> : null}
                </div>
               
                <div className="form-control">
                    
                    <input type="text" value={user.email} placeholder='Email' onChange={(e) => setUser({...user, email: e.target.value})}/>
                    {err === true && user.email === "" ? <span>Email required</span> : null}
                </div>
                <div className="form-control">
                   
                    <input type="text" value={user.password} placeholder='Password' onChange={(e) => setUser({...user, password: e.target.value})}/>
                    {err === true && user.password === "" ? <span>Password required</span> : null}
                </div>

                 <div className="form-control">
                    
                    <input type="text" value={user.phoneNumber} placeholder='Phone Number' onChange={(e) => setUser({...user, phoneNumber: e.target.value})}/>
                    {err === true && user.phoneNumber === "" ? <span>Phone number required</span> : null}
                </div>

                <div className=" flexs">
                    <button >Submit</button>
                    <p><Link to="/" className='newpost'>Sign In</Link></p>
                </div>
            </form>
        </div>
         
     )
}
export default Signup;