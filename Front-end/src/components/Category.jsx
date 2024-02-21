import React from 'react';

const Category = ({ text, img, onClick }) => {
  
    return (
        <div className=" flex items-center bg-cover bg-center hover:opacity-70 h-[80px] px-auto mx-auto w-[90px] sm:h-[120px] sm:w-[150px] lg:h-[150px] lg:w-[180px]" onClick={onClick} style={{ backgroundImage:`url(${img})`}}>
            <div className='bg-[#2A6484]/90 w-full text-center py-[5px]'>
                <p className='text-white text-[10px] sm:text-[14px] text-center font-medium'>{text}</p>
            </div>
        </div>
    )
};

export default Category;