import AsideBar from "../pages/AsideBar";
import { useState } from "react";
import axios from "axios";

function CreateUsers() {
  const [user, setUser] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    const userData = {
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
    };

    console.log(user);
    console.log(userData);

    axios
      .post("http://localhost:3007/users", userData)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data)
      });
      
      
  };
  return (
    <div>
      <AsideBar />
      <form className="form-content" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="first_name">Username</label>
          <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
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
