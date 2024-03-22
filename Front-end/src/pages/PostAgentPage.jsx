import React, { useState, useEffect } from "react";
import UploadImageForm from "../components/Form/UploadImageForm";
import ConditionForm from "../components/Form/ConditionForm";
import axios from "axios";
import NecessaryTag from "../components/NecessaryTag";
import { useCookies } from "react-cookie";
import { GoHorizontalRule } from "react-icons/go";

const PROVINCE = [
  "北海道",
  "青森県",
  "岩手県",
  "秋田県",
  "宮城県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "長野県",
  "山梨県",
  "富山県",
  "石川県",
  "静岡県",
  "愛知県",
  "岐阜県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "岡山県",
  "広島県",
  "鳥取県",
  "島根県",
  "山口県",
  "香川県",
  "徳島県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "大分県",
  "熊本県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const PostAgentPage = () => {
  const [value, setValue] = useState("");
  const [cookies, setCookie] = useCookies();
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [postalNumber, setPostalNumber] = useState([]);
  const [uploadDataArray, setUploadDataArray] = useState([]);
  const [conditionData, setConditionData] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameGana, setFirstNameGana] = useState("");
  const [lastNameGana, setLastNameGana] = useState("");
  const [firstNameGanji, setFirstNameGanji] = useState("");
  const [lastNameGanji, setLastNameGanji] = useState("");
  const [content, setContent] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isShow, setIsShow] = useState("false")
 
  const handleUploadDataArray = (data) => {
    setUploadDataArray(data);
  };

  const handleconditionDataArray = (data) => {
    setConditionData(data);
  };

  const handleInputPhoneNumber = (index, value) => {
    // Create a new array with the updated value at the specified index
    const updatedPhoneValues = [...phoneNumber];
    updatedPhoneValues[index] = value;
    // Update the state with the new array
    setPhoneNumber(updatedPhoneValues);
  };

  const handleInputPoastalNumber = (index, value) => {
    // Create a new array with the updated value at the specified index
    const updatedPostalNumber = [...postalNumber];
    updatedPostalNumber[index] = value;
    // Update the state with the new array
    setPostalNumber(updatedPostalNumber);
  };
  const privacyDataArray = [firstNameGana, firstNameGanji, lastNameGana, role, phoneNumber, postalNumber, province, city, street];
  useEffect(() => {
    const isFormComplete =
      firstNameGana.trim().length !== 0 &&
      firstNameGanji.trim().length !== 0 &&
      lastNameGana.trim().length !== 0 &&
      lastNameGanji.trim().length !== 0 &&
      role!== 0 &&
      phoneNumber[0] !== null &&
      phoneNumber[1] !== null &&
      phoneNumber[2] !== null &&
      postalNumber[0] !== null &&
      postalNumber[1] !== null &&
      province !== '' &&
      city.trim().length !== 0 &&
      street.trim().length !== 0;
  
    setIsShow(isFormComplete ? "true" : "false");
  }, [privacyDataArray]);

  const newId = cookies.user._id;
  const newphoneNumber =
      (phoneNumber[0] ? phoneNumber[0].toString() : "") +
      (phoneNumber[1] ? phoneNumber[1].toString() : "") +
      (phoneNumber[2] ? phoneNumber[2].toString() : "");
  const newpostalNumber = 
      (postalNumber[0] ? postalNumber[0].toString() : "") +
      (postalNumber[1] ? postalNumber[1].toString() : "") +
      (postalNumber[2] ? postalNumber[2].toString() : "");
  const agentName = {
    firstNameGana: firstNameGana,
    lastNameGana: lastNameGana,
    firstNameGanji: firstNameGanji,
    lastNameGanji: lastNameGanji,
  };
  const address = {
    zipCode: newpostalNumber,
    province: province,
    city: city,
    street: street,
  };

  const agentData = {
    posterId: newId,
    agentName: agentName,
    agentEmail: email,
    address: address,
    category: role,
    phoneNumber: newphoneNumber,
    companyName: companyName,
    content: content,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationMessage("");

    if (!firstNameGana || firstNameGana.trim().length === 0) 
      return setValidationMessage("名前を正しく入力してください。");
    
    if (!firstNameGanji || firstNameGanji.trim().length === 0) 
      return setValidationMessage("名前を正しく入力してください。");
    
    if (!lastNameGana || lastNameGana.trim().length === 0) 
      return setValidationMessage("名前を正しく入力してください。");
    
    if (!lastNameGanji || lastNameGanji.trim().length === 0) 
      return setValidationMessage("名前を正しく入力してください。");

    if (!companyName || companyName.trim().length === 0) 
      return setValidationMessage("会社名を正しく入力してください。");
    
    if (!email.includes("@"))
      return setValidationMessage("メールアドレスを正しく入力してください。");

    if (role === '') 
      return setValidationMessage("役割を選択してください。");

    if ((typeof (phoneNumber[0]) === 'undefined') || (phoneNumber[0] === null)) {
      return setValidationMessage("電話番号を入力してください。")
    }
    if ((typeof (phoneNumber[1]) === 'undefined') || (phoneNumber[1] === null)) {
      return setValidationMessage("電話番号を入力してください。")
    }
    if ((typeof (phoneNumber[2]) === 'undefined') || (phoneNumber[2] === null)) {
      return setValidationMessage("電話番号を入力してください。")
    }
    
    if((phoneNumber[0]).toString().trim().length > 3 || (phoneNumber[0]).toString().trim().length < 2
        || (phoneNumber[1]).toString().trim().length > 4 || (phoneNumber[1]).toString().trim().length < 2
        || (phoneNumber[2]).toString().trim().length !== 4 )
      return setValidationMessage("電話番号を正確に入力してください！");

    if ((typeof (postalNumber[0]) === 'undefined') || (postalNumber[0] === null)) {
      return setValidationMessage("郵便番号を入力してください。")
    }
    if ((typeof (postalNumber[1]) === 'undefined') || (postalNumber[1] === null)) {
      return setValidationMessage("郵便番号を入力してください。")
    }
    
    if((postalNumber[0]).toString().trim().length !== 3 || (postalNumber[1]).toString().trim().length !== 4 )
      return setValidationMessage("郵便番号を正しく入力してください!");

    if (province === '') 
      return setValidationMessage("都道府県を選択してください。");
  
    if (!city || city.trim().length === 0) 
      return setValidationMessage("市区町村を入力してください。");
  
    if (!street || street.trim().length === 0) 
      return setValidationMessage("町名番地を入力してください。");

    if (!content || content.trim().length === 0) 
    return setValidationMessage("投稿内容を入力してください。");

    if (uploadDataArray.length === 0) 
    return setValidationMessage("画像ファイルをアップロードしてください。");
  
    try {

      const formData = new FormData();
      // Append other form data
      formData.append("agentInfo", JSON.stringify(agentData));

      for (const file of uploadDataArray) {
        formData.append("images", file);
      }
      const res = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/postAgent",
        formData
      );
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if cookies.user exists and has _id property
        if (cookies.user && cookies.user._id) {
          const response = await axios.get("/getUser", {
            params: { _id: cookies.user._id },
          });

          setEmail(response.data[0].email);
          setFirstNameGana(response.data[0].name.firstNameGana);
          setLastNameGana(response.data[0].name.lastNameGana);
          setFirstNameGanji(response.data[0].name.firstNameGanji);
          setLastNameGanji(response.data[0].name.lastNameGanji);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [cookies.user]);

  return (
    <div className="bg-[#F1F1F1] py-[100px]">
      <div className="flex flex-col items-center w-[90%] sm:w-[600px] md:w-[750px] lg:w-[900px] xl:w-[1400px] mx-auto bg-white">
        <p className="text-[36px] py-20">掲載のご依頼</p>
        <div className="flex flex-col items-start gap-4 mb-16 lg:mb-8 text-[10px] sm:text-[16px] lg:text-[20px]">
          <p>どうぞ、ご存じの範囲でありのままご記入ください。</p>
          <p>※掲載内容は後からでも追記、修正できます。</p>
          <p>※掲載の休止、終了はいつでも可能です。</p>
          <p>※どう書いたらいいか分からないなどのご相談もお受けします。</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col items-center gap-8 w-[90%] sm:w-[600px] md:w-[750px] lg:w-[900px] px-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
              <NecessaryTag content={"担当者名"} />

              <div className="flex justify-between w-full sm:w-[445px]">
                <div className="flex flex-col gap-2 sm:gap-4 w-[45%]">
                  <div className="flex justify-between w-full">
                    <span>(姓)</span>
                    <input
                      placeholder="例:下保木"
                      
                      name="lastNameGanji"
                      value={lastNameGanji}
                      className="w-[80px] sm:w-[130px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md text-sm sm:text-base"
                      type="text"
                      onChange={(e) => setLastNameGanji(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <span>(せい)</span>
                    <input
                      placeholder="例:しもほき"
                      
                      name="lastNameGana"
                      value={lastNameGana}
                      className="w-[80px] sm:w-[130px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md text-sm sm:text-base"
                      type="text"
                      onChange={(e) => setLastNameGana(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-4 w-[45%]">
                  <div className="flex justify-between w-full">
                    <span>(名)</span>
                    <input
                      placeholder="例:虎史"
                      
                      name="firstNameGanji"
                      value={firstNameGanji}
                      className="w-[80px] sm:w-[130px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md text-sm sm:text-base"
                      type="text"
                      onChange={(e) => setFirstNameGanji(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <span>(めい)</span>
                    <input
                      placeholder="例:こし"
                      
                      name="firstNameGana"
                      value={firstNameGana}
                      className="w-[80px] sm:w-[130px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md text-sm sm:text-base"
                      type="text"
                      onChange={(e) => setFirstNameGana(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
              <NecessaryTag content={"会社名"} />

              <input
                
                type="text"
                className="w-full sm:w-[445px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
              <NecessaryTag content={"メール"} />

              <input
                placeholder="例:hoshi@gmail.com"
                
                value={email}
                type="text"
                className="w-full sm:w-[445px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
              <NecessaryTag content={"役割"} />

              <select
                className="border-[1px] focus:outline-none focus:border-blue-500 p-1 rounded-md border-black w-full sm:w-[445px] "
                onChange={(event) => setRole(event.target.value)}
                
                defaultValue={value}
              >
                <option className="text-[16px]" value="">
                  &nbsp;
                </option>
                <option className="text-[16px]" value="不動産業者">
                  &nbsp;不動産業者
                </option>
                <option className="text-[16px]" value="司法書士">
                  &nbsp;司法書士

                </option>
                <option className="text-[16px]" value="投資家">
                  &nbsp;投資家
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
              <NecessaryTag content={"電話番号"} />
              <div className="flex items-center w-full justify-between sm:w-[445px]">
                <input
                  placeholder="例:092"
                  
                  type="number"
                  className="w-[25%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                  value={phoneNumber[0] || ""}
                  onChange={(e) => handleInputPhoneNumber(0, e.target.value)}
                />
                <GoHorizontalRule className="text-3xl font-semibold" />
                <input
                  placeholder="例:918"
                  
                  type="number"
                  className="w-[25%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                  value={phoneNumber[1] || ""}
                  onChange={(e) => handleInputPhoneNumber(1, e.target.value)}
                />
                <GoHorizontalRule className="text-3xl font-semibold" />
                <input
                  placeholder="例:0234"
                  
                  type="number"
                  className="w-[25%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                  value={phoneNumber[2] || ""}
                  onChange={(e) => handleInputPhoneNumber(2, e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
              <NecessaryTag content={"住所"} />
              <div className="flex flex-col sm:w-[445px] gap-8">
                <div className="flex items-center w-full justify-between">
                  <span className="text-[14px] sm:text-[20px]">
                    郵便番号 - 〒
                  </span>
                  <input
                    placeholder="例:818"
                    
                    type="number"
                    className="w-[20%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                    value={postalNumber[0] || ""}
                    onChange={(e) =>
                      handleInputPoastalNumber(0, e.target.value)
                    }
                  />
                  <GoHorizontalRule className="text-3xl font-semibold" />
                  <input
                    placeholder="例:0424"
                    
                    type="number"
                    className="w-[20%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                    value={postalNumber[1] || ""}
                    onChange={(e) =>
                      handleInputPoastalNumber(1, e.target.value)
                    }
                  />
                </div>

                <div className=" flex items-center justify-between w-full">
                  <p className="text-[20px] ">都道府県</p>
                  <select
                    className="border-[1px] focus:outline-none focus:border-blue-500 p-1 rounded-md border-black w-[272px]"
                    onChange={(event) => setProvince(event.target.value)}
                    
                    defaultValue={province}
                  >
                    <option className="text-[16px]" value="">
                      &nbsp;
                    </option>
                    {PROVINCE.map((province, index) => (
                      <option className="text-[16px]" key={index} value={province}>
                        &nbsp;{province}
                      </option>
                    ))}
                  </select>
                </div>

                <div className=" flex items-center justify-between w-full">
                  <p className="text-[20px] ">市区町村</p>
                  <input
                    placeholder="例:町名番地"
                    
                    type="text"
                    className="border-[1px] focus:outline-none focus:border-blue-500 p-1 rounded-md border-black w-[272px]"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className=" flex items-center justify-between w-full pb-[30px]">
                  <p className="text-[20px] ">町名番地</p>
                  <input
                    placeholder="例:6 Chome-19-19 Futsukaichikita"
                    
                    type="text"
                    className="border-[1px] focus:outline-none focus:border-blue-500 p-1 rounded-md border-black w-[272px]"
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {
              isShow === "true" ? (<div className=" lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">

              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
                <NecessaryTag content={"投稿内容"} />

                <div className="flex">
                  <textarea
                    type="text"
                    className="w-full sm:w-[445px] h-[140px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-[20px] lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
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
              <div className="flex justify-center">
                <ConditionForm onDataArrayFromChild={handleconditionDataArray} />
              </div>
              <p className="text-center pt-[20px] text-[24px] text-yellow-700">{validationMessage}</p>
              <div className="flex justify-center pt-[105px] pb-[170px]">
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
            </div>) :" " 
            }
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAgentPage;
