import { IoIosStarOutline } from "react-icons/io";

const ShimmerCard = () => {
    return (
        <div className=" m-auto  md:w-9/12 max-sm:w-8/12 flex flex-wrap gap-8 md:ml-20 overflow-x-scroll">
            {Array.from({ length: 10 }, (_, i) => {
                return (
                    <div
                        key={i}
                        className="max-md:m-auto w-full md:w-[240px] h-[410px] rounded-3xl flex flex-col gap-2 flex-shrink-0 shadow-md  hover:scale-[0.99] transition-all duration-500 ease-in-out bg-[#d8e3e9] animate-pulse"
                    >
                        <div className="w-full h-[40%] flex flex-col gap-3 p-2 pt-4">
                            <div className="w-full h-8 bg-[#fbfbfb] rounded-2xl"></div>
                            <div className="w-5/6 h-8 bg-[#fbfbfb] rounded-2xl"></div>

                            <div className="w-full h-10 flex justify-start items-center gap-4 pl-2 text-xl">
                                <IoIosStarOutline className="text-[#ffffff]" />
                                <IoIosStarOutline className="text-[#ffffff]" />
                                <IoIosStarOutline className="text-[#ffffff]" />
                                <IoIosStarOutline className="text-[#ffffff]" />
                                <IoIosStarOutline className="text-[#ffffff]" />

                            </div>
                        </div>
                        <div className="w-11/12 m-auto h-2/3 overflow-hidden bg-[#fbfbfb] rounded-2xl"></div>
                        <div className="w-full h-10 rounded-2xl pb-10 p-2 flex justify-end">

                            <div className="w-[50%] h-8 bg-[#fbfbfb] rounded-2xl"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ShimmerCard;