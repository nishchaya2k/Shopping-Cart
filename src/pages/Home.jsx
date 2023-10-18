import Spinner from "../components/Spinner";
import Product from "../components/Product";
import SortPage from "./SortPage";


const Home = (props) => {
  let loading = props.loading
  let posts = props.posts;
  let setPosts = props.setPosts;

  return (
    <div className="flex items-center justify-center relative">
      {
        loading ? <Spinner />  :
        posts.length > 0 ? 
        (
        <div className=" border-black">
          <div className="w-11.5/12  grid xl:grid-cols-4 xl:max-w-[1111px] gap-x-8 gap-y-20 my-12 border
                            xs: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[800px] sm:max-w-[600px] max-w-[300px] ">
            {
              posts.map( (post) => (
              <Product key = {post.id} post={post}/>
            ) )
            }
          </div>
        </div>
        
        
        ) :
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div> 
      }

      {/* filter button */}
      <SortPage posts = {posts} setPosts = {setPosts}/>
    </div>
  );
};

export default Home;
