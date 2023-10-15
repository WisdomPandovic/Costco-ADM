import axios from "axios";
import { useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

function UpdateProduct (){
    const navigate = useNavigate();
    const { _id } = useParams();
    const [updateProduct, setProduct] = useState([]); 

    useEffect(() => {
        fetch("http://159.65.21.42:9000/product/" + _id)
        .then((resp) => resp.json())
        .then((data) => {
            setProduct(data);
        });

        
    },[]);

    const updateProducts = (e) => {
        e.preventDefault();
        axios.put("http://159.65.21.42:9000/update/product/" + _id, updateProduct)
        .then(res => {
            alert("Data update successfull !!!");
            navigate("/products");
        })
    }

    return(
        <div>
             <form className="form-content" onSubmit={updateProducts}>
                <div className="form-control">
                    <label htmlFor="image">Image</label>
                    <input type="file" value={updateProduct.image} onChange={(e) => setProduct( {...updateProduct, image: e.target.value})}/>
                  
                </div>
               
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={updateProduct.name} onChange={(e) => setProduct({...updateProduct, name: e.target.value})}/>
                   
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <input type="text" value={updateProduct.category} onChange={(e) => setProduct({...updateProduct, category: e.target.value})}/>
                    
                </div>
                <div className="form-control">
                    <label htmlFor="price">Price</label>
                    <input type="text" value={updateProduct.price} onChange={(e) => setProduct({...updateProduct, price: e.target.value})}/>
                    
                </div>

                <div className="form-control">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" value={updateProduct.quantity} onChange={(e) => setProduct({...updateProduct, quantity: e.target.value})}/>
                    
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

export default UpdateProduct;