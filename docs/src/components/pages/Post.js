import AsideBar from "./AsideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
function Post (){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3007/post")
        .then((resp) => resp.json())
        .then((data) => {
            // const filterCategory = data.filter ((prod) => {
            //     return prod.category === "Toys"
            // } )
            setProducts(data);
            setLoading(false)
        });

        
    },[]);

    const onDelete = (_id) => {
        axios.delete("http://localhost:3007/post/" + _id)
    }

    const setData = (data) => {
        console.log(data)
      
    }

    return(
        <div>
            <AsideBar/>
            <div className="admin-users">Post</div>
            <div className="adm-products">
                {loading === true ? (
                    <div>Data Loading, please wait....</div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="adm-product-card" >
                            <div className="shopComputer-product">
                               <img src={"http://localhost:3007/post" + product.image} alt="product" className="product-img" />
                               <h2>{product.title ?? ''}</h2>
                               <p>{product.tag?.title ?? ''}</p>
                               <p>{product.description}</p>
                               {/* <div key={product._id}>
                                     <Link to={`/updatePost/${product._id}`}><button onClick={() => setData()}>Edit</button></Link>
                                    <button onClick={() => onDelete(product._id)}>Delete</button>
                                 
                                </div> */}
                               
                            </div>
                        </div>
        
                       ))
                )}
            </div>

        </div>
    )
}

export default Post;