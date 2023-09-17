import AsideBar from "./AsideBar"
import { useState, useEffect, useContext } from "react";
import { CostcoContext } from '../Context/CostcoContext';
import { useNavigate } from 'react-router-dom';
// import axios from "axios";

function CreatePost() {
    const [options, setOptions] =useState();
    const [values, setValues] =useState([]);
    const [name, setName] =useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");

    const {userID, setUserID} = useContext(CostcoContext)
    console.log(userID)
    const navigate = useNavigate()

   
        let rawData = localStorage.getItem("CostcoAdmin_USER")
        let localData = JSON.parse(rawData)
      
      
    


    const check =async() => {
        // e.preventdefault();

        console.log('userID:', userID); 
        
     let formdata = new FormData()
     formdata.append('name', name);
     formdata.append('category', category);
     formdata.append('description', description);
     formdata.append('price', price);
     formdata.append('quantity', quantity);
     formdata.append('image', image);
     console.log('userID:', userID);
     formdata.append('user', userID);
     console.log("form data",formdata.get('image'));

      // Log the token before making the request
  console.log("Token to be sent:", formdata.get('user'));
     
  console.log('Token Value:', userID);

    //  return false;
     let response = await fetch("http://localhost:3008/product",{
      method:"Post",
      body:formdata,
      headers: {
        'Authorization': `Bearer ${rawData}`,
      }
     });
     if(response.status === 200){
      alert("Product created");
      // navigate("/post");
     }
    else {
      // Handle other status codes (e.g., 400, 401, 500)
      console.error('Error:', response.statusText);
    }

    // To get the response data (if it's JSON)
    const responseData = await response.json();
    console.log('Response data:', responseData);
    //  console.log('response',response.data);

   
     
    }

    
    useEffect(() => {
      if(localStorage){
        let rawData = localStorage.getItem("CostcoAdmin_USER")
        let localData = JSON.parse(rawData)
        setUserID(localData)
      }
      console.log('I restarted');
      fetch("http://localhost:3008/category",)
      .then((data) => data.json())
      .then((val) => {
        setValues(val);
      });

    },[]);
    // console.log(values, "values")
    
    // console.log(userID.data.id);
    return (
    <div>
      <AsideBar/>
      <form onSubmit={(e)=>{e.preventDefault();}} className="form-content"  >
      
          <div className="form-control"  value={userID}>
            <label htmlFor="">Name</label>
            <input type="text" id="name" name="name" onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="form-control">
            <label htmlFor="">Category</label>
            <select name="category" onChange={(e)=>setCategory(e.target.value)}>
              {
                values.map((opts,i) => <option key={i} value={opts._id}>{opts.title}</option>)
              }
            </select>
          </div>
          
          <div className="form-control">
            <label htmlFor="">Description</label>
            <input type="text" id="description" name="description"  onChange={(e)=>setDescription(e.target.value)}/>
          </div>

          <div className="form-control">
            <label htmlFor="">Price</label>
            <input type="text" id="price" name="price"  onChange={(e)=>setPrice(e.target.value)}/>
          </div>

          <div className="form-control">
            <label htmlFor="">Quantity</label>
            <input type="text" id="quantity" name="quantity"  onChange={(e)=>setQuantity(e.target.value)}/>
          </div>

          <div className="form-control">
            <label htmlFor="">Image</label>
            <input type="file" id="image" name="image" onChange={(e)=>setImage(e.target.files[0])} />
          </div>
       
          <div className="form-btn">
            <button onClick={check}>Submit</button>
          </div>
      </form>
    </div>
  );
}
export default CreatePost;
