import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// --- FAQ Data ---
const faqData = [
  {
    question: "What is the minimum age to rent a car from RC Car Rental Services?",
    answer:
      "The minimum age to rent a car from RC Car Rental Services is generally 21 years. Some premium or luxury car categories require renters to be at least 25 years old.",
  },
  {
    question: "Do I need a valid driving license to rent a car from RC Car Rental Services?",
    answer:
      "Yes, a valid driving license is mandatory to rent and drive any car from RC Car Rental Services. You must present it during the rental process.",
  },
  {
    question: "What documents are required to rent a car from RC Car Rental Services as a foreigner?",
    answer:
      "Foreign customers need to provide a valid passport, visa, an International Driving Permit (IDP) with their original driving license from their home country, and a credit card for the security deposit.",
  },
  {
    question: "Who is responsible for traffic violations during the car rental period?",
    answer:
      "The renter is fully responsible for any traffic violations such as speeding or illegal parking. Any fines or penalties will be charged against the security deposit or billed separately.",
  },
  {
    question: "Can I rent a car with an international driving license from RC Car Rental Services?",
    answer:
      "Yes, you can rent a car with an international driving license. It is recommended to carry your original license along with an International Driving Permit (IDP) for easier verification.",
  },
  {
    question: "How does renting a car from RC Car Rental Services compare with taking taxis or cabs?",
    answer:
      "Renting a car offers you more control over your travel itinerary, privacy, and flexibility, especially for multi-stop journeys. Taxis and cabs provide convenience but may be less flexible for extensive travel plans.",
  },
  {
    question: "What are the top transport options recommended by RC Car Rental Services for tourists and locals?",
    answer:
      "We recommend self-drive car rentals for tourists seeking freedom to explore at their own pace. Locals often combine self-drive with public transport and ride-sharing based on their travel needs.",
  },
  {
    question: "Is renting a car from RC Car Rental Services a better option than local transport for exploring India?",
    answer:
      "Yes, renting a car provides easier access to remote or off-beat destinations and flexibility in travel timing, which local public transport may not always offer.",
  },
  {
    question: "How do fuel and rental costs for RC Car Rental Services compare with ride-sharing fares?",
    answer:
      "For short trips, ride-sharing can be economical. For longer trips or multiple stops, renting a car is often more cost-effective, especially when considering fuel efficiency and rental rates.",
  },
  {
    question: "Which transport option is the most affordable according to RC Car Rental Services?",
    answer:
      "Public transport like trains and long-distance buses remain the cheapest. For city travel, ride-sharing is economical. Self-drive rentals are cost-efficient for groups or long-term travel plans.",
  },
];


// --- FAQ Item Component ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button
        className="flex justify-between items-center w-full px-3 py-1 text-md font-semibold text-left text-gray-800 bg-white hover:bg-gray-50 focus:outline-none transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all bg-primary-50 duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-4 text-gray-600 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main FAQ Section Component ---
const FAQSection = () => {
  return (
    <section className="py-20 bg-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-sub mb-2">
            Got Questions?
          </h2>
          <h1 className="text-4xl font-extrabold text-text-heading mb-4">
            Planning Your Car Rental? Check Our FAQs
          </h1>
          <p className="text-text-sub text-lg max-w-2xl mx-auto">
            Find quick answers to the most common questions about self-drive car rentals in India.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>

        {/* New CTA Section for unlisted questions */}
        <div className="text-center mt-16 p-8 bg-primary-700 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-text-light mb-4">
            Still Have Questions?
          </h3>
          <p className="text-text-light mb-6 max-w-xl mx-auto">
            If you couldn't find the answer you were looking for, please don't hesitate to reach out to our friendly support team. We're here to help!
          </p>
          <a
            href="/contact" // Link to your contact page
            className="inline-block px-8 py-3 bg-primary-50 text-text-heading font-semibold rounded-full shadow-md hover:bg-primary-100/90 transition transform hover:scale-[1.02]"
          >
            Ask your Question
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;