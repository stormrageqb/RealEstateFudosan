import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../components/Loading";
import AccordionPostContactMessage from "../components/AccordionPostContactMessage";
import Pagination from "../components/Pagination";

const AdminPostContactBoardPage = () => {
  const history = useHistory();
  const [messages, setMessages] = useState(null);
  const [totalNumber, setTotalNumber] = useState(null);
  const [active, setActive] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    fetchContactMessages();
  }, [activeCategory, active]);

  const handleActiveCategorySelected = (props) => {
    setActiveCategory(props);
}

  const fetchContactMessages = async () => {
    const firstNumber = (active -1) * 12 + 1;
    const lastNumber = (active * 12);
    try {
      const params = new URLSearchParams({
        firstNumber: firstNumber,
        lastNumber: lastNumber,
        category: activeCategory,
      }).toString();
      const res = await axios.get(`fetchPostContactMessagesByAdmin?${params}`);
      setMessages(res.data.contactMessages);
      setTotalNumber(res.data.totalNumber);
      console.log(res.data.contactMessages);
    } catch (error) {
      console.log(error.message);
    }
  };

  const activeHandler = (clickedPage) => {
    setActive(parseInt(clickedPage));
  };

  const handleMessageItemClicked = (props) => {
    const index = props;
    const realEstateId = messages[index].realEstateId;
    const params = new URLSearchParams({ realEstateId: realEstateId }).toString();
    history.push(`contact-post?${params}`);
  };

  if (messages === null || totalNumber === null) {
    return (
    <Loading />
    )
  }

  return (
    <div className="flex flex-col items-center w-full py-20">
      <p className="mb-10 font-medium text-[24px] ">メッセージボックス</p>
      {messages.length !== 0 && (
        <div>
          <Pagination
            active={active}
            size={Math.ceil(totalNumber / 12)}
            step={2}
            onClickHandler={activeHandler}
          />
        </div>
      )}
      <div className="flex justify-center gap-16 items-start">
        <div className="w-[200px] border-[1px] border-black font-normal">
          <div className="p-2 bg-[#0D4868]/80 text-center text-white font-bold">
            メッセージボックス
          </div>
          <div
            className={`text-center text-[16px] border-b-[1px] border-l-4  border-black p-2 cursor-pointer ${
              activeCategory === "all"
                ? "border-l-[#0D4868]"
                : "border-l-[#0D4868]/30"
            }`}
            onClick={() => handleActiveCategorySelected("all")}
          >
            すべて表示
          </div>
          <div className="text-[18px] py-2 pl-3 border-b-[1px] border-b-black/30 bg-[#F2ECCD]/40">
            受信箱
          </div>
          <div
            className={`text-center text-[16px] p-2 border-b-[1px] border-b-black/30 border-l-4 cursor-pointer ${
              activeCategory === "received-all"
                ? "border-l-[#0D4868]"
                : "border-l-[#0D4868]/30"
            }`}
            onClick={() => handleActiveCategorySelected("received-all")}
          >
            すべて表示
          </div>
          <div
            className={`text-center text-[16px] p-2 border-b-[1px] border-black border-l-4 cursor-pointer ${
              activeCategory === "received-unread"
                ? "border-l-[#0D4868]"
                : "border-l-[#0D4868]/30"
            }`}
            onClick={() => handleActiveCategorySelected("received-unread")}
          >
            未読
          </div>
          <div className="text-[18px] py-2 pl-3 border-b-[1px] border-b-black/30 bg-[#F2ECCD]/40">
            送信箱
          </div>
          <div
            className={`text-center text-[16px] p-2 border-l-4 cursor-pointer ${
              activeCategory === "sent"
                ? "border-l-[#0D4868]"
                : "border-l-[#0D4868]/30"
            }`}
            onClick={() => handleActiveCategorySelected("sent")}
          >
            すべて表示
          </div>
        </div>

        <div className="w-[1000px] min-h-[500px]">
          {messages.length === 0 && (
            <div className="text-3xl font-medium pt-[130px] pl-[180px]">
              まだメッセージはありません
            </div>
          )}
          {messages.map((msg, index) => {
            return (
              <div onClick={() => handleMessageItemClicked(index)}>
                <AccordionPostContactMessage key={index} message={msg} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminPostContactBoardPage;
