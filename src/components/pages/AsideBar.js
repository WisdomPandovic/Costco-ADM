import {Link} from 'react-router-dom';
import {ImHome3} from 'react-icons/im';
import {FaUserCheck} from "react-icons/fa";
import {FaUsers} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx";
import {GiTeamUpgrade} from "react-icons/gi";
import {GiOpenedFoodCan} from "react-icons/gi";
import {FcSearch} from "react-icons/fc";
import {DiPhonegap} from "react-icons/di";
import {SiProducthunt} from "react-icons/si";
import {RiUserStarFill} from "react-icons/ri";
import {SiPostman} from "react-icons/si";
import { CostcoContext } from '../Context/CostcoContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavImg from "../../image//20220624_093652.jpg"

function AsideBar(){
    const {isLoggedIn, setIsLoggedIn} = useContext(CostcoContext)
    const navigate = useNavigate()

const handleNewPostClick = (route) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      alert("You need to sign in to create a post.");
 
      navigate("/");
    }
  };

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

    const handleLogout = () => {
        try {
          const rawData = localStorage.getItem('CostcoAdmin_USER');
      
          if (rawData) {
            const localData = JSON.parse(rawData);
            localStorage.removeItem('CostcoAdmin_USER');
            localStorage.removeItem('CostcoAdmin_TOKEN');
            navigate("/");
          }
      
          setIsLoggedIn(false);
        } catch (error) {
          console.error('Error while handling logout:', error);
        }
      };
      let rawData = localStorage.getItem("CostcoAdmin_USER")
    //   let localData = JSON.parse(rawData)
      const userDataString = rawData
    //   const userDataString = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDE5YWUzOTYxNzU0N2Y5YTk2OGNlMSIsIm5hbWUiOiJPa2lQZXRlciIsImVtYWlsIjoib2tpcGV0ZXJAaG90bWFpbC5jb20iLCJwaG9uZU51bWJlciI6MTIzNDY3ODkwLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTQ5NDM2NzMsImV4cCI6MTY5NDk1MDg3M30.T8JmzDpw55VQB7oxdPn3ZseGLu4zn9PRhhGeZFs0UzY";

const decodedPayload = JSON.parse(atob(userDataString.split('.')[1]));

console.log(decodedPayload.name); // Output: Okipeer
const userName = decodedPayload.name;

// Use the userName in your template string
const greeting = `${userName}!`;

console.log(greeting);


    return(
        <div>
            <aside className="aside-bar">
                <div className='admUser-pro'>
                    <div>
                    <img src={NavImg} alt=""/>
                    <p>{`${userName} `}</p>
                    </div>

                    <div><button>User Menu</button></div>
                </div>
                <div className="dashboard">
                    <div className="aside-links">
                        <div onClick={() => handleNewPostClick("/dashboard")}>
                            <Link to="/dashboard" class="aside-bar-link nav-flex" >
                                <ImHome3/>
                                <p>Dashboard</p> 
                            </Link>
                        </div>
                    </div><hr/>
                    <div className="aside-links">
                        <div onClick={() => handleNewPostClick("/product")}>
                            <Link to="/product" class="aside-bar-link nav-flex" >
                                <DiPhonegap/>
                                <p>View Product</p>
                            </Link>  
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={() => handleNewPostClick("/users")}>
                            <Link to="/users" class="aside-bar-link nav-flex">
                                <FaUsers/> 
                                <p>Users</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/createProduct" class="aside-bar-link nav-flex">
                                <SiProducthunt/> 
                                <p>Create Product</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}> 
                            <Link to="/createUsers" class="aside-bar-link nav-flex">
                                <RiUserStarFill/> 
                                <p>Create Users</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/category" class="aside-bar-link nav-flex">
                                <RxDashboard/> 
                                <p>Create Category</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/usersWithProducts" class="aside-bar-link nav-flex">
                                <SiPostman/> 
                                <p>Users Products</p>
                            </Link>
                        </div>
                    </div><hr/>
                </div>
           </aside>

           <nav>
                <div className='flex'>
                    <div className='flex-btn'>
                        {/* <input type='text' placeholder='search'/> */}
                        {/* <button>
                        <Link to="/signup" class="aside-bar-link"><GiTeamUpgrade/> Signup</Link></button>
                        <button>
                        <Link to="/signin" class="aside-bar-link"><GiTeamUpgrade/> Signin</Link></button> */}
                        {/* <h2 className='navBar-signin'><Link to="/signin" className='newpost'>Sign In</Link></h2>
                        <div><button><Link to="/signup" className='newpost'>Sign Up</Link></button></div> */}
                    </div>
                    {/* <div><FaUserCheck/></div> */}
                    <div className='log-out'>
                        <button onClick={handleLogout}>Sign out</button>
                    </div>
                </div>
           </nav>

        </div>
    )
}

export default AsideBar;