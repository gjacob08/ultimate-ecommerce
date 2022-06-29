import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoppingCart from './components/ShoppingCart';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

import ProductInfo from './pages/ProductInfo';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Logistics from './pages/Logistics';
import Products from './pages/Products';
import Services from './pages/Services';
import Support from './pages/Support';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';
import Axios from 'axios';
import './App.css';

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
        <Sidebar user={user} />
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
          {/* <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements> */}
        {/* <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={ user ? <Navigate to="/" /> : <Signup />} /> */}
      </Routes> 
      
    </div>
  );
}

export default App;
