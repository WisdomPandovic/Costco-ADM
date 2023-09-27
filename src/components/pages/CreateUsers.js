import AsideBar from "./AsideBar"
import { useState, useEffect, useContext } from "react";
import { CostcoContext } from '../Context/CostcoContext';
import { useNavigate } from 'react-router-dom';
// import axios from "axios";

function CreateUsers() {
    
   
    const [name, setName] =useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const check =async() => {
     let formdata = new FormData()
     
     formdata.append('name', name);
     formdata.append('phoneNumber', phoneNumber);
     formdata.append('email', email);
     formdata.append('avatar', avatar);
     formdata.append('password', password);
     formdata.append('role', role);
   
     let response = await fetch("http://localhost:3008/admin-users",{
      method:"Post",
      body:formdata,
     
     });
     if(response.status === 200){
      alert("User created");
      // navigate("/post");
     }
    else {
      console.error('Error:', response.statusText);
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);
    }


    return (
    <div>
      <AsideBar/>
      <form onSubmit={(e)=>{e.preventDefault();}} className="form-content"  >
      
          <div className="form-control" >
            <label htmlFor="">Name</label>
            <input type="text" id="name" name="name" onChange={(e)=>setName(e.target.value)} />
          </div>
          
          <div className="form-control">
            <label htmlFor="">Email</label>
            <input type="text" id="email" name="email"  onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          <div className="form-control">
            <label htmlFor="">Phone Number</label>
            <input type="text" id="phonemunber" name="phonenumber"  onChange={(e)=>setphoneNumber(e.target.value)}/>
          </div>

          <div className="form-control">
            <label htmlFor="">Password</label>
            <input type="text" id="password" name="password"  onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          <div className="form-control">
            <label htmlFor="">Avatar</label>
            <input type="file" id="avatar" name="avatar" onChange={(e)=>setAvatar(e.target.files[0])} />
          </div>

          <div className="form-control">
                    <label htmlFor="role">Role</label>
                    <select  onChange={(e)=>setRole(e.target.value)}>
                       <option value="user">User</option>
                       <option value="admin">Admin</option>
                    </select>
                </div>
       
          <div className="form-btn">
            <button onClick={check}>Submit</button>
          </div>
      </form>
    </div>
  );
}
export default CreateUsers;
