import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
// import { useNavigate } from "react-router-dom";


const Product = ({ id, post }) => {

  // const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  }

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  }

  return (
    <div className=" bg-zinc-100 flex flex-col items-center justify-center shadow-md  gap-3 p-4 rounded-xl text-slate-700
    hover:shadow-2xl hover:shadow-slate-800 hover:drop-shadow-2xl hover:scale-110 transition-all duration-500">
      {/* onClick={() => navigate("/product/" + id)} */}
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-52 px mt-1 ">{post.title}</p>
      </div>
      <div>
        <p className="w-44 h-16 min-h-fit text-gray-400 font-normal text-[10px] text-left">{post.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
      </div>
      <div className=" h-[180px] w-[160px]  mt-4 bg-zinc-100">
        <img src={post.image} className="h-full w-full mix-blend-multiply" alt="img" />
      </div>

      <div className="flex justify-between gap-3 items-center w-full mt-4">
        <div>
          <p className="text-green-600 font-semibold">${post.price}</p>
        </div>

        {
          cart.some((p) => p.id === post.id) ?   //check if that item
            (<button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
              onClick={removeFromCart}>
              Remove Item
            </button>) :
            (<button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in"
              onClick={addToCart}>
              Add to Cart
            </button>)
        }
      </div>


    </div>
  );
};

export default Product;



/*
mix-blend-mode: multiply; This feature works best when the background color is light 
shade… and fails completely if you go too dark.
And I noticed how the image’s white background doesn’t look too great over the gray 
background.
That's a clever, CSS only trick to remove the background color from your images
*/