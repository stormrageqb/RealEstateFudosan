import React from "react";
import { useState } from "react";
import AccordionItem from "../components/AccordionItem";
import faqs from "../components/faqs"


const FAQPage = () => {
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div className="w-full my-[70px]">
      <p className="mb-[55px] text-[32px] text-center font-normal">
        よくある質問
      </p>
      <div className="flex flex-col w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
        {faqs.map((faq, index) => {
          return (
            <AccordionItem
              key={index}
              active={active}
              handleToggle={handleToggle}
              faq={faq}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FAQPage;
