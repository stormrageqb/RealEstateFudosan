import react, { useEffect, useRef, useState } from "react";
import NavmenuItem from "./NavmenuItem";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePostAdd } from "react-icons/md";
import { BsHouses } from "react-icons/bs";
import { GiIsland } from "react-icons/gi";
import { GrUserExpert } from "react-icons/gr";
import { SlMagnifier } from "react-icons/sl";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { RiMessage3Line } from "react-icons/ri";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { MdOutlineContactPhone } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa6";
import { BsHouseCheckFill } from "react-icons/bs";
import { BsHouseExclamationFill } from "react-icons/bs";

import { actions } from "../redux/slices/navbarToggle";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCookies } from "react-cookie";

const Navmenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies();
  const buildingSearchParams = new URLSearchParams({
    label: "post-building",
  }).toString();
  const landSearchParams = new URLSearchParams({
    label: "post-land",
  }).toString();
  const navbarRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useSelector((state) => state.navbarToggle.isOpen);

  const handleDocumentClicked = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      dispatch(actions.hideNavbar());
    }
  };

  const handleLogout = () => {
    setCookie("token", null);
    setCookie("user", null);
    setIsLoggedIn(false);
    history.push("/");
  };

  useEffect(() => {
    if (cookies.token) {
      setIsLoggedIn(true);
      setIsAdmin(cookies.user.isAdmin);
    } else {
      setIsLoggedIn(false);
    }
    document.addEventListener("mousedown", handleDocumentClicked);
    setIsOpen(isOpenRef);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClicked);
    };
  }, [cookies.token]);

  return (
    <>
      <div
        ref={navbarRef}
        className={`fixed top-0 left-0 flex flex-col w-[40%] items-start gap-4 pl-4 h-screen pt-20 bg-white z-[50000] transition-all duration-[3000] ease-in-out `}
      >
        <Link to={"/"}>
          <div className="flex justify-start items-center gap-4 pl-1 text-lg font-semibold cursor-pointer">
            <RxDashboard />
            <span className="text-lg font-semibold">ホームページ</span>
          </div>
        </Link>

        {!isAdmin && (
          <>
            <div className="flex justify-start items-center gap-4 font-semibold text-2xl">
              <MdOutlinePostAdd />
              <span className="text-lg font-semnibold">掲示板に投稿</span>
            </div>

            <div className="flex flex-col items-start pl-3 gap-2">
              <Link to={`/post-realestate?${buildingSearchParams}`}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <BsHouses />
                  <span className="text-base font-medium">建物を投稿する</span>
                </div>
              </Link>
              <Link to={`/post-realestate?${landSearchParams}`}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <GiIsland />
                  <span className="text-base font-medium">土地を投稿する</span>
                </div>
              </Link>

              <Link to={"/post-agent"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <FaUserTie />
                  <span className="text-base font-medium">
                    エージェントの投稿
                  </span>
                </div>
              </Link>
            </div>
          </>
        )}

        <Link to={"/item-board"}>
          <div className="flex justify-start items-center gap-4 font-semibold text-lg">
            <SlMagnifier />
            <span className="text-lg font-semibold">掲示板を見る</span>
          </div>
        </Link>

        {!isLoggedIn && (
          <Link to={"/login"}>
            <div className="flex justify-start items-center gap-4 font-semibold text-lg">
              <GrUserExpert />
              <span className="text-lg font-semibold">ログイン</span>
            </div>
          </Link>
        )}

        {!isAdmin && isLoggedIn && (
          <>
            <div className="flex justify-start items-center gap-4 font-semibold text-2xl">
              <FaUserLarge />
              <span className="text-lg font-semnibold">マイページ</span>
            </div>

            <div className="flex flex-col items-start pl-3 gap-2">
              <Link to={"message-board"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <RiMessage3Line />
                  <span className="text-base font-medium">メッセージ</span>
                </div>
              </Link>
              <Link to={"my-post"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <MdOutlineRealEstateAgent />
                  <span className="text-base font-medium">私の投稿</span>
                </div>
              </Link>
              <Link to={"/favourite"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <FaRegStar />
                  <span className="text-base font-medium">お気に入り</span>
                </div>
              </Link>
              <Link to={"/contact-general"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <MdOutlineContactPhone />
                  <span className="text-base font-medium">総合窓口</span>
                </div>
              </Link>
              <Link>
                <div
                  className="flex justify-start items-center gap-4 pl-1 text-base font-semibold"
                  onClick={handleLogout}
                >
                  <RiLogoutBoxRLine />
                  <span className="text-base font-medium">ログアウト</span>
                </div>
              </Link>
            </div>
          </>
        )}

        {isAdmin && isLoggedIn && (
          <>
            <div className="flex justify-start items-center gap-4 font-semibold text-2xl">
              <GrUserAdmin />
              <span className="text-lg font-semnibold">管理者</span>
            </div>

            <div className="flex flex-col items-start pl-3 gap-2">
              <Link to={"admin-view-agent"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <RiUserFollowLine />
                  <span className="text-base font-medium">エージェントを投稿</span>
                </div>
              </Link>
              <Link to={"admin-approve-realestate-list"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <BsHouseCheckFill />
                  <span className="text-base font-medium">不動産を投稿</span>
                </div>
              </Link>
              <Link to={"/admin-general-contact-board"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <FaRegStar />
                  <span className="text-base font-medium">総合窓口</span>
                </div>
              </Link>
              <Link to={"/admin-post-contact-board"}>
                <div className="flex justify-start items-center gap-4 pl-1 text-base font-semibold">
                  <BsHouseExclamationFill />
                  <span className="text-base font-medium">掲載問い合わせ</span>
                </div>
              </Link>
              <Link>
                <div
                  className="flex justify-start items-center gap-4 pl-1 text-base font-semibold"
                  onClick={handleLogout}
                >
                  <RiLogoutBoxRLine />
                  <span className="text-base font-medium">ログアウト</span>
                </div>
              </Link>
            </div>
          </>
        )}

        <Link to={"/faq"}>
          <div className="flex justify-start items-center gap-4 font-semibold text-lg">
            <FaQuestionCircle />
            <span className="text-lg font-semibold">よくある質問</span>
          </div>
        </Link>
      </div>
      <label
        className={`bg-black fixed inset-0 z-[40000] transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-75" : "opacity-0"
        }`}
      ></label>
    </>
  );
};

export default Navmenu;
