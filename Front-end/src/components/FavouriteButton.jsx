import { useState } from "react";

const addFavourite = "お気に入りに追加";
const removeFavourite = "お気に入りを削除";

const FavouriteButton = ({ isFavourite }) => {
  return (
    <div className="flex justify-center gap-[20px] items-center text-[#2A6484] bg-white rounded-xl border-[#2A6484] border-2 font-normal cursor-pointer w-[280px] h-[60px] lg:w-[380px] lg:h-[80px]">
      <div className="text-center cursor-pointer text-[30px]">
        <div
          className={`fa fa-star transition-all text-duration-200 ease-in ${
            isFavourite ? "starred text-[#f52755]" : "unstarred text-slate-200"
          }`}
        ></div>
      </div>
      <span className="font-medium text-center cursor-pointer text-[24px]">
        {isFavourite ? removeFavourite : addFavourite}
      </span>
    </div>
  );
};

export default FavouriteButton;
