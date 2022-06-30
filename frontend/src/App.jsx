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
import Products from './pages/Products';
import Services from './pages/Services';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';
import StripeCheckout from './pages/StripeCheckout';

console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const AppLayout = () => {
  const [user, setUser] = useState(null);
  // Gets the user information using Session and Cookie.
  useEffect(() => {
    const getUser = () => {
      Axios.get("http://localhost:5000/api/users/login/success", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, withCredentials: true }) 
        .then((resObject) => { setUser(resObject.data) }) 
        .catch((err) => { console.log(err) })}
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
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    Axios.post("http://localhost:5000/create-payment-intent", { headers: { Accept: "application/json", "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, }, body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }), withCredentials: true }) 
      .then((res) => setClientSecret( res.data.clientSecret ))
      .catch((err) => { console.log(err) })
    }
, []);

  return (
    <div className="flex">
       <Routes>
        {/* <Route path="/" element={<Home weatherData={ weatherData } />} /> */}
        <Route element={<AppLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/products" element={<Products />}/>
          <Route path="/products/:productId" element={<ProductInfo />} />
          <Route path="/services" element={<Services />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout-page" element={<StripeCheckout />} />
        {/* <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={ user ? <Navigate to="/" /> : <Signup />} /> */}
      </Routes>
    
    </div>
  );
}
export default App;
