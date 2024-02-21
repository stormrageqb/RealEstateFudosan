import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import Category from "../components/Category";
import FlagTextContainer from "../components/FlagTextContainer";
import SoldFeedbackCard from "../components/SoldFeedbackCard";
import PrivacyForm from "../components/Form/PrivacyForm";
import ContentForm from "../components/Form/ContentForm";
import OverviewHouseForm from "../components/Form/OverviewHouseForm";
import OverviewLandForm from "../components/Form/OverviewLandForm";
import UploadImageForm from "../components/Form/UploadImageForm";
import ConditionForm from "../components/Form/ConditionForm";
import axios from "axios";
import { useCookies } from "react-cookie";

import NecessaryTag from "../components/NecessaryTag";
const myImage = {
  古民家: require("../assets/img/category/1.png"),
  "マンション・ビル": require("../assets/img/category/2.png"),
  一戸建て: require("../assets/img/category/3.png"),
  "店舗・倉庫・投資用物件": require("../assets/img/category/4.png"),
  原野: require("../assets/img/category/5.png"),
  林野: require("../assets/img/category/6.png"),
  農地: require("../assets/img/category/7.jpg"),
  住宅地: require("../assets/img/category/8.png"),
};

const myFlag = [
  "とんでもない田舎",
  "雨漏りしている",
  "雑草が生え放題",
  "荷物がまだ片付いてない",
  "値段が決まっていない",
  "仏壇がそのまま",
  "とにかく古い",
  "相続が終わっていない",
  "未登記のまま",
  "農地、山林もある",
];

const myArray = [
  require("../assets/img/feedback/1.jpg"),
  require("../assets/img/feedback/2.jpg"),
  require("../assets/img/feedback/3.jpg"),
  require("../assets/img/feedback/4.jpg"),
  require("../assets/img/feedback/5.jpg"),
  require("../assets/img/feedback/6.jpg"),
];

const text = `テキスト  テキスト  テキスト  テキスト  テキスト  テキスト 
    テキスト  テキスト  テキスト  テキスト  テキスト  テキスト
    テキスト  テキスト  テキスト  テキスト  テキスト  テキスト
    テキスト  テキスト  テキスト  テキスト  テキスト  テキスト
    テキスト  テキスト  テキスト  テキスト  テキスト  テキスト
    テキスト  テキスト  テキスト  テキスト  テキスト  テキスト
    テキスト  テキスト  テキスト  テキスト  テキスト  テキスト
    テキスト  テキスト  テキスト  テキスト  テキスト  テキスト`;

const PostREPage = () => {
  const [cookies, setCookie] = useCookies();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const label = searchParams.get("label");
  const [privacyDataArray, setPrivacyDataArray] = useState();
  const [contentDataArray, setContentDataArray] = useState([]);
  const [overviewDataArray, setOverviewDataArray] = useState([]);
  const [uploadDataArray, setUploadDataArray] = useState([]);
  const [conditionData, setConditionData] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll smoothly to the top
    });
  }, [label]);

  const handlePrivacyDataArray = (data) => {
    setPrivacyDataArray(data);
  };
  const handleContentDataArray = (data) => {
    setContentDataArray(data);
  };
  const handleOverviewDataArray = (data) => {
    setOverviewDataArray(data);
  };
  const handleUploadDataArray = (data) => {
    setUploadDataArray(data);
  };
  const handleconditionDataArray = (data) => {
    setConditionData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationMessage("");
    if (privacyDataArray.age > 100 || privacyDataArray.age < 10)
      return setValidationMessage("あなたの年齢を正しく入力してください!");
    if (!privacyDataArray.email.includes("@"))
      return setValidationMessage("メールアドレスを正しく入力してください。");
    if (
      Math.abs(privacyDataArray.phoneNumber[0]).toString().trim().length > 3 ||
      Math.abs(privacyDataArray.phoneNumber[0]).toString().trim().length < 2 ||
      Math.abs(privacyDataArray.phoneNumber[1]).toString().trim().length > 4 ||
      Math.abs(privacyDataArray.phoneNumber[1]).toString().trim().length < 2 ||
      Math.abs(privacyDataArray.phoneNumber[2]).toString().trim().length !== 4
    )
      return setValidationMessage("電話番号を正確に入力してください！");
    if (
      Math.abs(privacyDataArray.postalNumber[0]).toString().trim().length !==
        3 ||
      Math.abs(privacyDataArray.postalNumber[1]).toString().trim().length !== 4
    )
      return setValidationMessage("郵便番号を正しく入力してください!");

    try {
      const newphoneNumber = parseInt(
        privacyDataArray.phoneNumber[0].toString() +
          privacyDataArray.phoneNumber[1].toString() +
          privacyDataArray.phoneNumber[2].toString()
      );
      const newpostalNumber = parseInt(
        privacyDataArray.postalNumber[0].toString() +
          privacyDataArray.postalNumber[1].toString()
      );
      const newId = cookies.user._id;
      const name = {
        firstNameGana: privacyDataArray.firstNameGana,
        lastNameGana: privacyDataArray.lastNameGana,
        firstNameGanji: privacyDataArray.firstNameGanji,
        lastNameGanji: privacyDataArray.lastNameGanji,
      };
      const address = {
        zipCode: newpostalNumber,
        province: privacyDataArray.province,
        city: privacyDataArray.city,
        street: privacyDataArray.street,
      };
      const briefDescription = contentDataArray.briefDescription;
      const fullDescription = contentDataArray.fullDescription;
      const basicInfoBuilding = {
        budget: overviewDataArray.budget,
        layout: overviewDataArray.layout,
        landarea: overviewDataArray.landarea,
        buildingArea: overviewDataArray.buildingarea,
        deadline: overviewDataArray.deadline,
        parking: overviewDataArray.parking,
      };
      const basicInfoLand = {
        budget: overviewDataArray.budget,
        buildingCoverageRatio: overviewDataArray.buildingCoverageRatio,
        landarea: overviewDataArray.landarea,
        floorAreaRatio: overviewDataArray.floorAreaRatio,
        structure: overviewDataArray.structure,
      };
      const label = searchParams.get("label");
      const getUser = {
        age: privacyDataArray.age,
        email: privacyDataArray.email,
        phoneNumber: newphoneNumber,
        name: name,
      };

      const realEstateData = {
        poster: newId,
        address: address,
        briefDescription: briefDescription,
        fullDescription: fullDescription,
        basicInfoBuilding: basicInfoBuilding,
        basicInfoLand: basicInfoLand,
        label: label,
        getUser: getUser,
      };

      const formData = new FormData();
      // Append other form data
      formData.append("realEstateInfo", JSON.stringify(realEstateData));
      // ... Append other form data as needed

      // Append image files
      //console.log(uploadDataArray);
      for (const file of uploadDataArray) {
        formData.append("images", file);
      }
      // Make a single axios request for both form data and images
      const res = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/postRealEstate",
        formData
      );
      //console.log(formData);

      // Handle the response if needed
      //console.log('Response from backend:', res.data);
    } catch (error) {
      // Handle errors
      console.error("Error sending form data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#F1F1F1] pt-[100px]">
      <div className="flex flex-col items-center bg-white xl:w-[1400px] py-[60px] ">
        <div className="pb-[132px] text-center">
          <span className="text-[48px] pr-[18px]">ふどうさん</span>
          <span className="text-[32px]">活市場</span>
        </div>
        <div className="flex justify-between w-full px-20">
          <div className="grid grid-cols-2 gap-x-12 max-w-[550px]">
            {Object.keys(myImage).map((key, i) => (
              <Category text={key} img={myImage[key]} alt={i} />
            ))}
          </div>

          <div className="flex flex-col w-[720px]">
            <p className="text-[32px] text-Architects Daughter text-center">
              どんな物件でも大丈夫！{" "}
            </p>

            <p className="text-[22px] pt-[40px] pr-[10px]">
              {" "}
              ふどうさん活市場では、どんな場所でも、どんなに古くても、
              掲載条件はありません。自由に載せていいサイトです。
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-20">
              {myFlag.map((text, index) => (
                <FlagTextContainer text={text} key={index} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-[40px] pt-20 text-center ">
          ふどうさん活市場で売れました！
        </p>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-20">
          {myArray.map((image, index) => (
            <SoldFeedbackCard img={image} text={text} key={index} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 py-[70px] my-16 bg-[#0D4868] w-[1070px] text-white text-[30px]">
        <p>個人情報を明かさずに相手とやりとりできます</p>
        <p>契約書類はすべて国家資格の宅建士が作成</p>
        <p>掲載は一切無料</p>
      </div>

      <div className="flex flex-col items-center pb-[50px] bg-white xl:w-[1400px]">
        <p className="text-[36px] pt-[80px] text-center">掲載のご依頼</p>

        <div className="flex flex-col items-start py-[60px] pl-[80px]">
          <p className="text-[24px] pb-[30px]">
            どうぞ、ご存じの範囲でありのままご記入ください。
          </p>
          <p className="pb-[4px]">※掲載内容は後からでも追記、修正できます。</p>
          <p className="pb-[4px]">※掲載の休止、終了はいつでも可能です。</p>
          <p>※どう書いたらいいか分からないなどのご相談もお受けします。</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col gap-12 items-center w-[90%] sm:w-[600px] md:w-[750px] lg:w-[900px] ">
            <PrivacyForm onDataArrayFromChild={handlePrivacyDataArray} />

            <ContentForm onDataArrayFromChild={handleContentDataArray} />

            {label === "post-building" ? (
              <OverviewHouseForm
                onDataArrayFromChild={handleOverviewDataArray}
              />
            ) : (
              <OverviewLandForm
                onDataArrayFromChild={handleOverviewDataArray}
              />
            )}

<div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
              <NecessaryTag content={"投稿内容"} />
              <UploadImageForm
                title="資格コピー"
                button="資格のコピーをアップロード"
                width1={"w-[800px]"}
                width2={"w-[300px]"}
                gap={"gap-[35px]"}
                onDataArrayFromChild={handleUploadDataArray}
              />
            </div>
            <div className="flex justify-center">
              <ConditionForm onDataArrayFromChild={handleconditionDataArray} />
            </div>
            <p className="text-center pt-[20px]">{validationMessage}</p>
            <div className="flex justify-center pt-[80px] pb-[170px]">
              {conditionData ? (
                <button
                  type="submit"
                  className="bg-[#2A6484] text-white px-[115px] py-[14px] text-[24px] rounded-[20px]"
                  disabled={!conditionData}
                >
                  提出
                </button>
              ) : (
                <button
                  type="submit"
                  className=" bg-gray-300 text-white px-[115px] py-[14px] text-[24px] rounded-[20px]"
                  disabled={!conditionData}
                >
                  提出
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostREPage;
