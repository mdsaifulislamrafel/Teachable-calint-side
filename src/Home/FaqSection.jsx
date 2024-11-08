import { useState } from "react";
import { Link } from "react-router-dom";

export default function FaqSection() {
  const [isOpen, setIsOpen] = useState(null);

  // FAQ Data Array
  const dataArr = [
    {
      title: "Is there a fee for enrollment?",
      description: "The enrollment fee for each course is specified on our website. Please check the course details for information on fees."
    },
    {
      title: "How does the enrollment process work?",
      description: "Enrolling is very easy. Simply choose the course you want, add it to your cart, and complete the checkout process."
    },
    {
      title: "Is there an option to pay on delivery?",
      description: "Yes, we offer cash on delivery for certain courses. However, this option may be subject to specific conditions."
    },
    {
      title: "When will I get access to my course?",
      description: "You will typically gain access to your course within 3-5 days after enrollment, but this may vary depending on processing time."
    }
  ];

  // Toggle function to open/close accordion
  const toggle = (idx) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-8 lg:px-16">
      {/* FAQ Heading */}
      <div className="flex justify-center">
        <div className="bg-blue-300 rounded-tl-lg rounded-tr-lg py-2 px-6 w-full sm:w-2/3 text-center mb-5">
          <h2 className="text-2xl font-bold">Some questions and answers </h2>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="flex justify-center">
        <div className="bg-blue-200 w-full sm:w-2/3 rounded-lg">
          <div className="p-4 space-y-2">
            {dataArr.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-500/50 py-3 last-of-type:border-b-0">
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full justify-between font-semibold text-black cursor-pointer"
                >
                  <span>{faq.title}</span>
                  <span className="rounded-full p-2">
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen === idx ? "rotate-180" : ""
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen === idx ? "max-h-screen py-2" : "max-h-0"
                    }`}
                >
                  <p className="text-gray-700 text-sm">{faq.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Button */}
      <div className="flex justify-center mt-6">
        <Link to={'/signup'}>
          <button className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-4 sm:px-8 rounded-full flex items-center space-x-2 shadow-lg">
            <span>Sign up for free</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
