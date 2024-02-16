import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

import FeedbackCard from '../../components/FeedbackCard';

const myArray = [
    require("../../assets/img/carousel/2.jpg"),
    require("../../assets/img/carousel/1.jpg"),
    require("../../assets/img/carousel/3.jpg"),
    require("../../assets/img/carousel/4.jpg"),
    require("../../assets/img/carousel/5.jpg"),
];
const feedbackBought = [
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
category: 'bought',
    },
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
category: 'bought',
    },
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
category: 'bought',
    },
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
category: 'bought',
    },
]

const feedbackSold =[
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
        category: 'sold',
    },
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
        category: 'sold',
    },
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
category: 'sold',
    },
    {
        name: 'Sasuke',
        address: 'Lasbegas,US',
        images : myArray,
        shortComment : `テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト
        テキスト テキスト テキスト テキスト`,
        fullComment : `テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト
テキスト テキスト テキスト テキスト`,
category: 'sold',
    },
]

const DashboardFeedbackBoard = () => {

    const history = useHistory();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleCardClicked = (props) => {
        const queryParams = new URLSearchParams();
        queryParams.set('index', props);
        const index = props;
        history.push(`/feedback-detail?${queryParams.toString()}`);
    }
    const handleViewMoreClicked = (props) => {
        const queryParams = new URLSearchParams();
        queryParams.set('category',props);
        history.push(`/feedback-board?${queryParams.toString()}`);
    }
    
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (
        <div className='w-full py-20'>
            <div className='text-center text-[32px] font-semibold'>みんなの感想文</div>
            <div className='flex flex-col gap-5 mx-auto mt-7 max-w-[600px] lg:max-w-[900px] xl:max-w-[1100px]'>
                <div className='hidden sm:flex justify-between text-[16px] font-normal px-[10px]'>
                    <span className='font-medium'>売りました体験談</span>
                    <span className='text-[20px] font-medium cursor-pointer border-b-2 border-b-black' onClick={() => handleViewMoreClicked('sold')}>もっと見る<div className = 'pl-2 fa-solid fa-arrow-right'></div></span>
                </div>
                <div className='sm:hidden flex flex-col justify-center items-center text-[20px] font-normal px-[10px]'>
                    <span className='font-medium pb-4'>売りました体験談</span>
                    <span className='font-medium cursor-pointer border-b-2 border-b-black' onClick={() => handleViewMoreClicked('sold')}>もっと見る<div className = 'pl-2 fa-solid fa-arrow-right'></div></span>
                </div>
                <div className='grid gap-x-8 gap-y-12 mt-5 mx-auto box-border max-w-[1100px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {
                        feedbackSold.map((feedback, index) => {
                            if(isSmallScreen && index > 1) {
                                return null;
                            }
                            return(
                                <div className='cursor-pointer md:last:block lg:last:hidden xl:last:block' key={index}  onClick={() => handleCardClicked(index)}>
                                    <FeedbackCard feedback = {feedback}/>
                                </div>  
                            );
                        })
                    }
                </div>
                <div className='hidden sm:flex justify-between text-[16px] font-normal px-[10px] mt-[30px]'>
                    <span className='font-medium'>こんな風に使ってます</span>
                    <span className='text-[20px] font-medium cursor-pointer border-b-2 border-b-black' onClick={() => handleViewMoreClicked('bought')}>もっと見る<div className = 'pl-2 fa-solid fa-arrow-right'></div></span>
                </div>
                <div className='sm:hidden flex flex-col justify-center items-center text-[20px] font-normal px-[10px] mt-[30px]'>
                    <span className='font-medium pb-4'>こんな風に使ってます</span>
                    <span className='font-medium cursor-pointer border-b-2 border-b-black' onClick={() => handleViewMoreClicked('bought')}>もっと見る<div className = 'pl-2 fa-solid fa-arrow-right'></div></span>
                </div>
                <div className='grid gap-x-8 gap-y-12 mt-5 mx-auto box-border max-w-[1100px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {
                        feedbackBought.map((feedback, index) => {
                            if(isSmallScreen && index > 1) {
                                return null;
                            }
                            return(
                                <div className='cursor-pointer md:last:block lg:last:hidden xl:last:block' key={index} onClick={() => handleCardClicked(index)}>
                                    <FeedbackCard feedback = {feedback}/>
                                </div> 
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default DashboardFeedbackBoard;