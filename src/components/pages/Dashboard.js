import AsideBar from "../pages/AsideBar";
import { useEffect, useState, useContext } from "react";
import {FaUsers} from "react-icons/fa";
import {ImHome3} from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

function Dashboard (){

    const [AdminUsers, setAdminUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [comment, setComment] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3008/users")
        .then((resp) => resp.json())
        .then((data) => {
            setAdminUsers(data);
        });

        
    },[]);

    useEffect(() => {
        fetch("http://localhost:3008/products")
        .then((resp) => resp.json())
        .then((data) => {
            setProducts(data);
        });

        
    },[]);

    

    const [postsData, setPostsData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://localhost:3008/products")
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            const filterTag = data.filter ((product) => {
                return product.category.title === "iPhone";
            } )
            setPostsData(filterTag);
            // setPostsData(data);
            console.log(filterTag)
            setLoading(false)
        });
        //  console.log(productsData.length)
        
    },[]);

    const [cart, setCart] = useState([]);

    const localStorageCart = localStorage.getItem("social-cart");

    useEffect(() => {
        if(localStorageCart){
          let CartData = JSON.parse(localStorageCart);
          setCart(CartData);
        }

    }, []);
    

    return(
        <div>
            <AsideBar/>
            <div className="team-member"><ImHome3/>   Team Member Dashboard</div>
            <div className="products">
                <div className="product-card green ">
                   <p>Total Product ({products.length})</p>
                </div>

                <div className="product-card purple">
                    <p>Total Users ({AdminUsers.length})</p>
                </div>

                <div className="product-card blue">
                    <p>Total Product in Cart ({cart.length})</p>
                </div>
            </div>

            <div className="product-list">
                <table>
                    <th>Product Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Description</th>
                </table>
                {loading === true ? (
                    <div>Loading please wait...</div>
                ) : (

                    postsData.slice(0,3).map((post) => (
                        // postsData.map((post) =>(
                <table >
                    <tr key={post._id}>
                        

                        <td><img src={post.image} alt="image" /></td>
                        <td>{post.name  ?? ''}</td>
                        <td>{post.category?.title ?? ''}</td>
                        <td>{post.description}</td>
                        
                    </tr>
                </table>
                    ))

                )}

            </div>
            
        </div>
    )
}

export default Dashboard;