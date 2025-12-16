import React, { useEffect, useState } from "react";

/* ============================================
   STATISTICS DATA 
============================================ */
const stats = [
  {
    mainText: "40K+",
    subText: "Customers Served",
    progress: 92,
    innerText: "",
  },
  {
    mainText: "5+",
    subText: "Global Service Hubs",
    progress: 70,
    innerText: "",
  },
  {
    mainText: "1.2M+",
    subText: "Monthly Interactions",
    progress: 88,
    innerText: "",
  },
  {
    mainText: "5",
    subText: "Offices & Centers",
    progress: 60,
    innerText: "",
  },
];

/* ============================================
   CIRCULAR PROGRESS COMPONENT
============================================ */
const CircularProgress = ({ progress, children }) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#80cbc4"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Inner Text */}
      {children && (
        <div className="absolute text-center text-teal-200 text-xs whitespace-pre-line leading-tight">
          {children}
        </div>
      )}
    </div>
  );
};

/* ============================================
   GLOBAL IMPACT SECTION
============================================ */
const GlobalImpact = () => {
  return (
    <section
      className="w-full bg-cover bg-center h-screen text-white px-5 py-10 md:py-10"
      style={{ backgroundImage: "url(/bg.webp)" }}
    >
      {/* Heading */}
      <div className="  rounded-2xl">

        <h2 className="text-4xl  font-extrabold text-text-heeading text-center mb-4 ">
          Our Global Impact
        </h2>

        <p className="text-center text-white/80 max-w-xl mx-auto mb-12 text-lg">
          We are growing every year — trusted by thousands of customers and expanding our reach worldwide.
        </p>
      </div>
      {/* Overlay Container */}
      <div className="bg-primary-700/70 rounded-3xl max-w-5xl mx-auto p-6 md:p-12 shadow-2xl">


        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map(({ mainText, subText, progress, innerText }, idx) => (
            <div
              key={idx}
              className="
                flex flex-col items-center gap-4
                bg-white/10 rounded-2xl 
                p-5 md:p-7 backdrop-blur-2xl
                shadow-3xl shadow-black border-l-4 hover:bg-white/15
                transition-all duration-300
                text-center
              "
            >
              {/* Progress Circle */}
              <CircularProgress progress={progress}>
                {innerText &&
                  innerText.split("\n").map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
              </CircularProgress>

              {/* Text */}
              <div>
                <h3 className="text-3xl font-bold text-white drop-shadow">
                  {mainText}
                </h3>
                <p className="text-white/90 font-medium text-lg">{subText}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GlobalImpact;
