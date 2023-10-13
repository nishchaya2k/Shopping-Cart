import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
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
  },[])

  return (
    <div className="flex items-center justify-center">
      {
        loading ? <Spinner />  :
        posts.length > 0 ? 
        (<div className="w-11/12  grid xl:grid-cols-4 xl:max-w-[1111px] gap-x-4 gap-y-14 my-12
                            xs: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[800px] sm:max-w-[600px] max-w-[300px] ">
          {
            posts.map( (post) => (
            <Product key = {post.id} post={post}/>
          ) )
          }
        </div>) :
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div> 
      }
    </div>
  );
};

export default Home;
