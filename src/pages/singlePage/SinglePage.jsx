import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../redux/Slices/CartSlice";
import RelatedProducts from './RelatedProducts';
import StarReviews from '../../components/StarReviews';

import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
} from "react-icons/fa";

const SinglePage = () => {

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();


    const { id } = useParams();

    /*as for standard naming, data is used for all the posts information, so for 1 post I can't
    use data so I assign it to post, its advisable to use proper naming convention in whole app*/

    //post is a new variable, not a reference to the data property in the obj object
    const { data: post, loading } = useFetch("products/" + id);
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity((prev) => prev + 1);
    }

    const decrement = () => {
        setQuantity((prevState) => {
            if (prevState === 1) return 1;
            return prevState - 1;
        });
    }

    const addToCart = () => {
        if (post) {
            dispatch(add({ post, quantity }));  //sending quantity also so that we can update cart acc. to it
            // toast.success("Item added to Cart");
        }
    }

    !loading && console.log(post);

    return (
        <div>
            {/*to make spinner in center I used flex here */}
            <section className='m-6 sm:m-20 flex justify-center'>
                {

                    loading ? <Spinner /> :
                        <div className='max-w-[calc(100%-20px)] md:max-w-full m-auto '>
                            <div className='flex flex-col md:flex-row gap-10'>
                                {/* left */}

                                <div className='w-[70%] h-[70%] m-auto md:h-[500px] md:w-[50%] lg:w-[40%]'>
                                    <img className='w-full h-full block' src={post.image} />
                                </div>

                                {/* right */}
                                <div className='flex flex-col md:w-[50%] lg:w-[60%]'>
                                    <span className='text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] mb-5'>{post.title}</span>
                                    <div className='mb-4'><StarReviews stars={post.rating.rate} reviews={post.rating.count} /></div>
                                    <span className='text-[24px] leading-[32px] mb-5'>&#8377;{post.price}</span>
                                    <span className='text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] mb-5 text-gray-500'>{post.description}</span>

                                    {/* cart Buttons */}
                                    <div className='flex md:mt-8 '>
                                        <div className="flex w-fit h-12 mr-[10px] border-2 border-slate-300">
                                            <span className='w-[30px] sm:w-[40px] text-[18px] flex justify-center items-center cursor-pointer text-slate-500' onClick={decrement} >-</span>
                                            <span className='w-[45px] sm:w-[60px] text-[18px] flex justify-center items-center border-r-2 border-l-2 border-slate-300 text-slate-600'>{quantity}</span>
                                            <span className='w-[30px] sm:w-[40px] text-[18px] flex justify-center items-center cursor-pointer text-slate-500' onClick={increment}>+</span>
                                        </div>
                                        <button onClick={() => {
                                            addToCart(post, quantity)
                                            setQuantity(1);
                                        }}
                                            className='text-[13px] sm:text-[15px] flex justify-center items-center cursor-pointer gap-1 p-2 h-12 text-white bg-purple-700 outline-none border-0 border-b-4 border-purple-900 w-[200px]'>

                                            <FaCartPlus size={20} />
                                            ADD TO CART
                                        </button>
                                    </div>

                                    {/* divider */}
                                    <div className='m-5 h-[1px] w-full bg-slate-200'></div>

                                    {/*Product-info */}
                                    <div className='flex flex-col items-start gap-2'>

                                        <div className='flex justify-center items-center gap-1'>
                                            <span className='text-[18px] font-medium'>
                                                Category:{'  '}
                                            </span>
                                            <span className='capitalize text-[16px] font-normal cursor-pointer text-gray-500'>{post.category}</span>
                                        </div>

                                        <div className='flex justify-center items-center '>
                                            <span className='text-[18px] font-medium'>
                                                Share:{'  '}
                                            </span>
                                            <span className='flex justify-center items-center gap-2 text-[16px] font-normal cursor-pointer text-gray-500'>
                                                <FaFacebookF size={16} />
                                                <FaTwitter size={16} />
                                                <FaInstagram size={16} />
                                                <FaLinkedinIn size={16} />
                                                <FaPinterest size={16} />
                                            </span>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <RelatedProducts ProductId={post.id} category={post.category} selectedPost={post} />

                        </div>
                }
            </section>
        </div>
    )
}

export default SinglePage


/*

1. flex-shrink: The flex-shrink property specifies how the item will shrink relative to the rest
                of the flexible items inside the same container

               The default value for the flex-shrink property is 1. This means that flex items
                can shrink proportionally if necessary

2. Flex-grow: The flex-grow property is a sub-property of the Flexible Box Layout module.
              It defines the ability for a flex item to grow if necessary.
              It dictates what amount of the available space inside the flex container the item
              should take up. eg. flex-grow: 2;

              For example, if all items have flex-grow set to 1, every child will set to an
              equal size inside the container. If you were to give one of the children a value
              of 2, that child would take up twice as much space as the others.


*/