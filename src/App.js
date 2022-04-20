import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from "./pages/Products"
import Addproducts from "./pages/Addproducts"
import Message from "./pages/Message"
import Support from "./pages/Support"
import Edit from "./pages/Edit"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import { ToastContainer } from 'react-toastify';
import Getdetails from './pages/getDetails';
// import Profile from './components/profile';


function App() {
  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />


      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path="/profile" element={<Profile/>} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/support" element={<Support />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/getdetails/:id" element={<Getdetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
