import React from "react";
import BasicTableBuilding from "./BasicTableBuilding";
import BasicTableLand from "./BasicTableLand";
const width = 'w-[180px]'
const fontSize = 'text-[11px]'

const RealEstateSmallCard = ( props ) =>{
    const {realEstate} = props;
    const {briefDescription, images, basicInfoBuilding, basicInfoLand, label} = realEstate;
    const imageUrlBody = images[0];
    const imageUrl = imageUrlBody.replace('../../../Back-end/uploads/', '');
    return(
        <div className="relative w-[240px] bg-white border pb-3 shadow-lg ">
            {/* <div className="absolute top-[2px] right-1"><FavouriteStar/></div> */}
            <div className="px-4 pt-3 text-center text-xs font-medium line-clamp-3" >
                <p>{briefDescription}</p>
            </div>
            <div className="flex justify-center mt-2 mb-3 w-[165px] h-[100px] mx-auto">
                <img src= {process.env.REACT_APP_API_BASE_URL + '/downloads/?filename='+imageUrl} alt="photo" className=" w-60"/>
            </div>
            <div className="flex justify-center ">
                {
                label === 'building' ? <BasicTableBuilding tableData = {basicInfoBuilding} width= {width} fontSize = {fontSize} /> : <BasicTableLand tableData = {basicInfoLand} width= {width} fontSize = {fontSize} />
                }
            </div>
        </div>
    )
}

export default RealEstateSmallCard;

