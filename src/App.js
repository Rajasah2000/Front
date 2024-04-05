import './App.css';
import { useEffect, useLayoutEffect } from 'react';
import axios from "axios"
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'

import { 
  Navbar, 
  Toast,
  Home,
  Shop, 
  ProductPage,
  Login,
  Signup,
  Wishlist,
  Cart,
  Orders,
  useUserLogin,
  useWishlist,
  useCart
} from "./index"
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';

const App = ()=> {

  const { userLoggedIn } = useUserLogin()
  const { dispatchUserWishlist } = useWishlist()
  const { dispatchUserCart } = useCart();
  // const location = useLocation();

//   useEffect(() => {
//     if(location?.pathname === "/login"){
// alert("hii")
//     }
//   },[location])


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          
          <Route element={<PrivateRoute />}>
            <Route path="/shop" exact element={<Shop />} />
            <Route path="/shop/:id" element={<ProductPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
        <Toast position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;