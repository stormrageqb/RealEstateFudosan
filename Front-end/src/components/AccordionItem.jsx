import { useRef } from "react";

const AccordionItem = (props) => {
    const contentEl = useRef();
    const { handleToggle, active, faq } = props;
    const { header, id, text } = faq;

    return (
        <div className="rc-accordion-card">
                <div className={`rc-accordion-toggle flex items-center justify-between bg-[#ebedf0] pl-3 pr-8 py-4 relative transition-all duration-300 cursor-pointer ${active === id ? 'active border-b-2 border-b-black/50 bg-[#ebedf0]/80' : '  border-2 border-white'}`} onClick={() => handleToggle(id)}>
                    <p className='text-[28px] font-mono italic font-semibold' >Q</p>
                    <h5 className=" absolute left-20 leading-5 max-w-[80%] text-[16px] font-semibold transition-all duration-300">{header}</h5>
                    <i className=" fa fa-chevron-down rc-accordion-icon"></i>
                </div>
            <div ref={contentEl} className={`rc-collapse ${active === id ? 'show' : ''}`} style={
                active === id
                    ? { height: contentEl.current.scrollHeight }
                    : { height: "0px" }
            }>
                <div className="rc-accordion-body">
                    <p className='mb-0 mt-1 mx-2 leading-normal text-sm font-normal'>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default AccordionItem;
