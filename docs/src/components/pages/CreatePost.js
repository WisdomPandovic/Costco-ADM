import AsideBar from "./AsideBar"
import { useState, useEffect } from "react";
// import axios from "axios";

function CreatePost() {
    const [options, setOptions] =useState();
    const [values, setValues] =useState([]);
    const [title, setTitle] =useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const check =async() => {
        // e.preventdefault();
        console.log('Request Started');
     let formdata = new FormData()
     formdata.append('title', title);
     formdata.append('tag', tag);
     formdata.append('description', description);
     formdata.append('image', image);
     console.log("form data",formdata.get('image'));
    //  return false;
     let response = await fetch("http://localhost:3007/post",{
      method:"Post",
      body:formdata,
      // headers:{
      //   'Content-Type':"multipart/form-data",
      // }
     });
     if(response.status === 200){
      alert("Post created");
     
     }
     console.log('response',response.data);
     
    }

    useEffect(() => {
      console.log('I restarted');
      fetch("http://localhost:3007/tag",)
      .then((data) => data.json())
      .then((val) => {
        setValues(val);
      });

    },[]);
    // console.log(values, "values")
   
  return (
    <div>
      <AsideBar/>
      <form onSubmit={(e)=>{e.preventDefault();}} className="form-content"  >
      
          <div className="form-control">
            <label htmlFor="">Title</label>
            <input type="text" id="name" name="title" onChange={(e)=>setTitle(e.target.value)} />
          </div>

          <div className="form-control">
            <label htmlFor="">Tag</label>
            {/* <input type="text" id="category" name="tag" onChange={(e)=>setTag(e.target.value)} /> */}
            <select name="tag" onChange={(e)=>setTag(e.target.value)}>
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
