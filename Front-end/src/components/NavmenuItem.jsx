import react from "react";

const NavmenuItem = (props) => {
  const menuText = props.menuText;
  return (
    <div className="flex justify-start items-center w-[350px] h-[50px] mt-3 bg-[#F1F1F1] rounded-lg border-2 border-black/70">
      <span className="text-2xl text-bold">{menuText}</span>
    </div>
  );
};

export default NavmenuItem;
