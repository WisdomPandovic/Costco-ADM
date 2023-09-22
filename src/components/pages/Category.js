import AsideBar from "./AsideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {MdDelete} from "react-icons/md";
import {FiEdit3} from "react-icons/fi";

function Category() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    title: "",
  });

    const submitForm = (e) => {
    e.preventDefault();
    const userData = {
      title: user.title,
      product: [],
    };

    // console.log(user);
    // console.log(userData);

    axios
      .post("http://localhost:3008/category", userData)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      });

      if(setUser){
        alert("Category Created")
        setUser( {
            title: "",
        
        });
       }
  };

  useEffect(() => {
    fetch("http://localhost:3008/category")
      .then((resp) => resp.json())
      .then((data) => {
        setTags(data);
        setLoading(false);
      });
  }, []);


  const onDelete = async (_id) => {
    try {
      await axios.delete("http://localhost:3008/category/" + _id); 
      setTags(prevUsers => prevUsers.filter(tag => tag._id !== _id));
      alert("Tag deleted successfully");
      // toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting tag:", error);
      // toast.error("An error occurred while deleting the user");
    }
    // console.log(_id)
  };

  const setData = (data) => {
    // console.log(data);
  };

  return (
    <div>
      <AsideBar />
      <form className="form-content-tag" onSubmit={submitForm}>
        <div className="form-control">
          <label htmlFor="first_name">Category</label>
          <input
            type="text"
            value={user.title}
            onChange={(e) => setUser({ ...user, title: e.target.value })}
          />
        </div>
        <div className="form-btn-tag">
          <button>Submit</button>
        </div>
      </form>

      <div className="admin-users">Categories</div>
      <div className="tag-list">
        {loading === true ? (
          <div>Loading please wait...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Category ID</th>
                <th>Category Title</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, index) => (
                <tr key={tag._id}>
                  <td className="td-wd">{index + 1}</td>
                  <td>{tag._id}</td>
                  <td>{tag.title}</td>
                  <td key={tag._id} className="flexv">
                    <div className="tag-edit">
                      <Link to={`/updateTag/${tag._id}`}>
                        <button onClick={() => setData()}><FiEdit3 className="edit-icon"/></button>
                      </Link>
                    </div>
                    <button onClick={() => onDelete(tag._id)}><MdDelete className="delete-icon"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Category;

