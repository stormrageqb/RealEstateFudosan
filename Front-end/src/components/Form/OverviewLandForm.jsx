import React, { useState, useEffect } from "react";
import NecessaryTag from "../NecessaryTag";

export default function OverviewLandForm(props) {
  const [budget, setBudget] = useState("");
  const [landarea, setLandarea] = useState("");
  const [buildingCoverageRatio, setBuildingCoverageRatio] = useState("");
  const [floorAreaRatio, setFloorAreaRatio] = useState("");
  const [structure, setStructure] = useState("");

  useEffect(() => {
    const overviewHouseDataArray = {
      budget: budget,
      landarea: landarea,
      buildingCoverageRatio: buildingCoverageRatio,
      floorAreaRatio: floorAreaRatio,
      structure: structure,
    };
    props.onDataArrayFromChild(overviewHouseDataArray);
  }, [budget, landarea, buildingCoverageRatio, floorAreaRatio, structure]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start w-[90%] sm:w-[445px] lg:w-full">
      <NecessaryTag content={"物件概要"} />
      <div className="flex flex-col sm:w-[445px] gap-8">
        <div className="flex justify-between w-full">
          <span className="text-base sm:text-[20px]">希望価格</span>
          <input
            type="number"
            placeholder="万円"
            className="w-[200px] sm:w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-base sm:text-[20px]">土地面積</span>
          <input
            type="number"
            placeholder="m²"
            className="w-[200px] sm:w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setLandarea(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-base sm:text-[20px]">乾閉率</span>
          <input
            type="number"
            placeholder="%"
            className="w-[200px] sm:w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setBuildingCoverageRatio(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-base sm:text-[20px]">容積率</span>
          <input
            type="number"
            placeholder="%"
            className="w-[200px] sm:w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setFloorAreaRatio(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full">
          <span className="text-base sm:text-[20px]">構造</span>
          <input
            type="text"
            placeholder="木造平屋"
            className="w-[200px] sm:w-[280px] border-[1px] focus:outline-none focus:border-blue-500 p-1 border-black rounded-md"
            onChange={(e) => setStructure(e.target.value)}
          />
        </div>
      </div>

      {/* <div className=" w-[803px]  flex gap-[124px] pt-[14px] justify-end">
        <div className="flex flex-col sm:w-[445px] gap-8">
          <span className="text-[14px] ">
            よく分からないところや、サイトに表示させたくない項目は空欄でも構いません
          </span>
        </div>
      </div> */}
    </div>
  );
}
