import { Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Header/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from "./redux/Slices/DataSlice";
import SinglePage from "./pages/singlePage/SinglePage";



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());   //with this action will be performed defined in DataSlice file and if no error found data is stored in posts variable declared in DataSlice
  }, [])

  useEffect(() => {
    dispatch(getAllData("/1"));   //with this action will be performed defined in DataSlice file and if no error found data is stored in posts variable declared in DataSlice

  }, [])

  return (
    <div>
      <div className="bg-slate-900">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Home loading={loading} posts={posts} setPosts={setPosts} />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<SinglePage />} />
      </Routes>
    </div>)
};

export default App;



