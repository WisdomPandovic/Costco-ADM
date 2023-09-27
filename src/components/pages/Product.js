import AsideBar from "./AsideBar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {CostcoContext } from '../Context/CostcoContext';
import { useNavigate } from 'react-router-dom';
import {MdDelete} from "react-icons/md";
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
            <div className="admin-users">Products</div>
          


            <div className="mile">
                <div className="product-list">
                <table>
                    <th>PRODUCT IMAGE</th>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>DESCRIPTION</th>
                </table>
                {loading === true ? (
                    <div>Loading please wait...</div>
                ) : (

                  products.map((product) => (
                        // postsData.map((post) =>(
                <table >
                    <tr key={product._id}>
                        

                        <td><img src={product.image} alt="" /></td>
                        <td>{product.name  ?? ''}</td>
                        <td>{product.category?.title ?? ''}</td>
                        <td>{product.description}</td>
                        
                    </tr>
                </table>
                    ))

                )}

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Post;