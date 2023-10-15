import AsideBar from "../pages/AsideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
function Products (){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://159.65.21.42:9000/products")
        .then((resp) => resp.json())
        .then((data) => {
            const filterCategory = data.filter ((prod) => {
                return prod.category === "Toys"
            } )
            setProducts((filterCategory));
            setLoading(false)
        });

        
    },[]);

    const onDelete = (_id) => {
        axios.delete("http://159.65.21.42:9000/product/" + _id)
    }

    const setData = (data) => {
        console.log(data)
      
    }

    return(
        <div>
            <AsideBar/>
            <div className="admin-users">Products</div>
            <div className="adm-products">
                {loading === true ? (
                    <div>Data Loading, please wait....</div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="adm-product-card" >
                            <div className="shopComputer-product">
                               <img src={"http://159.65.21.42:9000" + product.image} alt="product" className="product-img" />
                               <h2>{product.name}</h2>
                               <p>$ {product.price}</p>
                               <p>{product.quantity}</p>
                               <p>{product.description}</p>
                               <div key={product._id}>
                                     <Link to={`/updateProduct/${product._id}`}><button onClick={() => setData()}>Edit</button></Link>
                                    <button onClick={() => onDelete(product._id)}>Delete</button>
                                    {/* <button>Edit</button> */}
                                    {/* <button>Delete</button> */}
                                </div>
                               
                            </div>
                        </div>
        
                       ))
                )}
            </div>

        </div>
    )
}

export default Products;