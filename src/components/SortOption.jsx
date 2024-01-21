import React from 'react'
import Select from "react-select";
const customStyles = {
    // Example of custom CSS properties
    control: (provided, state) => ({
        ...provided,
        outline: `0px`,
        border: '2px solid-black',
        borderRadius: '8px',
        boxShadow: null,
    }),
};

const SortOption = ({ sortby, sortbyData, onChange }) => {
    return (
        <div className=" border w-52 outline-none border-none m-0.5">

            <Select
                name="sortby"
                value={sortby}
                options={sortbyData}
                onChange={onChange}
                isClearable={true}
                placeholder="Sort by"
                // className="react-select-container sortbyDD"
                classNamePrefix="react-select"
                styles={customStyles} // Apply custom styles
            />
        </div>
    )
}

export default SortOption;
