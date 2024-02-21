import React, { useState, useEffect } from "react";
import NecessaryTag from "../NecessaryTag";

export default function OverviewHouseForm(props) {
  const [budget, setBudget] = useState("");
  const [layout, setLayout] = useState("");
  const [landarea, setLandarea] = useState("");
  const [buildingarea, setBuildingarea] = useState("");
  const [deadline, setDeadline] = useState("");
  const [parking, setParking] = useState("");

  useEffect(() => {
    const overviewHouseDataArray = {
      budget: budget,
      layout: layout,
      landarea: landarea,
      buildingarea: buildingarea,
      deadline: deadline,
      parking: parking,
    };
    props.onDataArrayFromChild(overviewHouseDataArray);
  }, [budget, layout, landarea, buildingarea, deadline, parking]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
      <NecessaryTag content={"物件概要"} />
      <div className="flex flex-col sm:w-[445px] gap-8">
        <div className="flex justify-between w-full">
          <span className="text-[20px]">希望価格</span>
          <input
            type="number"
            placeholder="万円"
            className="w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-[20px]">間取り</span>
          <input
            type="text"
            placeholder="4LDK"
            className="w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setLayout(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-[20px]">土地面積</span>
          <input
            type="number"
            placeholder="m²"
            className="w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setLandarea(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-[20px]">建物面積</span>
          <input
            type="number"
            placeholder="m²"
            className="w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setBuildingarea(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-[20px]">入居日付</span>
          <input
            type="text"
            className="w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-[20px]">駐車場</span>
          <input
            type="text"
            placeholder=""
            className="w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setParking(e.target.value)}
          />
        </div>
        <span className="text-[14px] ">
          よく分からないところや、サイトに表示させたくない項目は空欄でも構いません
        </span>
      </div>
    </div>
  );
}
