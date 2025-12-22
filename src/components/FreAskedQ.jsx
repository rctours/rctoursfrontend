import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// --- FAQ Data ---
const faqData = [
  {
    question: "How can I book a taxi in Nagpur?",
    answer:
      "You can book a taxi in Nagpur by calling us directly on 📞 9172271464 or 8446431819. Instant confirmation is provided."
  },
  {
    question: "Do you provide cars with driver in Nagpur?",
    answer:
      "Yes, all our taxi services include a professional and experienced driver. We do not offer self-drive cars."
  },
  {
    question: "What types of taxi services do you offer?",
    answer:
      "We provide local taxi services in Nagpur, outstation taxis, airport pickup and drop, as well as one-way and round-trip services."
  },
  {
    question: "Is Nagpur airport taxi service available 24/7?",
    answer:
      "Yes, we offer 24×7 airport pickup and drop services at Nagpur Airport with on-time assurance."
  },
  {
    question: "Are your taxi services available at night or early morning?",
    answer:
      "Yes, our taxi services operate 24/7, including late-night and early-morning travel."
  },
  {
    question: "How are taxi charges calculated?",
    answer:
      "Taxi charges depend on distance traveled, type of trip (local or outstation), car model, and trip duration. Call us for exact fare details."
  },
  {
    question: "What cars are available with driver?",
    answer:
      "We offer Ertiga, Rumion, Taisor, and other clean and comfortable sedans and SUVs suitable for family and outstation travel."
  },
  {
    question: "Do you provide one-way taxi services?",
    answer:
      "Yes, we offer both one-way and round-trip taxi services for local and outstation travel."
  },
  {
    question: "Can I book a taxi for outstation travel from Nagpur?",
    answer:
      "Yes, outstation taxi services are available from Nagpur to nearby cities and tourist destinations."
  },
  {
    question: "Is advance booking required for taxi service?",
    answer:
      "Same-day booking is possible for local travel. Advance booking is recommended for outstation trips and airport transfers."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, UPI payments, and online bank transfers. Payment details are shared during booking."
  },
  {
    question: "Is your taxi service suitable for family travel?",
    answer:
      "Yes, our taxis are safe, spacious, and ideal for family trips, including long-distance and outstation travel."
  },
  {
    question: "Do you provide taxis for business or corporate travel?",
    answer:
      "Yes, we provide reliable taxi services for corporate meetings, business travel, and official purposes."
  },
  {
    question: "Are your drivers experienced and verified?",
    answer:
      "Yes, all our drivers are professionally trained, background-verified, and experienced in local and highway routes."
  },
  {
    question: "Can I schedule a taxi in advance for a specific date and time?",
    answer:
      "Yes, you can pre-book a taxi for a specific date and time by calling us in advance."
  },
  {
    question: "Do you provide taxis for sightseeing in and around Nagpur?",
    answer:
      "Yes, we offer local sightseeing taxi services in Nagpur and nearby tourist locations."
  },
  {
    question: "Is luggage space available in your cars?",
    answer:
      "Yes, all our vehicles have sufficient luggage space suitable for airport and outstation travel."
  },
  {
    question: "Do you charge extra for night travel?",
    answer:
      "Night charges, if applicable, are clearly informed at the time of booking."
  },
  {
    question: "What happens if my flight or train is delayed?",
    answer:
      "We monitor delays where possible and coordinate with the driver to ensure smooth pickup. Please inform us in case of major delays."
  },
  {
    question: "How can I contact customer support for taxi booking?",
    answer:
      "You can reach our customer support team directly by calling 📞 9172271464 or 8446431819 for quick assistance."
  }
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
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all bg-primary-50 duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
            Car Service in Nagpur – FAQs
          </h1>
          <p className="text-text-sub text-lg max-w-2xl mx-auto">
            Get clear answers about our local, outstation, and airport taxi services in Nagpur.
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