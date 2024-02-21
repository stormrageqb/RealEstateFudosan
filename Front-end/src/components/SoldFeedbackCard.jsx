import React from "react";
export default function SoldFeedbackCard({ img, text }) {
  return (
    <div className="bg-[#F2ECCD] w-[90%] mx-auto sm:w-[500px] md:w-[635px] h-[200px] py-2 flex items-start rounded-md">
      <img className="hidden sm:block w-[170px] h-[150px] ml-[26px] my-auto" src={img} alt="img" />
      <div className="pl-[35px] pr-[20px] h-full overflow-auto text-[14px] sm:text-[13px] md:text-[15px] py-[24px]">{text}</div>
    </div>
  );
}
