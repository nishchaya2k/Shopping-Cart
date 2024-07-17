import React, { useState } from 'react'
import { IoIosStarOutline, IoIosStar, IoIosStarHalf, IoIosArrowDown } from "react-icons/io";

const StarReviews = ({ stars, reviews }) => {

    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let value = index + 0.5  //starts from, 0+0.5, 0.5+0.5, 1+0.5, ... , used for halfStars
        // debugger;
        return (
            <span key={index}>
                {
                    stars >= index + 1 ? (
                        <IoIosStar className='text-xl text-orange-400' />
                    ) :
                        stars >= value ? (
                            <IoIosStarHalf className='text-xl text-orange-400' />
                        ) :
                            (
                                <IoIosStarOutline className='text-xl text-orange-400' />
                            )
                }
            </span>
        )
    })

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
    }

    return (
        <div>
            <div className='flex items-center w-max'>
                {ratingStar}
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='relative'>
                    {
                        isHovering && (
                            <div className='absolute w-max p-2 border border-gray-300 flex mt-5 rounded-md bg-white z-10'>
                                {ratingStar}
                                <p className='ml-2 text-black text-[15px] font-semibold'>{stars} out of 5</p>
                            </div>
                        )
                    }
                    <IoIosArrowDown className={`ml-1 cursor-pointer text-gray-400 ${isHovering && 'text-gray-950'}`} />
                </div>
                <p className='m-0 ml-3 text-[#007185] text-sm'>{reviews} ratings</p>
            </div>
        </div>
    )
}

export default StarReviews


/*

1. Array.from():

    The Array.from() method in JavaScript creates a new array instance from an iterable object 
    or array-like object. It has the following syntax:

->  Array.from(arrayLike[, mapFn[, thisArg]])  ||   Array.from(arrayLike, [, thisArg]])  || 
    Array.from(arrayLike, mapFn, thisArg)

->  arrayLike: This is the first parameter and represents an array-like or iterable object
    that you want to convert into an array. It can be any object that has a length property 
    or an iterable object (e.g., a string, NodeList, arguments object).

->  mapFn (Optional): This is the second parameter, and it is a function that will be called 
    for each element in the array during the creation process. It is used to map or transform 
    the elements of the array. If you don't need to transform the elements, you can omit this 
    parameter.

->  thisArg (Optional): This is the third parameter, and it represents the value that will be 
    used as this when executing the mapFn function. It is optional, and if not provided, 
    undefined is used as the this value.

->  The square brackets around [, mapFn[, thisArg]] indicate that both mapFn and thisArg are 
    optional and can be omitted when calling the Array.from method.

->  eg. 
    const str = 'hello';
    const str = 'hello';
    console.log(charArrayWithoutMapFn); // Output: ['h', 'e', 'l', 'l', 'o']

    eg. 
    const arrayLike = 'hello';
    const newArray = Array.from(arrayLike, char => char.toUpperCase());
    console.log(newArray); // Output: ['H', 'E', 'L', 'L', 'O']

    eg.

    const numbers = [1, 2, 3, 4];
    const squaredArray = Array.from(numbers, x => x * x);
    console.log(squaredArray); // Output: [1, 4, 9, 16]

    eg. 
    
    const newArray = Array.from({ length: 5 }, (_, index) => index + 1);
    console.log(newArray); // Output: [1, 2, 3, 4, 5]

    * Array.from is creating a new array from an array-like or iterable object. 
      The first argument is an object { length: 5 } that has a length property set to 5. 
      This object is not an array but resembles an array in terms of having a length property

    * The second argument is a mapping function (_, index) => index + 1. The _ is a convention 
      to indicate that the first parameter (which represents each element in the array) is 
      intentionally unused. The index parameter represents the index of the element being 
      processed.

    * The mapping function takes the index and adds 1 to it, creating an array of numbers 
      starting from 1 up to the specified length (5 in this case).


2.  The Array.from() method in JavaScript creates a new array instance explain ?

    In JavaScript, when we say "creates a new array instance," it means that a completely new
    array object is created in memory. This new array is a distinct entity from any other arrays, 
    even if they have similar elements or values.

    Here's a breakdown of what "new array instance" means:

->  New Object in Memory: The Array.from() method returns a new array object. It's not a 
    reference to an existing array; instead, it creates a fresh array in memory.

->  Distinct Identity: The new array has its own identity and doesn't share references or 
    memory with any other arrays. Modifying the new array won't affect other arrays, and vice versa.

->  Independent of Source: The new array's elements may be derived from an iterable source 
    (like another array or a string), but the new array is independent. Changes to the source 
    won't impact the new array after it has been created.

    eg. 

    const originalArray = [1, 2, 3];
    const newArray = Array.from(originalArray);

    console.log(originalArray === newArray); // Output: false (they are different instances)

    originalArray.push(4);
    console.log(newArray); // Output: [1, 2, 3] (unchanged)
*/