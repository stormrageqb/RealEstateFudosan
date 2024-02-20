import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../components/Loading";
import moment from "moment-timezone";

const ContactGeneralPage = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const inputRef = useRef();

  const [cookies, setCookie] = useCookies();
  const myId = cookies.user._id;
  const myName =
    cookies.user.name.lastNameGanji + " " + cookies.user.name.firstNameGanji;
  const isAdmin = cookies.user.isAdmin;
  const clientId = isAdmin ? searchParams.get("clientId") : myId;

  const [content, setContent] = useState();
  const [contactMessages, setContactMessages] = useState([]);

  const handleNavigateToFaqClicked = () => {
    history.push("/faq");
  };

  const sendContactMessage = async () => {
    try {
      const category = isAdmin ? "reply" : "query";
      const payload = {
        content: content,
        clientId: clientId,
        category: category,
      };
      const res = await axios.post("/saveGeneralContactMessage", payload);
      fetchContactMessages();
      inputRef.current.value = "";
      setContent("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchContactMessages = async () => {
    try {
      console.log("clientId++++++++++++++", clientId);
      const params = new URLSearchParams({ clientId: clientId }).toString();
      const res = await axios.get(`/fetchGeneralContactMessages?${params}`);
      setContactMessages(res.data.contactMessages);
      console.log(res.data.contactMessages);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchContactMessages();
  }, []);

  if (contactMessages === null) {
    return <Loading />;
  }

  return (
    <div className="bg-[#F1F1F1] w-full">
      <div className="flex flex-col items-center w-full mx-auto font-normal">
        <p className="text-[32px] md:text-[36px] lg:text-[40px] py-[55px] font-semibold">
          総合窓口
        </p>
        <div className="font-normal text-sm sm:text-base md:text-lg">
          <div className="list-disc">
            掲載中の物件に関するお問い合わせはこちら
          </div>
          <div className="hidden list-disc sm:inline-block">
            物件に関するお問合せはこちらではしないでください。
            <br />
            購入を検討している物件のページから、売主さんに直接お問い合わせください。
          </div>
          <div className="list-disc sm:hidden">
            物件に関するお問合せはこちらではしないでください。
            <br />
            購入を検討している物件のページから、
            <br />
            売主さんに直接お問い合わせください。
          </div>
          <div className="list-disc">
            ※家いちばから物件に関する情報はお伝えしておりません
          </div>
        </div>
        <span
          className="inline-block py-10 px-[15px] underline underline-offset-8 text-[22px] font-normal cursor-pointer"
          onClick={handleNavigateToFaqClicked}
        >
          良くあるご質問はこちら{" "}
          <span className="pr-3 fa-solid fa-arrow-right underline underline-offset-8 "></span>
        </span>
        {contactMessages.map((message, index) => {
          const japanTime = moment.utc(message.createdAt).tz("Asia/Tokyo");
          const year = japanTime.year();
          const month = japanTime.month();
          const day = japanTime.date();
          const time = japanTime.format("HH:mm:ss");
          console.log(message.createdAt, year, month)
          return (
            <div
              key={index}
              className={`relative w-[90%] sm:w-[560px] md:w-[700px] lg:w-[900px] xl:w-[1100px] h-auto border-2 border-[#2A6484]/40 p-10 mb-10 ${
                message.category === "query" ? "bg-white" : "bg-[#F2ECCD]"
              }`}
            >
              {message.category === "query" ? (
                <p className="text-[20px] font-semibold mb-8">
                  {message.clientId.name.firstNameGanji +
                    message.clientId.name.lastNameGanji}
                  さん → ふどさんさん
                </p>
              ) : (
                <p className="text-[20px] font-semibold mb-8">
                  ふどさんさん →{" "}
                  {message.clientId.name.firstNameGanji +
                    message.clientId.name.lastNameGanji}
                  さん
                </p>
              )}
              <p className="text-[16px] pb-8 whitespace-pre-wrap break-words">
                {message.content}
              </p>
              <div className="absolute right-6 bottom-6">
                {year}年{month}月{day}日{time}
              </div>
            </div>
          );
        })}
        <p className="mt-10 mb-3 text-[24px] pb-[15px]">
          メッセージ送信フォーム
        </p>
        <textarea
          name="message"
          ref={inputRef}
          id="message"
          cols=""
          rows="3"
          className="w-[90%] sm:w-[550px] md:w-[650px] lg:w-[850px] xl:w-[900px] py-2 px-4 text-base font-normal border-2 border-black/30"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="pt-10 pb-24 flex justify-center">
          <button
            className="py-3 px-8 rounded-[15px] bg-[#2A6484] font-medium text-[24px] text-white"
            onClick={sendContactMessage}
          >
            メッセージを送信する
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactGeneralPage;
