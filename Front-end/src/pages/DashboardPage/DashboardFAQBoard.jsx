import { React, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AccordionItem from '../../components/AccordionItem';

const faqs = [
    {
        id: 1,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 2,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト `
    },
    {
        id: 3,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
        テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 4,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 5,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 6,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 7,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 8,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 9,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 10,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 11,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
    {
        id: 12,
        header: "テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト?",
        text: `テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト
テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキストテキスト テキスト テキスト テキスト テキスト テキスト テキスト テキスト`
    },
]

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
            <div className='flex flex-col gap-2 w-[60%]'>
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