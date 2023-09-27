import axios from "axios";
import { useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import AsideBar from "../pages/AsideBar";

function UpdateUsers(){
    const navigate = useNavigate();
    const { _id } = useParams();
    console.log("_id parameter:", _id);
    const [user, setUser] = useState({}); 
    

    useEffect(() => {
        fetch("http://localhost:3008/users/" + _id)
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data);
        });

        
    },[]);


    const updateUser = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3008/users/" + _id, user,)
        .then(res => {
            alert("Data update successfull !!!");
            navigate("/users");
        })
    }

    return(
        <div>
            <AsideBar/>
            <form className="form-content" onSubmit={updateUser}>
                <div className="form-control">
                    <label htmlFor="first_name">Username</label>
                    <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                  
                </div>
                <div className="form-control">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" value={user.phoneNumber} onChange={(e) => setUser({...user, phoneNumber: e.target.value})}/>
                   
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                    
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="text" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                    
                </div>
                <div className="form-control">
                    <label htmlFor="role">Role</label>
                    <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                       <option value="user">User</option>
                       <option value="admin">Admin</option>
                    </select>
                </div>

                {/* <div className="form-control">
                   <label htmlFor="avatar">Avatar</label>
                   <img src={user.avatar} alt="Avatar" value={user.avatar} onError={(e) => console.error("Error loading image", e)} />
                   <input type="file" id="avatar" name="avatar" onChange={(e) => setUser({...user, avatar: e.target.files[0]})} />
                </div> */}

           

                <div className="form-btn form-control">
                    <button type="submit" >Update</button>
                </div>
            </form>


        </div>
    )
}

export default UpdateUsers;