import AsideBar from "../pages/AsideBar";
import { useEffect, useState, useContext } from "react";
import {ImHome3} from 'react-icons/im';
import {FaUsers} from "react-icons/fa";
import {SiProducthunt} from "react-icons/si";
import {FaShoppingCart} from 'react-icons/fa';
import Map from '../Map';
import {Link} from 'react-router-dom';
import {RxDashboard} from "react-icons/rx";
import {DiPhonegap} from "react-icons/di";
import {RiUserStarFill} from "react-icons/ri";
import {SiPostman} from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { CostcoContext } from '../Context/CostcoContext';

function Dashboard (){
    const navigate = useNavigate()
    const [AdminUsers, setAdminUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [CartItems, setCartItem] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const { isLoggedIn, setIsLoggedIn, userName, setUserName, AdminUserID, setAdminUserID, } = useContext(CostcoContext)

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

    useEffect(() => {
        fetch("http://localhost:3008/get-cart-items")
        .then((resp) => resp.json())
        .then((data) => {
            setCartItem(data);
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

useEffect(() => {
    // Make a GET request to fetch cart items from the backend
    fetch('http://localhost:3008/get-cart-items')
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
        console.log(data); // Add this line to log the data
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);
  console.log(cartItems)

  const handleNewPostClick = (route) => {
   
    if (isLoggedIn) {
      navigate(route);
    } else {
      alert("You need to sign in to create a post.");
 
      navigate("/");
    }
  };
    return(
        <div className="mile ">
            <AsideBar/>
            <div class="hamburger_container">
                <label for="menu_check">&#9776;</label>
                <input type="checkbox" id="menu_check"/>
                <div class="hide_nav_container">
                   
             

              
            <div className="dashboard">
                    <div className="aside-links">
                        <div onClick={() => handleNewPostClick("/dashboard")}>
                            <Link to="/dashboard" className="aside-bar-link nav-flex" >
                                <ImHome3/>
                                <p>Dashboard</p> 
                            </Link>
                        </div>
                    </div><hr/>
                    <div className="aside-links">
                        <div onClick={() => handleNewPostClick("/product")}>
                            <Link to="/product" className="aside-bar-link nav-flex" >
                                <DiPhonegap/>
                                <p>View Product</p>
                            </Link>  
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={() => handleNewPostClick("/users")}>
                            <Link to="/users" className="aside-bar-link nav-flex">
                                <FaUsers/> 
                                <p>Users</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/createProduct" className="aside-bar-link nav-flex">
                                <SiProducthunt/> 
                                <p>Create Product</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}> 
                            <Link to="/createUsers" className="aside-bar-link nav-flex">
                                <RiUserStarFill/> 
                                <p>Create Users</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/category" className="aside-bar-link nav-flex">
                                <RxDashboard/> 
                                <p>Create Category</p>
                            </Link>
                        </div>
                    </div><hr/>
                    <div >
                        <div onClick={handleNewPostClick}>
                            <Link to="/usersWithProducts" className="aside-bar-link nav-flex">
                                <SiPostman/> 
                                <p>Admin Products</p>
                            </Link>
                        </div>
                    </div><hr/>
                </div>
                   


           
                </div>
            </div>

            <div className="team-member"><ImHome3/>   Team Member Dashboard</div>
            <div className="products">
                <div className="product-card bevol flexxy">
                   <SiProducthunt className='dash-icon'/> 
                   <p>Total Product ({products.length})</p>
                </div>

                <div className="product-card bevol flexxy">
                    <FaUsers className='dash-icon'/> 
                    <p>Total Users ({AdminUsers.length})</p>
                </div>

                {/* <div className="product-card bevol flexxy">
                    <FaShoppingCart className='dash-icon'/> 
                    <p>Total Product in Cart ({cart.length})</p>
                </div> */}

                <div className="product-card bevol flexxy">
                    <FaShoppingCart className='dash-icon'/> 
                    <p>New Orders ({CartItems.length})</p>
                </div>
            </div>
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

                    postsData.slice(0,3).map((post) => (
                        // postsData.map((post) =>(
                <table >
                    <tr key={post._id}>
                        

                        <td><img src={post.image} alt="" /></td>
                        <td>{post.name  ?? ''}</td>
                        <td>{post.category?.title ?? ''}</td>
                        <td>{post.description}</td>
                        
                    </tr>
                </table>
                    ))

                )}

                </div>
            </div>

            <div>
               <div className="checkout">Orders List</div>
               <div className="product-list">
           <table className="team-member">
                <thead>
                    <tr>
        <th>PRODUCT ID</th>
        <th>USER NAME</th>
        <th>PRODUCT NAME</th>
        {/* <th>QUANTITY</th> */}
        <th>QTY</th>
        <th>PRICE</th>
        <th>TOTAL PRICE</th>
        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                   {cartItems.map((item )=> (
                       <tr key={item._id}>
          <td>{item.productId}</td>
          <td>{item.userName}</td>
          <td>{item.productName }</td>
          {/* <td>{item.quantity}</td> */}
          <td>{item.qty}</td>
          <td>${item.Price}</td>
          <td>${item.totalPrice}</td>
          <td className="table"><p>Pending</p></td>
                       </tr>
                    ))}
                </tbody>
           </table>
               </div>
           </div>

       

            
        </div>
    )
}

export default Dashboard;