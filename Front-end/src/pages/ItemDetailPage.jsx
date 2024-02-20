import React from "react";
import { useState, useEffect } from "react";
import {
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import Carousel from "../components/Carousel";
import GoogleMapComponent from "../components/GoogleMapComponent";
import BasicTableBuilding from "../components/BasicTableBuilding";
import BasicTableLand from "../components/BasicTableLand";
import FavouriteButton from "../components/FavouriteButton";
import { useCookies } from "react-cookie";
import Loading from "../components/Loading";
import FavouriteSetLoginModal from "../components/FavouriteSetLoginModal";

const ItemDetailPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [cookies, setCookie] = useCookies();

  const [user, setUser] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [myId, setMyId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [favouriteButtonActive, setFavouriteButtonActive] =
    useState(isFavourite);
  const [realEstate, setRealEstate] = useState(null);
  const [favouriteButtonDisable, setFavouriteButtonDisable] = useState(true);

  const [isSmall, setIsSmall] = useState();
  const [tableWidth, setTableWidth] = useState();
  const [tableFontSize, setTableFontSize] = useState();

  const searchParams = new URLSearchParams(location.search);
  const realEstateId = searchParams.get("realEstateId");

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  },[])

  useEffect(() => {
    if (isSmall) {
      setTableWidth("w-[350px]")
      setTableFontSize('text-[16px]')
    } else {
      setTableWidth("w-[500px]")
      setTableFontSize('text-[24px]')
    }
  })

  useEffect(() => {
    if (cookies.token) {
      const myPosts = cookies.user.myPosts;
      if (myPosts.includes(realEstateId)) {
        setFavouriteButtonDisable(true);
        console.log(myPosts, myPosts.includes(realEstateId));
      } else {
        setFavouriteButtonDisable(false);
      }
    }
  }, [realEstate]);

  useEffect(() => {
    setUser(cookies.user);
  }, [cookies.user]);

  useEffect(() => {
    if (user) {
      setMyId(user._id);
      const temp = user.favourites.includes(realEstateId);
      setIsFavourite(temp);
    }
  }, [user, realEstateId]);

  const handleFavouriteButtonClicked = async () => {
    if (cookies.token) {
      const params = new URLSearchParams({
        realEstateId: realEstateId,
        userId: myId,
      }).toString();
      const myPosts = cookies.user.myPosts;
      if (!myPosts.includes(realEstateId)) {
        if (isFavourite) {
          try {
            const res = await axios.get(`/removeFavourite?${params}`);
            const updatedUser = res.data.updatedUser;
            setCookie("user", updatedUser);
          } catch (error) {
            console.log(error.message);
          }
        } else {
          try {
            const res = await axios.get(`/addFavourite?${params}`);
            const updatedUser = res.data.updatedUser;
            setCookie("user", updatedUser);
          } catch (error) {
            console.log(error.message);
          }
        }
        setFavouriteButtonActive(favouriteButtonActive ? false : true);
      }
    } else {
      setShowModal(true);
    }
  };
  const sendMsgButtonClicked = () => {
    if (cookies.token) {
      if (cookies.user.isAdmin || cookies.user._id === realEstate.poster) {
        const searchParams = new URLSearchParams({
          realEstateId: realEstateId,
        }).toString();
        history.push(`/contact-post?${searchParams}`);
      } else {
        const posterId = realEstate.poster;
        const searchParams = new URLSearchParams();
        searchParams.set("previous-page", "itemDetailPage");
        searchParams.set("realEstateId", realEstateId);
        searchParams.set("opponentId", posterId);
        history.push(`/message-detail?${searchParams.toString()}`);
      }
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          realEstateId: realEstateId,
        }).toString();
        const res = await axios.get(`/getRealEstateById?${params}`);
        setRealEstate(res.data.realEstate);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (realEstate === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  let newAddress = [];
  newAddress.push(`${realEstate.address.province} ${realEstate.address.city}`);

  return (
    <div className=" flex flex-col items-center pb-[120px] pt-[92px] w-full">
      <p className="pb-10 text-3xl text-center font-medium">
        {realEstate.address.province}
        {realEstate.address.city}
      </p>

      <div className="mt-[28px] w-full">
        <Carousel images={realEstate.images} />
      </div>

      <div className="flex flex-col items-center w-full mx-auto">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center w-full sm:gap-4 md:gap-16 lg:gap-32  xl:gap-80 my-20">
          <div className="w-[350px] h-[250px] sm:h-[360px] sm:w-[500px] md:w-[360px] xl:w-[400px] border-2 border-black">
            <GoogleMapComponent newAddress={newAddress} zoom={10} />
          </div>
          {realEstate.label === "building" && (
            <BasicTableBuilding
              tableData={realEstate.basicInfoBuilding}
              fontSize={tableFontSize}
              width={tableWidth}
            />
          )}
          {realEstate.label === "land" && (
            <BasicTableLand
              tableData={realEstate.basicInfoLand}
              fontSize={tableFontSize}
              width={tableWidth}
            />
          )}
        </div>
        <div className="w-[60%] text-xl text-center font-normal">
          {realEstate.briefDescription}
        </div>
        <div className="w-[80%] border-2 border-black/50 p-3 text-base font-normal mt-14">
          {realEstate.fullDescription}
        </div>

        <div className="flex flex-col gap-5 items-center sm:flex-row sm:justify-center sm:gap-[50px] w-full mt-20">
          <div
            className="flex justify-center items-center w-[280px] h-[60px] lg:w-[380px] lg:h-[80px] bg-[#2A6484] rounded-xl font-medium text-white text-[24px] cursor-pointer"
            onClick={sendMsgButtonClicked}
          >
            メッセージを送信する
          </div>

          <button
            disabled={favouriteButtonDisable}
            onClick={handleFavouriteButtonClicked}
          >
            <FavouriteButton
              parentComponent="realEstateDetailPage"
              isFavourite={isFavourite}
            />
          </button>
          {showModal === true && (
            <FavouriteSetLoginModal setShowModal={setShowModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
