import react from "react";

const NecessaryTag = (props) => {
  const content = props.content;
  return (
    <div className="flex justify-start">
      <span className="bg-[#F69191] h-[28px] flex items-center p-2 rounded-md text-[15px] text-white">
        必須
      </span>
      <p className="text-[20px] pl-[35px]">{content}</p>
    </div>
  );
};

export default NecessaryTag;
