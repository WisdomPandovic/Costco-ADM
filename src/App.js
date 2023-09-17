// import './App.css';
// import {Routes, Route, BrowserRouter} from 'react-router-dom';
// import Dashboard from './components/pages/Dashboard'
// import Users from './components/pages/Users'
// import CreateUsers from './components/pages/CreateUsers'
// import UpdateUsers from './components/pages/UpdateUsers';
// import UpdateTag from './components/pages/UpdateTag';
// import CreateProduct from './components/pages/CreateProduct';
// import Product from './components/pages/Product';
// import UpdatePost from './components/pages/UpdatePost';
// import Category from './components/pages/Category';
// import Signin from './components/pages/Signin';
// import Signup from './components/pages/Signup';
// import UsersWithProducts from './components/pages/UsersWithProducts';
// import CostcoProvider from "./components/Context/CostcoContext";

// function App() {

//   return (
//     <div className="App">
//       <CostcoProvider>
//          <BrowserRouter>
//           <Routes>
//                <Route path='/dashboard' element={<Dashboard/>}/>
//                <Route path='/product' element={<Product/>}/>
//                <Route path='/category' element={<Category/>}/>
//                <Route path='/users' element={<Users/>}/>
//                <Route path='/createUsers' element={<CreateUsers/>}/>
//                <Route path='/createProduct' element={<CreateProduct/>}/>
//                <Route path='/updateUsers/:_id' element={<UpdateUsers/>}/>
//                <Route path='/updatePost/:_id' element={<UpdatePost/>}/>
//                <Route path='/updateTag/:_id' element={<UpdateTag/>}/>
//                <Route path='/' element={<Signin/>}/>
//                <Route path='/signup' element={<Signup/>}/>
//                <Route path='/usersWithProducts' element={<UsersWithProducts/>}/>
//           </Routes>
//       </BrowserRouter>
//       </CostcoProvider>
         
//     </div>
//   );
// }

// export default App;

import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Users from './components/pages/Users';
import CreateUsers from './components/pages/CreateUsers';
import UpdateUsers from './components/pages/UpdateUsers';
import UpdateTag from './components/pages/UpdateTag';
import CreateProduct from './components/pages/CreateProduct';
import Product from './components/pages/Product';
import UpdatePost from './components/pages/UpdatePost';
import Category from './components/pages/Category';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import UsersWithProducts from './components/pages/UsersWithProducts';
import CostcoProvider from "./components/Context/CostcoContext";
import { CostcoContext } from './components/Context/CostcoContext';

function App() {
  // const {isLoggedIn} = useContext(CostcoContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if(localStorage){
      let rawData = localStorage.getItem("CostcoAdmin_USER")
      let localData = JSON.parse(rawData)
      setIsLoggedIn(true)
    }
  
  },[]);

  return (
    <div className="App">
      <CostcoProvider>
        <BrowserRouter>
          <Routes>
            {isLoggedIn ? (
              <Route path='/dashboard' element={<Dashboard />} />
            ) : (
              <Route path='/' element={<Signin />} />
            )}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/product' element={<Product />} />
            <Route path='/category' element={<Category />} />
            <Route path='/users' element={<Users />} />
            <Route path='/createUsers' element={<CreateUsers />} />
            <Route path='/createProduct' element={<CreateProduct />} />
            <Route path='/updateUsers/:_id' element={<UpdateUsers />} />
            <Route path='/updatePost/:_id' element={<UpdatePost />} />
            <Route path='/updateTag/:_id' element={<UpdateTag />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/usersWithProducts' element={<UsersWithProducts />} />
            <Route path='/' element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </CostcoProvider>
    </div>
  );
}

export default App;

