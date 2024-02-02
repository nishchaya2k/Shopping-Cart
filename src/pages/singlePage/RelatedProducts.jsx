import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Product from '../../components/Product';


const RelatedProducts = ({ category, selectedPost }) => {

    const { data, loading } = useFetch("products/category/" + category);
    console.log("products/category/" + category);

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    const filteredData = data?.filter((post) => post.id !== selectedPost.id)

    return (
        <div className='overflow-hidden'>
            <div className='mt-14'>
                <div className='mb-12'>
                    <div className='text-[25px]'>Related Items</div>
                    <div className="w-16 h-[2px] bg-black"></div>
                </div>
                <div className='w-full flex gap-12 p-6 overflow-x-auto scrollbar-hide'>
                    {
                        filteredData?.map((post) =>
                            <Product key={post.id} id={post.id} post={post} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts


/*
1. Props Received as Objects:

    In React, when you pass a prop like category={post.category} to a component, it is indeed
    passed as an object with a property named category containing the value of post.category

    For example, if post.category is a string like "Electronics," then the prop category in
    the RelatedProducts component will be an object like { category: "Electronics" }.

    In the RelatedProducts component, you can access the value of category using destructuring 
    or directly from the props object:

    eg. Using Destructuring:

    function RelatedProducts({ category }) {
    console.log(category); // "Electronics"
    }
  

    eg. Without Destructuring:

    function RelatedProducts(props) {
    console.log(props.category); 
    }
    
    Either way, you can work with the value of category in your RelatedProducts component.
    If you prefer, you can also destructure it directly in the function parameters, as shown
    in the first example.
 
*/