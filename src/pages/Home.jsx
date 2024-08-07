import Spinner from "../components/Spinner/Spinner";
import Product from "../components/Body/Product";
import SortOption from "../components/Filter/SortOption";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sortData } from "../functions/sort";
import SliderButton from "../components/Filter/SliderOption";
import FilterCategory from "../components/Filter/FilterCategory";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import "./Home.css"
import useFetch from "../hooks/useFetch";
import ShimmerCard from "../components/ShimmerCard/ShimmerCard";



const sortbyData = [
  { value: "asc", label: "Price(lowest)" },
  { value: "desc", label: "Price(highest)" },
];

const categories = [
  { category: "Female Clothing", value: "women's clothing" },
  { category: "Male Clothing", value: "men's clothing" },
  { category: "Jewelery", value: "jewelery" },
  { category: "Electronics", value: "electronics" }
];


const Home = () => {

  //useFetch is a custom hook
  const { data, loading } = useFetch('products');
  console.log(data);
  console.log(loading);




  //use to check weather Particular Filter is active or not
  const [active, setActive] = useState(false)

  //in useEffect we have used active, becoz we dont want useEffect to update states unnecessarily becoz,
  //whenever dependency of each useEffect get updated, states also get updated inside it, but we only want 
  //states to get updated when that filter is active, not when we are reseting the states of other filters
  //so at that time dependency value get change but we are not using that filter, so we need to take care,
  //that we update states only when we using filter by making it active & deactivate it when u have used it.



  //Sort
  const [sortby, setSortby] = useState(null);
  const [sortedData, setSortedData] = useState(null);

  useEffect(() => {
    if (data && sortby && active) {
      const sorted = sortData(data, sortby.value);
      setSortedData(sorted)
      setActive(false);
      setSelectedCategory(null);
      setPriceRange(initialSliderState);
      setCategoryData(null);
      setSliderData(null);
    }
  }, [sortby])   //try to give two dependency dependent, so that we can avoid calling useEffect()

  const defaultSortState = () => {
    setSortedData(null);
    setSortby(null);
    setActive(false);
  }

  const onChange = (selectedItems, action) => {
    if (action.action !== "clear") {
      setSortby(selectedItems);
      setActive(true);
    }
    else
      defaultSortState();
  }
  //............................................................................. 


  //Sider Price Filter
  const initialSliderState = [0, 1000];
  const [priceRange, setPriceRange] = useState(initialSliderState);
  const [sliderData, setSliderData] = useState(null);


  useEffect(() => {
    if (data && priceRange && active) {   //only when slider is active, even if priceRange changed, becoz silder is active when user selects it, not when we reset it for the sake of giving default values
      const filteredData = data?.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
      setSliderData(filteredData);
      setActive(false);
      setSelectedCategory(null);
      setSortby(null);
      setCategoryData(null)
      setSortedData(null);
    }
  }, [priceRange])

  const handleSliderChange = (values) => {
    setPriceRange(values);
    setActive(true)
  };

  const resetSlider = () => {
    setPriceRange(initialSliderState);
    setSliderData(null);
    setActive(false)
  }
  //............................................................................. 


  //Category Wise Data
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [checkCount, setCheckCount] = useState(0)

  useEffect(() => {
    console.log(selectedCategory); // Log updated value, to chech category updated or not
    if (data && selectedCategory && active) {
      const filteredData = data?.filter((post) => post.category === selectedCategory)
      setCategoryData(filteredData)
      defaultSortState();
      setActive(false);
      setSliderData(null);
      setPriceRange(initialSliderState);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (value) => {
    setSelectedCategory((prevValue) => {
      console.log(prevValue); // Log previous value
      return value; // Update state with the new value
    });
    setActive(true);
  };


  const unCheckButton = () => {
    setCheckCount((checkCount) => checkCount + 1);

    if (checkCount % 2 === 0) {
      setSelectedCategory(null);
      setCategoryData(null);
      setCheckCount(0);
    }

  }
  //............................................................................. 

  const [mobileMenu, setMobileMenu] = useState(false);   //for sidebar
  const openMobileMenu = () => {
    setMobileMenu(true)
  }

  useEffect(() => {
    // Disable interactions with the content when the mobile menu is active
    const contentContainer = document.getElementById("content-container");
    if (contentContainer) {
      contentContainer.style.pointerEvents = mobileMenu ? "none" : "auto";
    }
  }, [mobileMenu]);

  return (
    <div className="flex justify-center">
      <div className={`flex flex-col-reverse md:flex-row items-start gap-8 relative my-12`}>
        {
          loading ? <ShimmerCard /> :
            data?.length > 0 ?
              (
                <div id="content-container" className={`w-11.5/12 grid xl:grid-cols-4 xl:max-w-[1111px] gap-x-8 gap-y-20
                            xs: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[800px] sm:max-w-[600px] max-w-[300px] ${mobileMenu ? 'filter blur-sm' : ''}`}>
                  {
                    (sortedData ?? sliderData ?? categoryData) ?
                      (
                        sortedData
                          ? sortedData.map((post) => <Product key={post.id} id={post.id} post={post} />)
                          : sliderData
                            ? sliderData.map((post) => <Product key={post.id} id={post.id} post={post} />)
                            : categoryData.map((post) => <Product key={post.id} id={post.id} post={post} />)
                      )
                      :
                      (data?.map((post) => (
                        <Product key={post.id} id={post.id} post={post} />))
                      )
                  }
                </div>
              ) :
              <div className="flex justify-center items-center">
                <p>No Data Found</p>
              </div>
        }

        {/* Features ->  for large screen */}
        {
          !loading &&

          <div className={`md:flex flex-col items-start gap-[6.5rem] ${mobileMenu ? 'mobileView' : 'hidden'}`}>
            <SortOption sortby={sortby} sortbyData={sortbyData} onChange={onChange} />
            <SliderButton priceRange={priceRange} handleSliderChange={handleSliderChange} resetSlider={resetSlider} heading="Price Range" />
            <FilterCategory selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} unCheckButton={unCheckButton} categories={categories} />
          </div>
        }

        {/* Feature ->  for small screen */}
        {
          !loading &&

          <div className={`md:hidden  ${mobileMenu ? 'w-full flex justify-end' : ''}`}>
            {mobileMenu ?
              (<VscChromeClose onClick={() => setMobileMenu(false)} className="cursor-pointer" />) :
              (<SlMenu onClick={openMobileMenu} className="cursor-pointer" />)}  { /*we have open the sidebar  */}
          </div>
        }

      </div>
    </div>
  );
};

export default Home;
