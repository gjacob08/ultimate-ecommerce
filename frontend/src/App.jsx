import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './App.css';

// REACT IMPORTED COMPONENTS
import ShoppingCart from './components/ShoppingCart';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// REACT IMPORTED PAGES
import ProductInfo from './pages/ProductInfo';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory';
import Logistics from './pages/Logistics';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import Services from './pages/Services';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';

console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const AppLayout = () => {
  const [user, setUser] = useState(null);
  // Gets the user information using Session and Cookie.
  useEffect(() => {
    const getUser = () => {
      Axios.get("http://localhost:5000/api/users/login/success", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true })
        .then((resObject) => { setUser(resObject.data) })
        .catch((err) => { console.log(err) })
    }
    getUser()
  }, [])
  return (
    <>
      <nav className="max-h-full flex w-2/12">
        <Sidebar user={ user } />
      </nav>
      <div className="w-10/12">
        <TopBar />
        <Outlet />
        <ShoppingCart />
      </div>
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);

  // Gets the user information using Session and Cookie.
  useEffect(() => {
    const getUser = () => {
      Axios.get("http://localhost:5000/api/users/login/success", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true })
        .then((resObject) => { setUser(resObject.data) })
        .catch((err) => { console.log(err) })
    }
    getUser()
  }, [])

  return (
    <div className="flex">
      <Routes>
        <Route element={<AppLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductInfo />} />
          <Route path="/services" element={<Services />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          {/* Makes Sure that Customer Accounts don't have access to Admin Pages. */}
          <Route path="/dashboard" element={user?.role !== "admin" ? <Navigate to="/" /> : <Dashboard />} />
          <Route path="/inventory" element={user?.role !== "admin" ? <Navigate to="/" /> : <Inventory />} />
          <Route path="/logistics" element={user?.role !== "admin" ? <Navigate to="/" /> : <Logistics />} />
        </Route>
        {/* Makes Sure that Accounts cannot log in or Sign Up while they are Logged In */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        <Route path="/checkout-page" element={<Checkout />} />
      </Routes>
    </div>
  );
}
export default App;
