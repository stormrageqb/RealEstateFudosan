import React, { useState } from "react";
import { useCookies } from "react-cookie";
import moment from "moment-timezone";

const AccordionContactMessage = (props) => {
  const [cookies, setCookie] = useCookies();
  const myId = cookies.user._id;
  const { message } = props;
  const { clientId, content, createdAt, category } = message;

  const japanTime = moment.utc(createdAt).tz("Asia/Tokyo");
  const year = japanTime.year();
  const month = japanTime.month();
  const day = japanTime.date();
  const time = japanTime.format("HH:mm:ss");

  return (
    <div
      className={`flex flex-col items-center border-[1px] w-full border-[#2A6484] ${
        category === "query" ? "" : "bg-[#F2ECCD]/70"
      }`}
    >
      <div className=" flex flex-row w-full justify-between items-center p-3 font-normal cursor-pointer">
        <div className=" text-base ml-2">{clientId.name.lastNameGanji}さん</div>
        <div className="hidden lg:block overflow-hidden p-3 whitespace-nowrap w-[70%] max-h-full text-lg text-ellipsis">
          {content}
        </div>
        <div className=" text-[16px] mr-2">
          {year}年{month}月{day}日{time}
        </div>
      </div>
      <div className="block lg:hidden overflow-hidden p-3 whitespace-nowrap w-[90%] max-h-full text-base text-ellipsis">
        {content}
      </div>
    </div>
  );
};

export default AccordionContactMessage;
