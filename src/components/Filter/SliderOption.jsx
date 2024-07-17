import React from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderButton = ({ priceRange, handleSliderChange, resetSlider, heading }) => {
    return (
        <div className='w-full flex flex-col items-center gap-4'>
            <div className='w-11/12'>
                <span className="flex flex-col mb-8">
                    <span className="text-md">{heading}</span>
                    <span className="w-14 bg-black h-0.5"></span>
                </span>
                <Slider
                    range
                    min={0}
                    max={1000}
                    value={priceRange}
                    step={50}
                    className='hover:cursor-pointer'
                    onChange={handleSliderChange}
                />
                <span className='flex justify-between'>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </span>
            </div>
            <div className='flex justify-end w-full mt-1'>
                <button onClick={resetSlider} className='shadow-md hover:drop-shadow-xl border-b-2 border-b-slate-500 text-cyan-900 w-16'>Reset</button>
            </div>
        </div>

    )
}

export default SliderButton























// import React from 'react'
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

// const SliderButton = ({ priceRange, handleSliderChange, resetSlider, heading }) => {
//     return (
//         <div className="w-10/12 mt-16 h-full">
//             <div>
//                 <span className="h-10 flex flex-col mb-4">
//                     <span className="text-xl">{heading}</span>
//                     <span className="w-20 bg-black h-0.5"></span>
//                 </span>
//                 <Slider
//                     range
//                     min={0}
//                     max={1000}
//                     value={priceRange}
//                     step={50}
//                     onChange={handleSliderChange}
//                 // tipFormatter={tipFormatter}
//                 // Add any other slider props as needed
//                 />
//                 <span className="flex justify-between">
//                     <span className="text-black">${priceRange[0]}</span>
//                     <span>${priceRange[1]}</span>
//                 </span>
//             </div>
//             <div className='flex justify-end w-full mt-1'>
//                 <button onClick={resetSlider} className='shadow-md hover:drop-shadow-xl border-b-2 border-b-slate-500 text-cyan-900 w-16'>Reset</button>
//             </div>
//         </div>

//     )
// }

// export default SliderButton
