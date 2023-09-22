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
    // return (
    //     <div>
    //         <AsideBar/>
    //         {loading ? (
    //             <div className="admin-users">Loading please wait...</div>
    //         ) : (
    //             usersWithPosts.map((user) => (
    //                 <div key={user._id} className="admin-users user-post-username">
    //                     <table>
    //                         <thead>
    //                             <tr>
    //                                 <th>User</th>
    //                                 <th>Posts</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             <tr>
    //                                 <td>{user.name}</td>
    //                                 <td>{user.product.length}</td>
    //                             </tr>
    //                         </tbody>
    //                     </table>
    //                     <ul className='grid'>
    //                         {user.product.map((post) => (
    //                             <li >
    //                                 <table>
    //                                     <thead>
    //                                         <tr>
    //                                             <th>Image</th>
    //                                             <th>Title</th>
    //                                             <th>Description</th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody>
    //                                         <tr>
    //                                             <td>
    //                                                 <img src={user.image} alt="" className="product-img" />
    //                                             </td>
    //                                             <td>{post.title ?? ''}</td>
    //                                             <td>{post.description}</td>
    //                                         </tr>
    //                                     </tbody>
    //                                 </table>
    //                             </li>
    //                        ))} 
    //                     </ul>
    //                 </div>
    //             ))
    //         )}
    //     </div>
    // );
    
}
export default UsersWithPosts;
