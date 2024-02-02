import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";




const Cart = () => {

  const { cart } = useSelector((state) => state.cart);
  console.log("Printing Cart");
  console.log(cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0));
  }, [cart])

  return (
    <div className="flex items-center justify-center w-11/12 max-w-[1200] min-h-[80vh] mx-auto py-6">
      {cart.length > 0 ?
        (<div className="flex xl:flex-row flex-col gap-12">
          <div className="xl:w-[60%] flex flex-col">
            {
              cart.map((cartItem, index) => {
                return <CartItem key={cartItem.item.id} post={cartItem.item} itemIndex={index} />
              })
            }
          </div>

          <div className="xl:w-[40%] flex flex-col justify-between py-16 pb-14 px-2 gap-5">
            {/* cart summary */}
            <div className="flex flex-col sm:gap-5">
              <div className="flex flex-col ">
                <p className="sm:text-xl text-green-800 font-semibold uppercase ">Your Cart</p>
                <p className="sm:text-[50px] text-green-700 font-semibold uppercase sm:mt-2 text-3xl">Summary</p>
              </div>

              <p className="font-semibold sm:text-xl text-slate-700">
                Total Items: {cart.reduce((total, cartItem) => total + cartItem.quantity, 0)}
              </p>
            </div>
            {/* checkout */}
            <div className="flex flex-col gap-5">
              <p className="font-semibold sm:text-xl text-slate-700">Total Amount: ${totalAmount}</p>
              <button className="w-full sm:py-3 bg-green-700 text-white uppercase font-bold rounded-md 
                                text-[17px] border-green-700 border-2 hover:bg-white hover:text-green-700 py-1" >
                Checkout Now
              </button>
            </div>

          </div>

        </div>) :

        (<div className="flex flex-col items-center justify-center gap-y-7">
          <p className="font-semibold text-xl">cart is empty!</p>
          <Link to={"/"}>
            <button className="px-10 py-3 bg-green-600 text-white uppercase font-semibold rounded-md text-[17px] border-green-600 
                    hover:bg-white hover:text-green-600">
              Shop Now
            </button>
          </Link>
        </div>)
      }
    </div>
  );
};

export default Cart;
