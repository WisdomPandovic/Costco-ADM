import AsideBar from "../pages/AsideBar"
import { useState } from "react";
// import axios from "axios";
import React, { useEffect} from 'react';

function CreateProduct() {
  const [values, setValues] = useState([])
  const [options, setOptions] = useState()
    const [title, setTitle] =useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [PostData, setPostData] = useState({
      title: "",
      description: "",
      image: "",
      tag: "",
      // user_id: userID.id,
  })
    
    const check =(e) =>{
        e.preventdefault();
     let formdata = new FormData()
    //  formdata.append('title', title);

    //  formdata.append('tag', tag);
   
    //  formdata.append('description', description);
    //  formdata.append('image', image);
     console.log(PostData);
    }

    // console.log(formdata)

    useEffect(() => {
      fetch("http://localhost:3007/tag",)
      .then((data) => data.json())
      .then((val) => {
          setValues(val);
        
      });

      
  },[]);
  // console.log(values, "values")
 

useEffect(()=>{
  fetch('http://localhost:3007/tag').then(res=> res.json()).then(res => {
      return setTag(res) 
  })
},[])
   
  return (
    <div>
      <AsideBar/>
    <form  encType="multipart/form-data" className="form-content"  onSubmit={ (e)=> check(e)}>
      
          <div className="form-control" >
            <label htmlFor="">Title</label>
            {/* <input type="text" id="name" name="title" onChange={(e)=>setTitle(e.target.value)} /> */}
            <input placeholder='Title' name='title' value={PostData.title} onChange={(e)=>setPostData({...PostData, title:e.target.value})}></input>
          </div>

          <div className="form-control">
            <label htmlFor="">Tag</label>
            <select name="tag" value={PostData.tag} onChange={(e)=>setOptions(e.target.value)}>
              {
                values.map((opts,i) => <option key={i} value={tag.id}>{opts.title}</option>)
              }
            </select>

          </div>
          
          <div className="form-control">
            <label htmlFor="">Description</label>
            {/* <input type="text" id="description" name="description"  onChange={(e)=>setDescription(e.target.value)}/> */}
            <textarea className='text_input' name='description' value={PostData.description} onChange={(e)=>setPostData({...PostData, description:e.target.value})} placeholder='Text (Optional)'></textarea>
          </div>

          <div className="form-control">
            <label htmlFor="">Image</label>
            <input type="file" id="image" name="image"  onChange={(e)=>setPostData({...PostData, image:e.target.files[0]})} />
          </div>
       
          <div className="form-btn">
            <button>Submit</button>
          </div>
      </form>
    </div>
  );
}
export default CreateProduct;
