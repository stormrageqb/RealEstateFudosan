import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import Carousel from '../components/Carousel'
import FeedbackCarousel from '../components/FeedbackCarousel';
const myArray = [
    require("../assets/img/carousel/2.jpg"),
    require("../assets/img/carousel/1.jpg"),
    require("../assets/img/carousel/3.jpg"),
    require("../assets/img/carousel/4.jpg"),
    require("../assets/img/carousel/5.jpg"),
];
const feedback = 
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
    }
const FeedbackDetailPage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const index = searchParams.get('index')
    const {name, address, images, shortComment, fullComment, category} = feedback;

  return (
    <div className='flex flex-col items-center mt-[40px] mb-[80px]'>
        <div>
            {category === 'bought' && <p className='text-[32px] text-center font-medium'>売主さんへの手紙</p>}
            {category === 'sold' && <p className='text-[32px] text-center font-medium'>売りました体験談</p>}
        </div>
        <div className='w-[1300px] pt-[72px] flex items-center justify-between'>
            {category === 'bought' && <p className='text-[32px]'>あれから、こんな風に使ってます</p>}
            <p className='text-[20px]'><pre>{name} さん   {address}</pre></p>
        </div>
        <div className='pt-[28px] mb-10 w-full'>
            <FeedbackCarousel images = {images}/>
        </div>
        <div className='flex flex-col items-center w-[1300px] mt-[100px]'>
            <p className='w-[90%] p-2 mb-10 text-xl font-medium'>{shortComment}</p>
            <p className='text-[16px] font-normal border-2 border-black/40 p-2 mt-[40px]'>{fullComment}</p>
            <button className='bg-[#2A6484] text-[24px] text-white px-[42px] py-[25px] mt-[80px] rounded-xl'>売りたい物件を掲示板に載せる</button>
        </div>
    </div>
  )
}

export default FeedbackDetailPage;