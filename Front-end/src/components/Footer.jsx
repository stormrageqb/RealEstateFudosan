import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Footer = () => {
  const history = useHistory();
  const handleFeedbackCategoryClicked = (props) => {
    const searchParams = new URLSearchParams();
    searchParams.set("category", props);
    history.push(`/feedback-board?${searchParams.toString()}`);
  };
  const handleRealEstatePostClicked = (props) => {
    const label = props;
    const searchParams = new URLSearchParams();
    searchParams.set("label", label);
    history.push(`/post-realestate?${searchParams.toString()}`);
  };
  const handleRealEstateCagegoryClicked = (e) => {
    const searchParams = new URLSearchParams();
    searchParams.set("filterLabel", "filterByCategory");
    searchParams.set("filterContent", e.target.innerText);
    history.push(`/item-list?${searchParams.toString()}`);
  };
  const handleMyPostClicked = () => {
    history.push("/my-post");
  };
  const handleFavouriteClicked = () => {
    history.push("/favourite");
  };
  const handleMyMsgClicked = () => {
    history.push("/message-board");
  };
  const handleContactClicked = () => {
    history.push("/contact-general");
  };
  const handleLoginClicked = () => {
    history.push("/login");
  };
  return (
    <div className=" relative flex flex-col items-center w-full h-auto pb-20 bg-[#2A6484] font-normal">
      <div className="hidden sm:flex sm:flex-row sm:justify-center sm:items-start w-full h-auto pb-8 pt-6 border-b  border-white">
        <div className="flex flex-row justify-between items-start h-full w-[900px] xl:w-[1300px]">
          <div className="flex flex-col items-start">
            <span className=" text-[#FFC804] text-[20px]">よくある質問</span>
            <span
              className=" text-white text-[16px] pt-3 cursor-pointer"
              onClick={() => handleFeedbackCategoryClicked("sold")}
            >
              売りました体験談
            </span>
            <span
              className=" text-white text-[16px] pt-1 cursor-pointer"
              onClick={() => handleFeedbackCategoryClicked("bought")}
            >
              こんな風に使ってます
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className=" text-[#FFC804] text-[20px]">掲示板に投稿</span>
            <span
              className=" text-white text-[16px] pt-3 cursor-pointer"
              onClick={() => handleRealEstatePostClicked("post-building")}
            >
              建物の投稿
            </span>
            <span
              className=" text-white text-[16px] pt-1 cursor-pointer"
              onClick={() => handleRealEstatePostClicked("post-land")}
            >
              土地の投稿
            </span>
            <span className=" text-white text-[16px] pt-1 cursor-pointer">
              <Link
                to="/post-agent"
                className="text-current no-underline transition-all duration-75 hover:text-white/40"
              >
                業者の投稿
              </Link>
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className=" text-[#FFC804] text-[20px]">掲示板を見る</span>
            <div
              className="flex flex-row pt-3 cursor-pointer"
              onClick={(e) => handleRealEstateCagegoryClicked(e)}
            >
              <div className="flex flex-col items-start">
                <span className=" text-white text-[16px] pt-1">古民家</span>
                <span className=" text-white text-[16px] pt-1">一戸建て</span>
                <span className=" text-white text-[16px] pt-1">マンション</span>
                <span className=" text-white text-[16px] pt-1">店舗・倉庫</span>
              </div>
              <div className="flex flex-col items-start pl-8">
                <span className=" text-white text-[16px] pt-1">住宅地</span>
                <span className=" text-white text-[16px] pt-1">原野</span>
                <span className=" text-white text-[16px] pt-1">林野</span>
                <span className=" text-white text-[16px] pt-1">農地</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className=" text-[#FFC804] text-[22px]">マイページ</span>
            <span
              className=" text-white text-[16px] pt-3 cursor-pointer"
              onClick={handleMyPostClicked}
            >
              私の投稿
            </span>
            <span
              className=" text-white text-[16px] pt-1 cursor-pointer"
              onClick={handleFavouriteClicked}
            >
              お気に入り
            </span>
            <span
              className=" text-white text-[16px] pt-1 cursor-pointer"
              onClick={handleMyMsgClicked}
            >
              メッセージ
            </span>
            <span
              className=" text-white text-[16px] pt-1 cursor-pointer"
              onClick={handleContactClicked}
            >
              総合窓口
            </span>
          </div>
          <div
            className="text-[#FFC804] text-[20px] cursor-pointer"
            onClick={handleLoginClicked}
          >
            ログイン
          </div>
        </div>
      </div>
      <div className="pt-3 w-full sm:w-[700px] lg:w-[1000px] xl:w-[1250px]">
        <div className="hidden sm:flex flex-row justify-between ">
          <span className=" text-white text-[16px]">
            ふどうさん市場 株式会社
          </span>
          <span className=" text-white text-[16px]">
            代表取締役 <span className="text-[#FFC804]">馬場芳朗</span>
          </span>
          <span className=" text-white text-[16px] hidden lg:block">
            東京都中央区銀座1丁目22番11号 銀座大竹ビジデンス2 F
          </span>
          <span className=" text-white text-[16px]">TEL: 03-6685-8407</span>
        </div>

        <span className="absolute left-16 bottom-2 text-white text-[16px] hidden sm:block lg:hidden">
          東京都中央区銀座1丁目22番11号 銀座大竹ビジデンス2 F
        </span>

        <div className="pl-2 flex flex-col gap-4 text-[14px] sm:hidden">
          <div className="flex items-center justify-start gap-5">
            <span className=" text-white">
              ふどうさん市場 株式会社
            </span>
            <span className=" text-white">
              代表取締役 <span className="text-[#FFC804]">馬場芳朗</span>
            </span>
          </div>

          <span className=" text-white">
            東京都中央区銀座1丁目22番11号 銀座大竹ビジデンス2 F
          </span>
          <span className=" text-white">TEL: 03-6685-8407</span>
        </div>

        <div className="absolute right-5 bottom-2 text-white">
          Fudosan Market Co.,Ltd.
        </div>
      </div>
    </div>
  );
};

export default Footer;
