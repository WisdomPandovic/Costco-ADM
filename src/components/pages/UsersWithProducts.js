// import { useEffect, useState } from 'react';
// import AsideBar from "./AsideBar";

// function UsersWithPosts() {
//     const [usersWithPosts, setUsersWithPosts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch("http://localhost:3008/users-with-products")
//             .then((resp) => resp.json())
//             .then((data) => {
//                 console.log(data); 
//                 setUsersWithPosts(data);
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <div>
//             <AsideBar/>
//             {loading ? (
//                 <div className="admin-users">Loading please wait...</div>
//             ) : (
//                 usersWithPosts.map((user) => (
                    
//                     <div key={user._id} className="admin-users user-post-username">
//                          {/* {user.username ? <h2>{user?.username}</h2> : <h2>Unknown User</h2>} */}
//                           <h2>User: {user.name}</h2> <h2>Post: {user.product.length}</h2> 
//                         <ul className='grid'>
//                             {user.product.map((post) => (
//                                 <li key={post._id} >
//                                     <div className='users-post'>
//                                     <img src={post.image} alt="" className="product-img" />
//                                     <h3>{post.title ?? ''}</h3>
//                                     <p>{post.description}</p>
//                                     </div>
                                  
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))
//             )}
//         </div>

//      );
    
// }
// export default UsersWithPosts;


import React, { useEffect, useState } from 'react';
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
                <div className="admin-users "><p className='red'>Loading please wait...</p></div>
            ) : (
                <table className="admin-users">
                    <thead>
                        <tr>
                            <th>Users</th>
                            <th>Total Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersWithPosts.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.product.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {usersWithPosts.map((user) => (
                <div key={user._id} className="admin-users user-post-username">
                    <h2>User: {user.name}</h2>
                    <table className='table-data'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.product.map((post) => (
                                <tr key={post._id}>
                                    <td><img src={post.image} alt="" className="product-img" /></td>
                                    <td>{post.name ?? ''}</td>
                                    <td>{post.description}</td>
                                    {console.log(post)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default UsersWithPosts;
