import React from "react";

const FlagTextContainer = ({text}) =>{

    return(
        <div className="mt-2 mx-auto relative">
            <span className="bg-[#0D4868] inline-block w-[130px] sm:w-[240px] md:w-[300px] h-[60px] text-[11px] sm:text-[20px] leading-[55px] font-normal text-white text-center" >{text}</span>
        </div>
    )

}

export default FlagTextContainer;