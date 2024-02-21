import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import NecessaryTag from "../NecessaryTag";
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

export default function PrivacyForm(props) {
  const [cookies, setCookie] = useCookies();
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [street, setStreet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [postalNumber, setPostalNumber] = useState([]);
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [firstNameGana, setFirstNameGana] = useState("");
  const [lastNameGana, setLastNameGana] = useState("");
  const [firstNameGanji, setFirstNameGanji] = useState("");
  const [lastNameGanji, setLastNameGanji] = useState("");

  useEffect(() => {
    const privacyDataArray = {
      province: province,
      city: city,
      buildingName: buildingName,
      street: street,
      phoneNumber: phoneNumber,
      postalNumber: postalNumber,
      email: email,
      age: age,
      firstNameGana: firstNameGana,
      lastNameGana: lastNameGana,
      firstNameGanji: firstNameGanji,
      lastNameGanji: lastNameGanji,
    };

    props.onDataArrayFromChild(privacyDataArray);
  }, [
    province,
    city,
    buildingName,
    street,
    phoneNumber,
    postalNumber,
    email,
    age,
    firstNameGana,
    firstNameGanji,
    lastNameGana,
    lastNameGanji,
  ]);

  useEffect(() => {
    const func = async () => {
      if (cookies.user && cookies.user._id) {
        const newId = cookies.user._id;
        const response = await axios.get("/getUser", {
          params: { _id: newId },
        });

        setEmail(response.data[0].email);
        setFirstNameGana(response.data[0].name.firstNameGana);
        setLastNameGana(response.data[0].name.lastNameGana);
        setFirstNameGanji(response.data[0].name.firstNameGanji);
        setLastNameGanji(response.data[0].name.lastNameGanji);
      }
    };
    func();
  }, [cookies.user]);

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

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
        <NecessaryTag content={"担当者名"} />

        <div className="flex justify-between w-full sm:w-[445px]">
          <div className="flex flex-col gap-2 sm:gap-4 w-[45%]">
            <div className="flex justify-between w-full">
              <span>(姓)</span>
              <input
                placeholder="例:下保木"
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
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
        <NecessaryTag content={"年齢"} />
        <div>
          <input
            placeholder="例:35"
            required={true}
            type="number"
            className="w-full sm:w-[445px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
        <NecessaryTag content={"メール"} />

        <input
          placeholder="例:hoshi@gmail.com"
          required={true}
          value={email}
          type="text"
          className="w-full sm:w-[445px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
        <NecessaryTag content={"電話番号"} />
        <div className="flex items-center w-full justify-between sm:w-[445px]">
          <input
            placeholder="例:092"
            required={true}
            type="number"
            className="w-[25%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            value={phoneNumber[0] || ""}
            onChange={(e) => handleInputPhoneNumber(0, e.target.value)}
          />
          <GoHorizontalRule className="text-3xl font-semibold" />
          <input
            placeholder="例:918"
            required={true}
            type="number"
            className="w-[25%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            value={phoneNumber[1] || ""}
            onChange={(e) => handleInputPhoneNumber(1, e.target.value)}
          />
          <GoHorizontalRule className="text-3xl font-semibold" />
          <input
            placeholder="例:0234"
            required={true}
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
            <span className="text-[14px] sm:text-[20px]">郵便番号 - 〒</span>
            <input
              placeholder="例:818"
              required={true}
              type="number"
              className="w-[20%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
              value={postalNumber[0] || ""}
              onChange={(e) => handleInputPoastalNumber(0, e.target.value)}
            />
            <GoHorizontalRule className="text-3xl font-semibold" />
            <input
              placeholder="例:0424"
              required={true}
              type="number"
              className="w-[20%] sm:w-[99px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
              value={postalNumber[1] || ""}
              onChange={(e) => handleInputPoastalNumber(1, e.target.value)}
            />
          </div>

          <div className=" flex items-center justify-between w-full">
            <p className="text-[20px] ">都道府県</p>
            <select
              className="border-[1px] focus:outline-none focus:border-blue-500 p-1 rounded-md border-black w-[272px]"
              onChange={(event) => setProvince(event.target.value)}
              required={true}
              defaultValue={province}
            >
              <option className="text-[16px]" value="">
                &nbsp;
              </option>
              {PROVINCE.map((province, index) => (
                <option className="text-[16px]" value={province}>
                  &nbsp;{province}
                </option>
              ))}
            </select>
          </div>

          <div className=" flex items-center justify-between w-full">
            <p className="text-[20px] ">市区町村</p>
            <input
              placeholder="例:町名番地"
              required={true}
              type="text"
              className="border-[1px] focus:outline-none focus:border-blue-500 p-1 rounded-md border-black w-[272px]"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className=" flex items-center justify-between w-full">
            <p className="text-[20px] ">町名番地</p>
            <input
              placeholder="例:6 Chome-19-19 Futsukaichikita"
              required={true}
              type="text"
              className="border-[1px] focus:outline-none focus:border-blue-500 p-1 rounded-md border-black w-[272px]"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className=" w-[745px] flex flex-col pt-[24px] text-[20px]">
        <p>物件の住所を記入してください。</p>
        <p>※ ご自分の住所の記入欄ではありません</p>
        <p>※ この住所がそのままサイトに掲載されてしまうことはありません </p>
      </div>
    </>
  );
}
