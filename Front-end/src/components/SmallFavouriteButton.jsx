import { useState } from "react";

const addFavourite = "お気に入りに追加";
const removeFavourite = "お気に入りを削除";

const SmallFavouriteButton = ({ isFavourite, parentComponent }) => {
  return (
    <div className="flex justify-center gap-[20px] items-center text-[#2A6484] bg-white rounded-xl border-[#2A6484] border-2 font-normal cursor-pointer w-[200px] h-[40px] text-[12px]">
      {parentComponent === "FavouritePage" ? (
        <>
          <div className="text-center cursor-pointer text-[15px]">
            <div
              className={`fa fa-star transition-all text-duration-200 ease-in ${
                isFavourite
                  ? "starred text-[#f52755]"
                  : "unstarred text-slate-200"
              }`}
            ></div>
          </div>
          <span className="font-medium">
            {isFavourite ? removeFavourite : addFavourite}
          </span>
        </>
      ) : null}
      {parentComponent === "ItemMyPage" && (
        <span className="font-medium">ふどさんへの問合せ</span>
      )}
    </div>
  );
};

export default SmallFavouriteButton;
