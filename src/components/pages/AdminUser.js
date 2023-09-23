import AsideBar from "./AsideBar";
import axios from "axios";
import { useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { CostcoContext } from '../Context/CostcoContext';

function AdminUser (){
    const { AdminUserID} = useContext(CostcoContext)
    const navigate = useNavigate();
    const { _id } = useParams();
    // console.log("_id parameter:", _id);
    const [user, setUser] = useState([]); 
    const [AvatarUrl, setAvatarUrl] = useState([]); 


    useEffect(() => {
        fetch("http://localhost:3008/users/" + _id)
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
        });

        
    },[]);

    const updateUser = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3008/users/" + _id, user)
        .then(res => {
            alert("Data update successfull !!!");
            toast.success("Data update successfull !!!");
            navigate("/dashboard");
        })
    }

    // const updateUser = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.put("http://localhost:3008/users/" + _id, user);
    //         toast.success("Data update successful !!!");
    //         navigate("/dashboard");
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //         toast.error("An error occurred while updating user");
    //     }
    // }
    

    const onDelete = async (_id) => {
        try {
          await axios.delete("http://localhost:3008/user/" + _id); 
          setUser(prevUsers => prevUsers.filter(user => user._id !== _id));
          toast.success("User deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user");
        }
        // console.log(_id)
      };

      useEffect(() => {

        const _id = AdminUserID
        console.log(AdminUserID)
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
        <div className="milesx">
            <AsideBar />
            <div className="">
                <div className="admin-user admin-user-flex">
                    <div className="admin-avatar">
                        <p>Change Avatar</p>
                        <img src={AvatarUrl} alt="Avatar" onError={(e) => console.error("Error loading image", e)} />
                    </div>

                    <div className="admin-avatar">
                        <p>Account Settings</p>
                        <form className="row" onSubmit={updateUser}>
                            <div className="form-control">
                                <div><label htmlFor="first_name">Username</label></div>
                                <input className="form-control" type="text" value={user.name} onChange={(e) => setUser({...user, username: e.target.value})}/>
                  
                            </div>
                            <div className="form-control">
                                <div><label htmlFor="phone">Phone Number</label></div>
                                <input className="form-control" type="text" value={user.phoneNumber} onChange={(e) => setUser({...user, phoneNumber: e.target.value})}/>
                   
                            </div>
                            <div className="form-control">
                                <div><label htmlFor="email">Email</label></div>
                                <input className="form-control" type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                    
                            </div>
                            <div className="form-control">
                                <div><label htmlFor="password">Password</label></div>
                                <input className="form-control" type="text" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                    
                            </div>
                            <div className="form-control">
                               <div className="admin-form-btn2">
                                   <button type="submit" >Update</button>
                               </div>
                            </div>
                            <div className="form-control">
                            <div className="admin-form-btn">
                                   <button onClick={() => onDelete(user._id)} >Delete Account</button>
                               </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminUser