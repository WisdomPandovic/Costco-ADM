import axios from "axios";
import { useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

function UpdatePost (){
    const navigate = useNavigate();
    const { _id } = useParams();
    const [updateProduct, setProduct] = useState([]); 

    useEffect(() => {
        fetch("http://localhost:3007/post/" + _id)
        .then((resp) => resp.json())
        .then((data) => {
            setProduct(data);
        });

        
    },[]);

    const updateProducts = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3007/post/" + _id, updateProduct)
        .then(res => {
            alert("Data update successfull !!!");
            navigate("/post");
        })
    }

    return(
        <div>
             <form className="form-content" onSubmit={updateProducts}>
                <div className="form-control">
                    <label htmlFor="image">Image</label>
                    <input type="file" value={updateProduct.image} onChange={(e) => setProduct( {...updateProduct, image: e.target.file})}/>
                  
                </div>
               
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={updateProduct.title ?? ''} onChange={(e) => setProduct({...updateProduct, title: e.target.value})}/>
                   
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <input type="text" value={updateProduct.tag?.title ?? ''} onChange={(e) => setProduct({...updateProduct, tag: e.target.value})}/>
                    
                </div>

                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <input type="text" value={updateProduct.description} onChange={(e) => setProduct({...updateProduct, description: e.target.value})}/>
                    
                </div>
                <div className="form-btn">
                    <button >Update Product</button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePost;