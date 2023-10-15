import AsideBar from "../pages/AsideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

function Users(){

    const [AdminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3007/users")
        .then((resp) => resp.json())
        .then((data) => {
            setAdminUsers(data);
            setLoading(false)
        });

        
    },[]);

    const onDelete = (_id) => {
        axios.delete("http://localhost:300/users/" + _id)
    }////

    const setData = (data) => {
        console.log(data)
      
    }
    return(

        <div>
            <AsideBar/>

            <div className="admin-users">Users</div>
            <div className="users-list">
                <table>
                    <th>Username</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Options</th>
                </table>
                {loading === true ? (
                    <div>Loading please wait...</div>
                ) : (

                    AdminUsers.map((user) => (
                <table >
                    <tr key={user._id}>
                        

                        <td>{user.username}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td key={user._id}>
                            <Link to={`/updateUsers/${user._id}`}><button onClick={() => setData()}>Edit</button></Link>
                            <button onClick={() => onDelete(user._id)}>Delete</button>
                        </td>
                    </tr>
                </table>
                    ))

                )}

            </div>

        </div>
    )
}

export default Users;