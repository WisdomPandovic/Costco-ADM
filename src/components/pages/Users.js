import AsideBar from "../pages/AsideBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {MdDelete} from "react-icons/md";
import {FiEdit3} from "react-icons/fi";

import {RxDashboard} from "react-icons/rx";
import {DiPhonegap} from "react-icons/di";
import {RiUserStarFill} from "react-icons/ri";
import {SiPostman} from "react-icons/si";
import {ImHome3} from 'react-icons/im';
import {FaUsers} from "react-icons/fa";
import {SiProducthunt} from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { CostcoContext } from '../Context/CostcoContext';

function formatDate(timestamp) {

    if (!timestamp) {
        return 'Never';
    }

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year}  ${hours}:${minutes}`;
}

function Users(){
    const navigate = useNavigate()
    const [AdminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isLoggedIn } = useContext(CostcoContext)

    useEffect(() => {
        fetch("http://localhost:3008/users")
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data); 
            setAdminUsers(data);
            setLoading(false)
        });

        
    },[]);

      const onDelete = async (_id) => {
        try {
          await axios.delete("http://localhost:3008/user/" + _id); 
          setAdminUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
          toast.success("User deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user");
        }
        console.log(_id)
      };
      
    const setData = (data) => {
        console.log(data)
      
    }

    const handleNewPostClick = (route) => {
   
        if (isLoggedIn) {
          navigate(route);
        } else {
          alert("You need to sign in to create a post.");
     
          navigate("/");
        }
      };

    return (
        <div>
            <AsideBar />
            <div class="hamburger_container">
                <label for="menu_check">&#9776;</label>
                <input type="checkbox" id="menu_check"/>
                <div class="hide_nav_container">
                   
             

              
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
                                <p>Admin Products</p>
                            </Link>
                        </div>
                    </div><hr/>
                </div>
                   


           
                </div>
            </div>
            <div className="admin-users">Users</div>
            <div className="users-list">
                {loading === true ? (
                    <div>Loading please wait...</div>
                ) : (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th >#</th>
                                <th>Avatar</th>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Last Logged In</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AdminUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td >{index + 1}</td>
                                    <td> <img src={user.avatar} alt="image" className="product-img" /></td>
                                    <td>{user.name}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>{formatDate(user.lastLogin)}</td>
                                    <td className="flexv">
                                        <div className="tag-edit">

                                           <Link to={`/updateUsers/${user._id}`}>
                                                <button onClick={() => setData()}><FiEdit3 className="edit-icon"/></button>
                                           </Link>
                                        </div>
                                        <button onClick={() => onDelete(user._id)}><MdDelete className="delete-icon"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <ToastContainer />
            </div>
        </div>
    );
}

export default Users;