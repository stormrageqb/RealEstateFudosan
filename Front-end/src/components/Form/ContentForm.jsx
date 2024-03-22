import React, { useState, useEffect } from "react";
import NecessaryTag from "../NecessaryTag";

export default function ContentForm(props) {
  const [briefDescription, setBriefDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");

  useEffect(() => {
    const contentDataArray = {
      briefDescription: briefDescription,
      fullDescription: fullDescription,
    };
    props.onDataArrayFromChild(contentDataArray);
  }, [briefDescription, fullDescription]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
      <NecessaryTag content={"投稿内容"} />
      <div className="flex flex-col sm:w-[445px] gap-8">
        <p className="text-[20px]">物件のウリとイマイチなところ</p>
        <div className="pt-[13px]">
          <textarea
            
            name="content"
            id=""
            cols="60"
            rows="6"
            className="w-full border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setBriefDescription(e.target.value)}
          ></textarea>
        </div>
        <p className="text-[20px]">これまでの経緯と今の状況</p>
        <div className="pt-[13px]">
          <textarea
            
            name="content"
            id=""
            cols="60"
            rows="12"
            className="w-full border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setFullDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
