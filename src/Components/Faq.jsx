import { use } from "react";
import ZoomInSection from "./ZoomInSection";

const Faq = ({ faqData }) => {
  const faqs = use(faqData);

  return (
    <div className="w-full md:max-w-screen-xl mx-auto px-4 mt-14 md:mt-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center py-5 leading-12 md:leading-14 text-[#242253]">
        Frequently Asked Questions (FAQs)
      </h1>
      {faqs.map((faq, index) => (
        <ZoomInSection key={index}>
          <div className="collapse collapse-plus border border-[#d6d6d6] shadow my-5">
            <input type="radio" name="my-accordion-3" id={`faq-${index}`} />
            <div className="collapse-title text-lg text-gray-800 font-semibold">
              {faq.question}
            </div>
            <div className="collapse-content text-base text-gray-600">
              {faq.answer}
            </div>
          </div>
        </ZoomInSection>
      ))}
    </div>
  );
};

export default Faq;
