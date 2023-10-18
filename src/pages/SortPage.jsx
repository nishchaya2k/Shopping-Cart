import React, { useState } from 'react'

const SortPage = (props) => {

    
  return (
    <div>
        <div className="absolute right-4 top-4 z-100 border-2 rounded-xl px-1 cursor-pointer ">
          <select className="text-[14px] cursor-pointer" default>
              
              <option value="Sort by:  Featured">Sort By: Featured</option>
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>

          </select>
        </div>
        

    </div>
  )
}

export default SortPage;




