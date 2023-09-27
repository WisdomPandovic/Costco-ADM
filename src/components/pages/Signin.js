import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import {FaFacebook} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
import {FaApple} from 'react-icons/fa';
import {FaGoogle} from 'react-icons/fa';
import {FaYahoo} from 'react-icons/fa';
import {BsArrowLeftShort} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CostcoContext } from '../Context/CostcoContext';
import axios from "axios";

import './Register.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Signin(){

    const {userID, setUserID, setOnline, online, setIsLoggedIn,setUserName, AdminUserID } = useContext(CostcoContext)
    const [AvatarUrl, setAvatarUrl] = useState([]); 
    const navigate = useNavigate()
    const [err, setErr] = useState(false);
    const [user, setUser] = useState({
       email: "",
       password: "",
       lastLogin: "", 
    });
    let login = user;
    
    const submitForm = (e) => {
      const _id = AdminUserID
      e.preventDefault();
      if (user.email === "" || user.password === "") {
        setErr(true);
      } else {
        setErr(false);
        axios.post("http://localhost:3008/admin-login", user)
          .then((resp) => {
            if (resp.status === 401 && resp.data.message === 'Unauthorized') {
              alert("Unauthorized. Please sign in with an admin account.");
            } else if (resp.data.token) {
              const newToken = resp.data.token;
              localStorage.setItem('CostcoAdmin_USER', JSON.stringify(newToken));
              setOnline(true);
              setIsLoggedIn(true);
              setUserID(newToken);
               
               const decodedPayload = JSON.parse(atob(newToken.split('.')[1]));
               setUserName(decodedPayload.name);

               fetch(`http://localhost:3008/users/${_id}`)
               .then((resp) => resp.json())
               .then((data) => {
                   console.log(data);
                   const avatarUrl = data.avatar;
                   localStorage.setItem('CostcoAdmin_Avatar', avatarUrl);
                   setAvatarUrl(avatarUrl);
                   console.log(AvatarUrl)
               });

              toast.success("Successfully logged in");
              navigate("/dashboard");
            } else {
              alert("Invalid user. Please sign up.");
            }
          })
          .catch((error) => {
            console.error(error);
            alert("An error occurred. Please try again later.");
          });
      }
    };

  //   const submitForm = (e)=>{
  //     e.preventDefault();
  //     if(user.email === "" || user.password === ""){
  //       setErr(true)
  //     }else{
  //       setErr(false)
  //         console.log(user);
  //         axios.post("http://localhost:3008/admin-login", user).then(res=>{
  //             console.log(res);
  //       if(res.data.msg === 'Login successful'){
  //             console.log(res.data);
  //             localStorage.setItem('CostcoAdmin_USER', JSON.stringify(res.data.data))
  //             setOnline(true);
  //             setIsLoggedIn(true);
  //             let rawData = localStorage.getItem("CostcoAdmin_USER")
  //             let localData = JSON.parse(rawData)
  //             setUserID(localData)
  //             console.log(userID);
  //             navigate("/dashboard");
  //         }else{
  //             alert("invalid user please signup..")
              
  //         }
        
          
  //     })
  //     }
      
      

  // }


     console.log(userID);
     return(
        <div className="reg-bk">
            <div className='reg-text'><h2>Costco Admin</h2></div>
           
            <div className="form-heading4">
                <h2>Sign In with</h2>
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
            <div className='bk-1'>

            <form className="form-content-reg " onSubmit={submitForm}>
                <div className="form-control">
                    
                    <input type="text" value={user.email} placeholder='Email' onChange={(e) => setUser({...user, email: e.target.value})}/>
                    {err === true && user.email === "" ? <span>Email required</span> : null}
                </div>
               
                <div className="form-control">
                   
                    <input type="password" value={user.password} placeholder='Password' onChange={(e) => setUser({...user, password: e.target.value})}/>
                    {err === true && user.password === "" ? <span>Password required</span> : null}
                </div>

                <div className="flexs">
                    <Link to="/signup" className='newpost'><p>need an Account?</p></Link>
                    <Link to="/forgot-password" className='newpost'><p>Forgot Password?</p> </Link>
                    <button >Sign In</button>
                </div>
                <div className="form-btn2">
                    
                </div>
                <ToastContainer />
            </form>
            </div>
        </div>
         
     )
}
export default Signin;