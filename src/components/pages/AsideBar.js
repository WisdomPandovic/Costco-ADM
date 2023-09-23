import {Link} from 'react-router-dom';
import {ImHome3} from 'react-icons/im';
import {FaUsers} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx";
import {DiPhonegap} from "react-icons/di";
import {SiProducthunt} from "react-icons/si";
import {RiUserStarFill} from "react-icons/ri";
import {SiPostman} from "react-icons/si";
import { CostcoContext } from '../Context/CostcoContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavImg from "../../image//20220624_093652.jpg"

import {RiAccountCircleLine} from 'react-icons/ri';
import {BsBoxSeam} from 'react-icons/bs';
import {MdPayment} from 'react-icons/md';
import {CgUserList} from 'react-icons/cg';
import {FaSignOutAlt} from 'react-icons/fa';
import {IoNotificationsSharp} from 'react-icons/io5';
import {RiMessage2Fill} from 'react-icons/ri';
import {FaBars} from 'react-icons/fa';

import Notification from "../pages/Notification";
import {useParams} from "react-router-dom";
import axios from 'axios';

function AsideBar(){
    const { login, setLogin, online, setOnline, userID, setUserID, isLoggedIn, setIsLoggedIn, userName, setUserName, AdminUserID, setAdminUserID, } = useContext(CostcoContext)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [isBarOpen, setIsBarOpen] = useState(false);
    const { _id } = useParams();
    const [AvatarUrl, setAvatarUrl] = useState([]); 

const handleNewPostClick = (route) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      alert("You need to sign in to create a post.");
 
      navigate("/");
    }
  };

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
   
const setData = (data) => {
    // console.log(data)
  
}


useEffect(() => {

    const _id = AdminUserID
    fetch(`http://localhost:3008/users/${_id}`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);
        const avatarUrl = data.avatar;
        setAvatarUrl(avatarUrl);
        console.log(AvatarUrl)
    });

    
},[]);

    return(
        <div>
            <aside className="aside-bar">
                <div className='admUser-pro'>
                    <div>
                    {/* {AvatarUrl && <img src={AvatarUrl} alt="Avatar" /> } */}
                    <img src={AvatarUrl} alt="Avatar" onError={(e) => console.error("Error loading image", e)} />

                    <p>Welcome back, {`${userName} `}</p>
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
                        <Link to={`/adminUser/${AdminUserID}`}><button onClick={() => setData()}><p><RiAccountCircleLine className='popup-icon' /></p></button></Link>
                       <p><BsBoxSeam className='popup-icon'/> </p>
                       <p><CgUserList className='popup-icon'/></p>
                       <button onClick={() => setIsBarOpen(true)}><IoNotificationsSharp className='popup-icon'/> </button>
                       <p><MdPayment className='popup-icon'/> </p>
                       <div  ><button onClick={handleLogout}><FaSignOutAlt className='popup-icon red'/></button></div>
                   </div><hr></hr>
                   
                   </div>
                )}
                
                <div className="dashboard">
                    <div className="aside-links">
                        <div onClick={() => handleNewPostClick("/dashboard")}>
                            <Link to="/dashboard" className="aside-bar-link nav-flex" >
                                <ImHome3/>
                                <p>Dashboard</p> 
                            </Link>
                        </div>
                    </div><hr/>
                    <div className="aside-links">
                        <div onClick={() => handleNewPostClick("/product")}>
                            <Link to="/product" className="aside-bar-link nav-flex" >
                                <DiPhonegap/>
                                <p>View Product</p>
                            </Link>  
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={() => handleNewPostClick("/users")}>
                            <Link to="/users" className="aside-bar-link nav-flex">
                                <FaUsers/> 
                                <p>Users</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/createProduct" className="aside-bar-link nav-flex">
                                <SiProducthunt/> 
                                <p>Create Product</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}> 
                            <Link to="/createUsers" className="aside-bar-link nav-flex">
                                <RiUserStarFill/> 
                                <p>Create Users</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/category" className="aside-bar-link nav-flex">
                                <RxDashboard/> 
                                <p>Create Category</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/usersWithProducts" className="aside-bar-link nav-flex">
                                <SiPostman/> 
                                <p>Users Products</p>
                            </Link>
                        </div>
                    </div><hr/>
                </div>
           </aside>

           <nav>
                <div className='flex'>
                    <div className=''>
                        {/* <button onClick={handleLogout}>Sign out</button> */}
                        <form className="search-form">
                             <input type="text" placeholder="Search"/>
                             <button type="submit" className="search-button">Search</button>
                        </form>
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