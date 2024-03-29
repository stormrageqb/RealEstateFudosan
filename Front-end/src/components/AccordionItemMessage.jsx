import { React, useState } from "react";
import { useCookies } from "react-cookie";
import moment from "moment-timezone";

const AccordionItemMessage = (props) => {
  const [cookies, setCookie] = useCookies();
  const myId = cookies.user._id;
  const { message } = props;
  const { senderId, receiverId, content, createdAt } = message;

  const japanTime = moment.utc(createdAt).tz("Asia/Tokyo");
  const year = japanTime.year();
  const month = japanTime.month();
  const day = japanTime.date();
  const time = japanTime.format("HH:mm:ss");
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive((prevState) => !prevState);
  };

  return (
    <>
      <div
        className={`hidden sm:flex flex-col items-center border-[1px] w-full border-[#2A6484] ${
          senderId === myId ? "" : "bg-[#F2ECCD]/70"
        }`}
        onClick={() => {
          handleToggle();
        }}
      >
        <div className=" flex flex-row w-full justify-between items-center p-3 font-normal cursor-pointer">
          <div className=" text-[20px] ml-2">AAA</div>
          {!active && (
            <div className=" overflow-hidden p-3 whitespace-nowrap w-[85%] max-h-full text-lg text-ellipsis">
              {content}
            </div>
          )}
          <div className=" text-[16px] mr-2">
            {year}年{month}月{day}日{time}
          </div>
        </div>
        {active && (
          <span className="p-3 w-[85%] font-normal whitespace-pre-wrap break-words mx-auto">
            {content}
          </span>
        )}
      </div>
      <div
        className={`flex sm:hidden flex-col items-center border-[1px] w-full border-[#2A6484] ${
          senderId === myId ? "" : "bg-[#F2ECCD]/70"
        }`}
        onClick={() => {
          handleToggle();
        }}
      >
        <div className=" flex flex-col w-full items-center p-3 font-normal cursor-pointer">
          <div className="flex flex-row items-center justify-between w-[90%]">
            <div className=" text-[16px]">BBB</div>
            <div className=" text-[12px]">
              {year}年{month}月{day}日{time}
            </div>
          </div>
          {!active && (
            <div className=" overflow-hidden p-3 whitespace-nowrap w-[90%] max-h-full text-lg text-ellipsis">
              <p>{content}</p>
            </div>
          )}
        </div>
        {active && (
          <span className="p-3 w-[85%] font-normal whitespace-pre-wrap break-words mx-auto">
            {content}
          </span>
        )}
      </div>
    </>
  );
};

export default AccordionItemMessage;
