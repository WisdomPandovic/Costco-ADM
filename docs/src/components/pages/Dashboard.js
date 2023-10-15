import AsideBar from "../pages/AsideBar";
import { useEffect, useState } from "react";

function Dashboard (){

    const [AdminUsers, setAdminUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3007/users")
        .then((resp) => resp.json())
        .then((data) => {
            setAdminUsers(data);
        });

        
    },[]);

    useEffect(() => {
        fetch("http://localhost:3007/post")
        .then((resp) => resp.json())
        .then((data) => {
            setProducts(data);
        });

        
    },[]);

    

    const [productsData, setProductsData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://159.65.21.42:9000/products")
        .then((resp) => resp.json())
        .then((data) => {
            const filterCategory = data.filter ((prod) => {
                return prod.category === "M&S"
            } )
            setProductsData(filterCategory);
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
            <div className="team-member">Team Member Dashboard</div>
            <div className="products">
                <div className="product-card green">
                   <p>Total Post ({products.length})</p>
                </div>

                <div className="product-card purple">
                    <p>Total Users ({AdminUsers.length})</p>
                </div>

                <div className="product-card blue">
                    <p>Total Comments ({cart.length})</p>
                </div>
            </div>

            <div className="product-list">
                <table>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                </table>
                {loading === true ? (
                    <div>Loading please wait...</div>
                ) : (

                    productsData.slice(0,10).map((product) => (
                <table >
                    <tr key={product._id}>
                        

                        <td><img src={"http://159.65.21.42:9000" + product.image} alt="product" /></td>
                        <td>{product.name}</td>
                        <td>$ {product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        
                    </tr>
                </table>
                    ))

                )}

            </div>
            
        </div>
    )
}

export default Dashboard;