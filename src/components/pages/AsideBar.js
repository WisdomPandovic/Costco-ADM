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

import {FaShoppingCart} from 'react-icons/fa';
import {RiAccountCircleLine} from 'react-icons/ri';
import {MdLocationPin} from 'react-icons/md';
import {BsBoxSeam} from 'react-icons/bs';
import {CiSettings} from 'react-icons/ci';
import {AiOutlineIdcard} from 'react-icons/ai';
import {CiViewList} from 'react-icons/ci';
import {MdPayment} from 'react-icons/md';
import {CgUserList} from 'react-icons/cg';
import {GrMapLocation} from 'react-icons/gr';
import {MdCardMembership} from 'react-icons/md';
import {ImPaypal} from 'react-icons/im';
import {FaSignOutAlt} from 'react-icons/fa';
import {IoNotificationsSharp} from 'react-icons/io5';
import {RiMessage2Fill} from 'react-icons/ri';
import {FaBars} from 'react-icons/fa';

import Notification from "../pages/Notification";


function AsideBar(){
    const {isLoggedIn, setIsLoggedIn} = useContext(CostcoContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [isBarOpen, setIsBarOpen] = useState(false);

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

                    <div onClick={() => setIsOpen(true)}><button>User Menu</button></div>
                </div>
                {isOpen && (
                    <div className='popup'>
                    <div className='popup-flex'>
                        <div className='popup-welcome'>Welcome!</div>
                        <div onClick={() => setIsOpen(false)} className='popup-welcomeX'>X</div>
                    </div>

                   <div className='popup-link'>
                       <p><RiAccountCircleLine className='popup-icon' /></p>
                       <p><BsBoxSeam className='popup-icon'/> </p>
                       <p><CgUserList className='popup-icon'/></p>
                       <p><IoNotificationsSharp className='popup-icon'/> </p>
                       <p><MdPayment className='popup-icon'/> </p>
                       <p onClick={handleLogout}><FaSignOutAlt className='popup-icon'/></p>
                   </div><hr></hr>
                   
                   </div>
                )}
                
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
                    <div className='log-out'>
                        {/* <button onClick={handleLogout}>Sign out</button> */}
                    </div>

                    <div className='flex notification-bar'>
                       <p><IoNotificationsSharp className='popup-icon2'/> </p>
                       <p><RiMessage2Fill className='popup-icon3'/> </p>
                       <p onClick={() => setIsBarOpen(true)}><FaBars className='popup-icon3'/> </p>
                       {isBarOpen && (
                            <div className='barPopup'>
                                <div className='popup-flex'>
                                    <div className='popup-welcome'>Notifications</div>
                                    <div onClick={() => setIsBarOpen(false)} className='popup-welcomeX'>X</div>
                                </div>

                                <div className='notification'>
                                    <Notification/>
                                </div>
                   
                            </div>
                        )}
                    </div>
                </div><hr></hr>
           </nav>

        </div>
    )
}

export default AsideBar;