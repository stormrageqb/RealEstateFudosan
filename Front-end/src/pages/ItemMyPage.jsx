import React, { useEffect, useState } from "react";
import RealEstateBigCard from "../components/RealEstateBigCard";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../components/Loading";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import RealEstateSmallCard from "../components/RealEstateSmallCard";

const ItemMyPage = () => {
  const history = useHistory();
  const [cookies, setCookie] = useCookies();
  const user = cookies.user;
  const myId = user._id;
  const [realEstates, setRealEstates] = useState(null);
  const [windowWidthLabel, setWindowWidthLabel] = useState();

  const fetchData = async () => {
    const params = new URLSearchParams({ posterId: myId }).toString();
    try {
      const res = await axios.get(`/getRealEstatesByPosterId?${params}`);
      setRealEstates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToContactPostPage = (_id) => {
    const searchParams = new URLSearchParams();
    searchParams.set("realEstateId", _id);
    history.push(`/contact-post?${searchParams.toString()}`);
  };

  useEffect(() => {
    fetchData();
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

  if (realEstates === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-[500px]">
        <p className="text-[40px] py-[60px]">私の投稿</p>
        {realEstates.length === 0 && (
          <div className="font-medium text-3xl mt-[50px]">
            まだ投稿がありません
          </div>
        )}
        <div className="hidden lg:flex flex-col items-center">
          {realEstates.map((realEstate, index) => {
            return (
              <RealEstateBigCard
                key={index}
                realEstate={realEstate}
                parentComponent="ItemMyPage"
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
                onClick={() => handleNavigateToContactPostPage(realEstate._id)}
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

export default ItemMyPage;
