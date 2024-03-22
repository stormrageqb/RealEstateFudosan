import { React, useEffect, useState } from 'react';
import RealEstateSmallCard from '../../components/RealEstateSmallCard';
import { useHistory } from 'react-router-dom'
import AgentBoard from "../../components/AgentBoard"

const DashboardRealEstatePostBoard = (props) => {

    const history = useHistory();
    const realEstates = props.realEstates;

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isXLarge, setIsXLarge] = useState(false);

    const handleRealEstateCardClicked = (props) => {
        const realEstateId = props;
        const searchParams = new URLSearchParams();
        searchParams.set('realEstateId', realEstateId);
        history.push(`/item-detail?${searchParams.toString()}`);
    };

    const handleShowMoreButtonClicked = () => {
        history.push('item-board')
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
            setIsXLarge(window.innerWidth > 1440);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    return (
        <div className='flex flex-col items-center w-full mt-[-250px]'>
            <div className=' text-center text-[40px] font-medium mt-5'>
                売ります掲示板
            </div>
            <div className='flex justify-center gap-[100px] w-full'>
                <div className='min-h-[400px]'>
                    {
                        realEstates.length === 0 &&
                        <div className='text-center text-3xl pt-[200px]'>
                            現在掲載されている不動産はありません
                        </div>
                    }
                    <div
                        className={` grid gap-x-8 gap-y-12 mt-5 mx-auto box-border max-w-[1100px] xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1
                        ${realEstates.length === 1 ? 'grid-cols-1' : realEstates.length === 2 ? 'grid-cols-2' : realEstates.length === 3 ? 'grid-cols-3' : ''}`}
                    >
                        {
                            realEstates.map((realEstate, index) => {
                                if(isSmallScreen && index > 3) {
                                    return null;
                                }
                                return (
                                    <div
                                        key={index}
                                        className='cursor-pointer'
                                        onClick={() => handleRealEstateCardClicked(realEstate._id)}
                                    >
                                        {
                                            ( isXLarge || index < 8) &&
                                            <RealEstateSmallCard realEstate={realEstate} />
                                        }
                                        
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='mt-[75px]' > 
                    <AgentBoard />
                </div>
                
            </div>
            <div
                className=' w-[200px] bg-[#2A6484] font-semibold text-white text-center py-[12px] mt-20 rounded-xl cursor-pointer'
                onClick={handleShowMoreButtonClicked}
            >
                もっと見る
            </div>
        </div>
    );
}

export default DashboardRealEstatePostBoard;