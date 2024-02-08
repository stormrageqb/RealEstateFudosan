import { React } from 'react';
import RealEstateSmallCard from '../../components/RealEstateSmallCard';
import { useHistory } from 'react-router-dom'

const DashboardRealEstatePostBoard = ( props ) => {
 
    const history = useHistory();
    const realEstates = props.realEstates;
    const handleRealEstateCardClicked = (props) => {
        const realEstateId = props;
        const searchParams = new URLSearchParams();
        searchParams.set('realEstateId', realEstateId);
        history.push(`/item-detail?${searchParams.toString()}`);
    };

    const handleShowMoreButtonClicked = () => {
        history.push('item-board')
    }


    return(
        <div className='flex flex-col items-center w-full'>
            <div className=' text-center text-[40px] noto-medium mt-5'>売ります掲示板</div>
            <div className={` grid gap-x-8 gap-y-12 mt-5 mx-auto box-border max-w-[1100px]
            ${realEstates.length === 1 ? 'grid-cols-1' : realEstates.length === 2 ? 'grid-cols-2' : realEstates.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {
                    realEstates.map((realEstate, index) => {
                        return(
                            <div onClick={() => handleRealEstateCardClicked(realEstate._id) } key = {index} className='cursor-pointer'>
                                <RealEstateSmallCard  realEstate = {realEstate}/>
                            </div>
                        );
                    })
                }
            </div>
            <div className=' w-[200px] bg-[#2A6484] font-semibold text-white text-center py-[12px] mt-20 rounded-xl cursor-pointer' onClick={handleShowMoreButtonClicked}>もっと見る</div>
        </div>
    );
}

export default DashboardRealEstatePostBoard;