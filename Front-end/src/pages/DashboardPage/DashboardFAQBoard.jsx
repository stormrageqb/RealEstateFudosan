import { React, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AccordionItem from '../../components/AccordionItem';
import faqs from "../../components/faqs"

const DashboardFAQPage = () => {
    const history = useHistory();
    const [active, setActive] = useState(null);

    const handleToggle = (index) => {
        if (active === index) {
            setActive(null);
        } else {
            setActive(index);
        }
    }
    const handleViewMoreClicked = () => {
        history.push('/faq');
    }

    return (
        <div className=' flex flex-col items-center justify-center w-full mt-20 py-20 bg-[#32769b]'>
            <div className='mt-10 mb-20 text-4xl text-white font-medium'>よくある質問</div>
            <div className='flex flex-col gap-2 xl:w-[60%] lg:w-[75%] w-[90%]'>
                {faqs.map((faq, index) => {
                    return (
                            <AccordionItem key={index} active={active} handleToggle={handleToggle} faq={faq} />
                            )
                    })
                }
            </div>
            <div className=' w-[200px] bg-white mt-20 py-[12px] rounded-xl border-2 border-[#2A6484] font-semibold text-lg text-[#2A6484] text-center cursor-pointer' onClick={handleViewMoreClicked}>もっと見る</div>
        </div>
    )
}

export default DashboardFAQPage;