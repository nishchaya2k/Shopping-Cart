import { Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import SortPage from "./pages/SortPage";

const App = () => {
  
  const API_URL = "https://fakestoreapi.com/products";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  
  async function fetchProductData() {
    setLoading(true);

    try{
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    }
    catch(error) {
      console.log("Error aagya ji");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchProductData();
  },[])





  return (
  <div>
        <div className="bg-slate-900">
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home loading = {loading} posts = {posts} setPosts = {setPosts}/>} />
          {/* <Route path="/sort-page" element = {<SortPage loading = {loading} posts = {posts}/>}/> */}
          <Route path="/cart" element={<Cart/>} />
        </Routes>
  </div>)
};

export default App;
