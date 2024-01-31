import { Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from "./redux/Slices/DataSlice";

const App = () => {

  /*const API_URL = "https://fakestoreapi.com/products";
  const [posts, setPosts] = useState([]);

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
  },[])*/




  /*getAllData is action in which we are fetching our data from url and after that 
    extraReducer will run by that getAllData funtion (action) and if we dont find any
    errors data will be in the 'posts'*/

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());   //with this action will be performed defined in DataSlice file and if no error found data is stored in posts variable declared in DataSlice
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
        {/* <Route path="/product/:id" element={<SingleProduct />} /> */}
      </Routes>
    </div>)
};

export default App;



