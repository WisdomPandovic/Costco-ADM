import AsideBar from "../pages/AsideBar";
import { useState } from "react";
import axios from "axios";

function Tag() {
  const [user, setUser] = useState({
    title: "",
   
  });

  const submitForm = (e) => {
    e.preventDefault();
    const userData = {
      title: user.title,
     
    };

    console.log(user);
    console.log(userData);

    axios
      .post("http://localhost:3007/tag", userData)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });
  };
  return (
    <div>
      <AsideBar />
      <form className="form-content" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="first_name">Tag</label>
          <input type="text" value={user.title} onChange={(e) => setUser({ ...user, title: e.target.value })}/>
        </div>

        
        
        <div className="form-btn">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Tag;
