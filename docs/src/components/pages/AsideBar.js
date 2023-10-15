import {Link} from 'react-router-dom';
import {FaUserCheck} from "react-icons/fa";
import {FaUsers} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx";
import {GiTeamUpgrade} from "react-icons/gi";
import {GiOpenedFoodCan} from "react-icons/gi";
import {FcSearch} from "react-icons/fc";
import {DiPhonegap} from "react-icons/di";

function AsideBar(){
    return(
        <div>
            <aside className="aside-bar">
                <div className="dashboard">
                    <div className="aside-links">
                        <Link to="/" class="aside-bar-link"><RxDashboard/> Dashboard</Link>
                    </div>
                    <div >
                        <Link to="/post" class="aside-bar-link"><DiPhonegap/> View Post</Link>  
                    </div>
                    <div >
                        <Link to="/users" class="aside-bar-link"><FaUsers/> Users</Link>
                    </div>
                    <div >
                        <Link to="/createPost" class="aside-bar-link"><GiOpenedFoodCan/> Create Post </Link>
                    </div>
                    <div >
                        <Link to="/createUsers" class="aside-bar-link"><GiTeamUpgrade/> Create Users</Link>
                    </div>
                    <div >
                        <Link to="/tag" class="aside-bar-link"><GiTeamUpgrade/> Create Tag</Link>
                    </div>
                </div>
           </aside>

           <nav>
                <div className='flex'>
                    <div className='flex-btn'>
                        <input type='text' placeholder='search'/>
                        <button><FcSearch/></button>
                    </div>
                    <div><FaUserCheck/></div>
                </div>
           </nav>

        </div>
    )
}

export default AsideBar;