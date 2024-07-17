import React, { useState } from 'react';

const FilterCategory = ({ selectedCategory, handleCategoryChange, unCheckButton, categories }) => {



    return (
        <div className='mx-2'>
            <span className="flex flex-col mb-8">
                <span className="text-md">Categories</span>
                <span className="w-14 bg-black h-0.5"></span>
            </span>
            <div className='flex flex-col gap-2'>
                {categories.map(({ category, value }) => (  //with each category we have lable and radio button associated
                    <label key={value}>
                        <input
                            type="radio"
                            value={value}
                            checked={selectedCategory === value}
                            className='mx-1 hover:cursor-pointer'
                            onChange={() => handleCategoryChange(value)}
                            onClick={unCheckButton}
                        />
                        {category}
                    </label>
                ))}

            </div>
        </div>
    );
};

export default FilterCategory;