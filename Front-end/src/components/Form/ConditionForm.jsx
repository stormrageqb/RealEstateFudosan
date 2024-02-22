import React, { useState, useEffect } from "react";
import NecessaryTag from "../NecessaryTag";

export default function ConditionForm({ content, onDataArrayFromChild }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    // Update the state to toggle the checked state
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    onDataArrayFromChild(isChecked);
  }, [isChecked]);
  return (
    <div className="flex flex-col w-full sm:w-[500px] md:w-[600px]  bg-[#D9D9D9]/40 pt-4 pb-3">
      <div className="flex justify-start pl-6 pb-2">
        <NecessaryTag />
        <p className="hidden sm:block pl-6">以下の同意事項をご確認ください。</p>
      </div>
      <p className="block sm:hidden text-center text-sm pb-2">以下の同意事項をご確認ください。</p>
      {/* <p className="pl-[35px] pt-[19px] pb-[6px]">同意事項</p> */}
      <p className="w-[90%] mx-auto text-sm">
        テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
      </p>
      <div className="flex pl-2 sm:pl-10 pt-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p className="text-xs sm:text-[14px] pl-1 sm:pl-[5px]">
          上記規約・個人情報の取扱いについて同意します。
        </p>
      </div>
    </div>
  );
}
