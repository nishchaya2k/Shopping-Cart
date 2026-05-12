import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import SinglePage from "./pages/singlePage/SinglePage";
import { getAllData } from "./redux/Slices/DataSlice";

/**
 * Root layout. Each route owns its own Navbar so the navbar can wire
 * page-specific state (e.g. the Home page passes the search value into it).
 */
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/products/:id" element={<SinglePage />} />
    </Routes>
  );
};

export default App;
