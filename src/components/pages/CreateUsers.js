import AsideBar from "../pages/AsideBar";
import { useState } from "react";
import axios from "axios";

function CreateUsers() {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    const userData = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      membershipNumber: user.membershipNumber,
      product:[]
    };

    // console.log(user);
    // console.log(userData);

    axios
      .post("http://localhost:3008/admin-users", userData)
      .then((res) => {
        alert("successful")
        setUser({
             name: "",
             phoneNumber: "",
             email: "",
             password: "",
             membershipNumber: "",
         });
      })
      .catch((err) => {
       console.log(err.response.data || "Code 500: Internal Server Error")
      })
      
  };
  return (
    <div>
      <AsideBar />
      <form className="form-content" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="first_name">Name</label>
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}/>
        </div>

        <div className="form-control">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}/>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="text" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
        </div>
        
        <div className="form-btn">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateUsers;
