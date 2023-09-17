import AsideBar from "./AsideBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {CostcoContext } from '../Context/CostcoContext';
import { useNavigate } from 'react-router-dom';
function Post (){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, setIsLoggedIn, userID } = useContext(CostcoContext);
    const navigate = useNavigate();

    
  const handleNewPostClick = () => {
    if (isLoggedIn) {
      navigate("/post");
    } else {
      alert("You need to sign in to create a post.");
      toast.success("You need to sign in to create a post.");
      navigate("/signin");
    }
  };

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const token = localStorage.getItem('CostcoAdmin_TOKEN');
//         if (!token) {
//           // Redirect to login page if token is not found
//           navigate('/');
//           return;
//         }

//         const response = await axios.get('http://localhost:3000/post', {
//           headers: {
//             Authorization: token,
//           }
//         });

//         const response2 = await axios.get('http://localhost:3000/users', {
//           headers: {
//             Authorization: token,
//           }
//         });

//         const response3 = await axios.get('http://localhost:3000/tag', {
//           headers: {
//             Authorization: token,
//           }
//         });

//         const response4 = await axios.get('http://localhost:3000/CreatePost', {
//           headers: {
//             Authorization: token,
//           }
//         });

//         const response5 = await axios.get('http://localhost:3000/CreateUsers', {
//           headers: {
//             Authorization: token,
//           }
//         });

//         // If the response is successful, the user is authorized
//         console.log('User is authorized:', response.data);
//         console.log('User is authorized:', response2.data);
//         console.log('User is authorized:', response3.data);
//         console.log('User is authorized:', response4.data);
//         console.log('User is authorized:', response5.data);
//       } catch (error) {
//         // Handle unauthorized access
//         console.error(error);
//         navigate('/dashboard'); // Redirect to an unauthorized page
//       }
//     };

//     verifyToken();
//   }, [userID, navigate]);


    useEffect(() => {
        fetch("http://localhost:3008/products")
        .then((resp) => resp.json())
        .then((data) => {
            // const filterCategory = data.filter ((prod) => {
            //     return prod.category === "Toys"
            // } )
            const sortedData = data.sort((a, b) => new Date (b.date) - new Date(a.date));
            setProducts(sortedData);
            setLoading(false);
        });

        
    },[]);

    const onDelete = async (_id) => {
        try {
          await axios.delete("http://localhost:3008/product/" + _id);
          setProducts(prevUsers => prevUsers.filter(product => product._id !== _id));
          toast.success("post deleted successfully");

        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("An error occurred while deleting the product");
        }
        console.log(_id)
      };

    
    const setData = (data) => {
        console.log(data)
      
    }

    return(
        <div>
            <AsideBar/>
            <div className="admin-users">Product</div>
            <div className="adm-products">
                {loading === true ? (
                    <div>Data Loading, please wait....</div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="adm-product-card" >
                            <div className="shopComputer-product">
                               <img src={product.image} alt="image" className="product-img" />
                               <h2>{product.name ?? ''}</h2>
                               <p>{product.category?.title ?? ''}</p>
                               <p>{product.description}</p>
                               <p>{product.price}</p>
                               <p>{product.quantity}</p>
                               <div key={product._id}>
                                     {/* <Link to={`/updatePost/${product._id}`}><button onClick={() => setData(product)}>Edit</button></Link> */}
                                    <button onClick={() => onDelete(product._id)}>Delete</button>
                                 
                                </div>
                               
                            </div>
                        </div>
        
                       ))
                )}
                <ToastContainer />
            </div>

        </div>
    )
}

export default Post;