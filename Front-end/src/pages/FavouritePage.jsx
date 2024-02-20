import React from "react";
import RealEstateBigCard from "../components/RealEstateBigCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../components/Loading";
import RealEstateSmallCard from "../components/RealEstateSmallCard";

const FavouritePage = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies();
  const user = cookies.user;
  const myId = user._id;
  const favourites = user.favourites;

  const [realEstates, setRealEstates] = useState(null);
  const [windowWidthLabel, setWindowWidthLabel] = useState();

  const fetchFavouriteData = async () => {
    try {
      const payload = {
        favourites: favourites,
      };
      const res = await axios.post("/getRealEstatesByIds", payload);
      setRealEstates(res.data.realEstates);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFavouriteData();
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setWindowWidthLabel("xl");
      }
      if (width >= 976 && width < 1440) {
        setWindowWidthLabel("lg");
      }
      if (width >= 768 && width < 976) {
        setWindowWidthLabel("md");
      }
      if (width >= 640 && width < 768) {
        setWindowWidthLabel("sm");
      }
      if (width < 640) {
        setWindowWidthLabel("xs");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRealEstateBigCardClicked = (props) => {
    const index = props;
    const realEstateId = realEstates[index]._id;
    const searchParams = new URLSearchParams();
    searchParams.set("realEstateId", realEstateId);
    history.push(`/item-detail?${searchParams.toString()}`);
  };

  const handleFavouriteToggle = async (props) => {
    const realEstateId = props.realEstateId;
    const isFavourite = props.isFavourite;
    const params = new URLSearchParams({
      userId: myId,
      realEstateId: realEstateId,
    }).toString();
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
  };

  if (realEstates === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <div className="flex text-[40px] justify-center pb-[80px]">
        <p className="pt-[90px] font-medium">お気に入り</p>
      </div>
      <div className="flex flex-col items-center min-h-[500px]">
        {realEstates.length === 0 && (
          <div className="text-center text-3xl font-medium pt-[150px]">
            お気に入りに追加された不動産はありません。
          </div>
        )}
        <div className="hidden lg:block">
          {realEstates.map((realEstate, index) => {
            return (
              <RealEstateBigCard
                key={index}
                realEstate={realEstate}
                handleFavouriteToggle={handleFavouriteToggle}
                handleRealEstateBigCardClicked={handleRealEstateBigCardClicked}
                index={index}
                parentComponent="FavouritePage"
              />
            );
          })}
        </div>

        <div
          className={`grid lg:hidden gap-x-8 gap-y-12  mt-3 mb-5 mx-auto box-border max-w-[1100px]
                ${
                  (windowWidthLabel === "xl" || windowWidthLabel === "lg") &&
                  realEstates.length > 3
                    ? "grid-cols-4"
                    : windowWidthLabel === "md" && realEstates.length > 2
                    ? "grid-cols-3"
                    : windowWidthLabel === "sm" && realEstates.length > 1
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`}
        >
          {realEstates.map((realEstate, index) => {
            return (
              <div
                key={index}
                onClick={() => handleRealEstateBigCardClicked(index)}
                className="cursor-pointer"
              >
                <RealEstateSmallCard realEstate={realEstate} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FavouritePage;
