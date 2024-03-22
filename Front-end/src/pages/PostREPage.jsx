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
  const [privacyDataArray, setPrivacyDataArray] = useState({
    firstNameGana: '',
    firstNameGanji: '',
    lastNameGana: '',
    lastNameGanji: '',
    age: '',
    email: '',
    phoneNumber: [null, null, null],
    postalNumber: [null, null],
    province: '',
    city: '',
    street: ''
  });
  const [contentDataArray, setContentDataArray] = useState([]);
  const [overviewDataArray, setOverviewDataArray] = useState([]);
  const [uploadDataArray, setUploadDataArray] = useState([]);
  const [conditionData, setConditionData] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isShow, setIsShow] = useState('false');
  

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll smoothly to the top
    });
  }, [label]);

  useEffect(() => {
  const isFormComplete =
    privacyDataArray.firstNameGana.trim().length !== 0 &&
    privacyDataArray.firstNameGanji.trim().length !== 0 &&
    privacyDataArray.lastNameGana.trim().length !== 0 &&
    privacyDataArray.lastNameGanji.trim().length !== 0 &&
    privacyDataArray.age.trim().length !== 0 &&
    privacyDataArray.phoneNumber[0] !== null &&
    privacyDataArray.phoneNumber[1] !== null &&
    privacyDataArray.phoneNumber[2] !== null &&
    privacyDataArray.postalNumber[0] !== null &&
    privacyDataArray.postalNumber[1] !== null &&
    privacyDataArray.province !== '' &&
    privacyDataArray.city.trim().length !== 0 &&
    privacyDataArray.street.trim().length !== 0;

  setIsShow(isFormComplete ? "true" : "false");
}, [privacyDataArray]);


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
    if (!privacyDataArray.firstNameGana || privacyDataArray.firstNameGana.trim().length === 0) 
      return setValidationMessage("名前を正しく入力してください。");
    
    if (!privacyDataArray.firstNameGanji || privacyDataArray.firstNameGanji.trim().length === 0) 
    return setValidationMessage("名前を正しく入力してください。");
    
    if (!privacyDataArray.lastNameGana || privacyDataArray.lastNameGana.trim().length === 0) 
    return setValidationMessage("名前を正しく入力してください。");
    
    if (!privacyDataArray.lastNameGanji || privacyDataArray.lastNameGanji.trim().length === 0) 
    return setValidationMessage("名前を正しく入力してください。");
    
    if (privacyDataArray.age > 100 || privacyDataArray.age < 10)
      return setValidationMessage("あなたの年齢を正しく入力してください!");

    if (!privacyDataArray.email.includes("@"))
      return setValidationMessage("メールアドレスを正しく入力してください。");

    if ((typeof (privacyDataArray.phoneNumber[0]) === 'undefined') || (privacyDataArray.phoneNumber[0] === null)) {
      return setValidationMessage("電話番号を入力してください。")
    }
    if ((typeof (privacyDataArray.phoneNumber[1]) === 'undefined') || (privacyDataArray.phoneNumber[1] === null)) {
      return setValidationMessage("電話番号を入力してください。")
    }
    if ((typeof (privacyDataArray.phoneNumber[2]) === 'undefined') || (privacyDataArray.phoneNumber[2] === null)) {
      return setValidationMessage("電話番号を入力してください。")
    }
    
    if (
      (privacyDataArray.phoneNumber[0]).toString().trim().length > 3 ||
      (privacyDataArray.phoneNumber[0]).toString().trim().length < 2 ||
      (privacyDataArray.phoneNumber[1]).toString().trim().length > 4 ||
      (privacyDataArray.phoneNumber[1]).toString().trim().length < 2 ||
      (privacyDataArray.phoneNumber[2]).toString().trim().length !== 4
    )
      return setValidationMessage("電話番号を正確に入力してください！");
    
    if ((typeof (privacyDataArray.postalNumber[0]) === 'undefined') || (privacyDataArray.postalNumber[0] === null)) {
      return setValidationMessage("郵便番号を入力してください。")
    }
    if ((typeof (privacyDataArray.postalNumber[1]) === 'undefined') || (privacyDataArray.postalNumber[1] === null)) {
      return setValidationMessage("郵便番号を入力してください。")
    }

    if (
      (privacyDataArray.postalNumber[0]).toString().trim().length !==3 ||
      (privacyDataArray.postalNumber[1]).toString().trim().length !== 4
    )
      return setValidationMessage("郵便番号を正しく入力してください!");

    if (privacyDataArray.province === '') 
    return setValidationMessage("都道府県を選択してください。");
    
    if (!privacyDataArray.city || privacyDataArray.city.trim().length === 0) 
    return setValidationMessage("市区町村を入力してください。");
    
    if (!privacyDataArray.street || privacyDataArray.street.trim().length === 0) 
    return setValidationMessage("町名番地を入力してください。");

    if (!contentDataArray.briefDescription || contentDataArray.briefDescription.trim().length === 0) 
    return setValidationMessage("不動産の私たちと良い点を入力してください。");

    if (!contentDataArray.fullDescription || contentDataArray.fullDescription.trim().length === 0) 
    return setValidationMessage("これまでの経緯と今の状況を入力してください。");

    if (!overviewDataArray.budget || overviewDataArray.budget.trim().length === 0) 
    return setValidationMessage("希望の価格を入力してください。");

    if (!overviewDataArray.landarea || overviewDataArray.landarea.trim().length === 0) 
    return setValidationMessage("土地面積を入力してください。");

    if(label==="post-building"){

      if (!overviewDataArray.layout || overviewDataArray.layout.trim().length === 0) 
      return setValidationMessage("レイアウトを入力してください。");
     
      if (!overviewDataArray.buildingarea || overviewDataArray.buildingarea.trim().length === 0) 
      return setValidationMessage("建物面積を入力してください。");

      if (!overviewDataArray.deadline || overviewDataArray.deadline.trim().length === 0) 
      return setValidationMessage("入居日付を入力してください。");
    
      if (!overviewDataArray.parking || overviewDataArray.parking.trim().length === 0) 
      return setValidationMessage("駐車場の数を入力してください。");
    }

    if(label === "post-land"){

      if (!overviewDataArray.buildingCoverageRatio || overviewDataArray.buildingCoverageRatio.trim().length === 0) 
      return setValidationMessage("乾閉率を入力してください。");
      
      if (!overviewDataArray.floorAreaRatio || overviewDataArray.floorAreaRatio.trim().length === 0) 
      return setValidationMessage("容積率を入力してください。");
      
      if (!overviewDataArray.structure || overviewDataArray.structure.trim().length === 0) 
      return setValidationMessage("構造を入力してください。");
    }

    if (uploadDataArray.length === 0) 
    return setValidationMessage("画像ファイルをアップロードしてください。");


    try {
      const newphoneNumber = 
        privacyDataArray.phoneNumber[0].toString() +
          privacyDataArray.phoneNumber[1].toString() +
          privacyDataArray.phoneNumber[2].toString();
      const newpostalNumber =
        privacyDataArray.postalNumber[0].toString() +
          privacyDataArray.postalNumber[1].toString();
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
    <div className="flex flex-col items-center bg-[#F1F1F1] py-[100px]">
      <div className="flex flex-col items-center bg-white w-[90%] sm:w-[600px] md:w-[750px] lg:w-[900px] xl:w-[1400px] py-[100px] ">
        <div className="pb-[80px] text-center">
          <span className="text-[32px] sm:text-[48px] pr-[18px]">ふどうさん</span>
          <span className="text-[24px] sm:text-[32px]">活市場</span>
        </div>
        <div className="flex flex-col items-center xl:flex-row justify-between w-full sm:px-4 md:px-20">
          <div className="grid max-w-[350px] sm:max-w-[1000px] grid-cols-3 md:grid-cols-4 gap-y-4 xl:grid-cols-2 gap-x-4 mx-auto md:gap-x-12 w-full xl:max-w-[380px]">
            {Object.keys(myImage).map((key, i) => (
              <Category text={key} img={myImage[key]} key={i} alt={i} />
            ))}
          </div>

          <div className="flex flex-col w-full lg:w-[720px] pt-10 xl:pt-0">
            <p className="text-[27px] sm:text-[30px] md:text-[32px] text-Architects Daughter text-center">
              どんな物件でも大丈夫！{" "}
            </p>

            <p className="sm:text-[20px] lg:text-[22px] pt-[40px] px-[10px]">
              {" "}
              ふどうさん活市場では、どんな場所でも、どんなに古くても、
              掲載条件はありません。自由に載せていいサイトです。
            </p>

            <div className="grid grid-cols-2 gap-x-2 sm:gap-x-8 gap-y-4 pt-20">
              {myFlag.map((text, index) => (
                <FlagTextContainer text={text} key={index} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-[22px] sm:text-[32px] md:text-[40px] pt-20 text-center ">
          ふどうさん活市場で売れました！
        </p>

        <div className="grid xl:grid-cols-2 gap-x-12 gap-y-8 pt-20">
          {myArray.map((image, index) => (
            <SoldFeedbackCard img={image} text={text} key={index} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 py-[30px] md:py-[50px] my-16 bg-[#0D4868] w-[90%] sm:w-[600px] md:w-[720px] lg:w-[900px] xl:w-[1000px] text-white text-[14px] sm:text-[24px] md:text-[30px]">
        <p>個人情報を明かさずに相手とやりとりできます</p>
        <p>契約書類はすべて国家資格の宅建士が作成</p>
        <p>掲載は一切無料</p>
      </div>

      <div className="flex flex-col items-center pb-[50px] bg-white w-[90%] sm:w-[600px] md:w-[750px] lg:w-[950px] xl:w-[1400px]">
        <p className="text-[36px] pt-[80px] text-center">掲載のご依頼</p>

        <div className="flex flex-col  py-[60px] pl-[30px] sm:pl-[80px]">
          <p className="text-[18px] flex justify-center sm:text-[18px] md:text-[24px] pb-[30px]">
            どうぞ、ご存じの範囲でありのままご記入ください。
          </p>
          <p className="text-[18px] text-base pb-[4px]">
            ※掲載内容は後からでも追記、修正できます。
          </p>
          <p className="text-[18px] text-base pb-[4px]">
            ※掲載の休止、終了はいつでも可能です。
          </p>
          <p className="text-[18px] text-base pb-[4px]">※どう書いたらいいか分からないなどのご相談もお受けします。</p>
        </div>

        <div className="flex flex-col  py-[60px] pl-[30px] sm:pl-[80px] pb-[50px]">
          <p className="text-[18px] text-center sm:text-[18px] md:text-[24px] pb-[30px]">掲載方法</p>
          <p className="text-[18px] text-base">
          ※氏名は正確に（住民票など記載のもの）ご入力ください。
          </p>
          <p className="text-[18px] text-base pb-[4px]">
          ※お名前や電話番号などは、商談相手に伝わらないようになっています。
          </p>
          <p className="text-[18px] text-base pb-[4px]">
            ※自分の住所ではなく、不動産住所を入力してください。
            <br/>※ この住所がそのままサイトに掲載されてしまうことはありません</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col gap-12 items-center w-[90%] mx-auto  sm:w-[600px] md:w-[750px] lg:w-[900px] ">
            <PrivacyForm onDataArrayFromChild={handlePrivacyDataArray} />
            {isShow === "true" ?(<div className="flex flex-col gap-12 items-center w-[90%] mx-auto  sm:w-[600px] md:w-[750px] lg:w-[900px] ">

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
                <NecessaryTag content={"画像"} />
                <UploadImageForm
                  title="資格コピー"
                  button="資格のコピーをアップロード"
                  width1={"w-[800px]"}
                  width2={"w-[300px]"}
                  gap={"gap-[35px]"}
                  onDataArrayFromChild={handleUploadDataArray}
                />
              </div>

              <ConditionForm onDataArrayFromChild={handleconditionDataArray} />

              <p className="text-center pt-[20px] text-[24px] text-yellow-700">{validationMessage}</p>
              <div className="flex justify-center pt-[80px] pb-[170px]">
                {conditionData ? (
                  <button
                    type="submit"
                    className="  text-white px-[115px] py-[14px] text-[24px] rounded-[20px]"
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
            </div>):" "
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostREPage;
