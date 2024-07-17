import { FaShoppingCart } from "react-icons/fa"
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  //fetching the current state of cart
  const { cart } = useSelector((state) => state.cart);

  return (
    <div >
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto relative">

        <NavLink to="/">
          <div className="ml-5">
            <img src="../shopping-cart.png" className="h-8 hidden sm:block " />
            <img src="../shopping-cart2.png" className="h-16 sm:hidden" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>

          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {
                cart?.length > 0 &&
                <span
                  className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white"
                >{cart.reduce((total, cartItem) => total + cartItem.quantity, 0)}
                </span>
              }

            </div>
          </NavLink>

        </div>
      </nav>
    </div>
  )
};

export default Navbar;


/*
Reduce Function JS:

1. The reduce() method in JavaScript is a higher-order function that reduces an array to a
   single value. It takes two parameters: an accumulator and the current element of an array.
   The accumulator is initialized to the first element of an array. The reduce() method then
   iterates over the rest of the array, calling the callback function on each element.
   The callback function takes two parameters: the accumulator and the current element.
   The callback function must return a value that will be used as the accumulator for the next
   iteration. The reduce() method returns the final value of the accumulator.

 eg. const numbers = [1, 2, 3, 4, 5];

      const sum = numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      console.log(sum); // 15

      In this example, the callback function adds the current element to the accumulator.
      The accumulator is initialized to 0, so the sum of all the elements in the array is 15.

      The reduce() method can be used to perform many other operations on arrays,
      such as finding the maximum or minimum value, flattening an array, and more.
*/