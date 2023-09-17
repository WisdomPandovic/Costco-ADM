import { useEffect, useState } from 'react';
import AsideBar from "./AsideBar";

function UsersWithPosts() {
    const [usersWithPosts, setUsersWithPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3008/users-with-products")
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data); 
                setUsersWithPosts(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <AsideBar/>
            {loading ? (
                <div className="admin-users">Loading please wait...</div>
            ) : (
                usersWithPosts.map((user) => (
                    
                    <div key={user._id} className="admin-users user-post-username">
                         {/* {user.username ? <h2>{user?.username}</h2> : <h2>Unknown User</h2>} */}
                          <h2>User: {user.name}</h2> <h2>Post: {user.product.length}</h2> 
                        <ul className='grid'>
                            {user.product.map((post) => (
                                <li key={post._id} >
                                    <div className='users-post'>
                                    <img src={post.image} alt="" className="product-img" />
                                    <h3>{post.title ?? ''}</h3>
                                    <p>{post.description}</p>
                                    </div>
                                  
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}
export default UsersWithPosts;
