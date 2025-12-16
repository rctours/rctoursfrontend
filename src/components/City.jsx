import React, { useState, useRef } from 'react';

const cityData = [
  {
    name: "Bangalore",
    imgUrl: "CityImages/Bangalore.webp", // Charminar
  },
  {
    name: "Hyderabad",
    imgUrl: "CityImages/hydrabad.png", // Charminar
  },
  {
    name: "Mumbai",
    imgUrl: "CityImages/mumbai.webp", // Charminar
  },
  {
    name: "Delhi",
    imgUrl: "CityImages/delhi.webp", // Charminar
  },
  {
    name: "Kolkata",
    imgUrl: "CityImages/kolkata.webp", // Charminar
  },
  {
    name: "Jaipur",
    imgUrl: "CityImages/jaipur.webp",
  },
  {
    name: "Chennai",
    imgUrl: "CityImages/chennai.webp",  
  },
  {
    name: "Pune",
    imgUrl: "CityImages/pune.webp",
  },
  {
    name: "Ahmedabad",
    imgUrl: "CityImages/ahemedabad.webp",
  },
  {
    name: "Goa",
    imgUrl: "CityImages/goa.png",
  },
  {
    name: "Kerala",
    imgUrl: "CityImages/kerela.webp",
  },
  {
    name: "Agra",
    imgUrl: "CityImages/Agra.webp",
  },
];


const getCardsToShow = () => {
    // Dynamically set cards to show by screen size
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
};

const ScrollCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(getCardsToShow());
    const containerRef = useRef(null);
    const cardWidth = 240;

    React.useEffect(() => {
        const handleResize = () => setCardsToShow(getCardsToShow());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const atStart = currentIndex === 0;
    const atEnd = currentIndex >= cityData.length - cardsToShow;

    const scrollLeft = () => {
        if (!atStart) {
            setCurrentIndex(currentIndex - 1);
            containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (!atEnd) {
            setCurrentIndex(currentIndex + 1);
            containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-10 bg-teal-100 ">
            <div className="text-center mb-14">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-500 mb-2">
                    From Nagpur to Everywhere
                </h2>
                <h2 className="text-4xl font-extrabold mb-4 text-primary-700">
                    Reach Any City in India
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    Start your journey from Nagpur and travel to any of India's leading cities in comfort. Our cars seamlessly connect you to Bangalore, Jaipur, Kolkata, Chennai, and beyond—wherever your adventure takes you.
                </p>
            </div>



            <div className="rounded-2xl bg-white p-8 shadow-lg max-w-full sm:max-w-2xl md:max-w-5xl lg:max-w-7xl mx-auto px-2 sm:px-6 relative w-full flex items-center ">
                <button
                    onClick={scrollLeft}
                    aria-label="Scroll Left"
                    disabled={atStart}
                    className={`absolute left-0 z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none transition-all duration-200 ${atStart ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                >
                    &#10094;
                </button>
                <div
                    ref={containerRef}
                    className="flex gap-3 sm:gap-6 overflow-x-auto scroll-smooth px-8 py-4 scrollbar-hide"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {cityData.map(({ name, imgUrl }, idx) => (
                        <div
                            key={name + idx}
                            tabIndex={0}
                            className="relative flex-none w-52 h-64 sm:w-60 sm:h-80 rounded-bl-4xl border-gray-900 border-1 rounded-tr-4xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 outline-none focus:ring-4 focus:ring-purple-300"
                            style={{ scrollSnapAlign: 'center' }}
                        >
                            <img
                                src={imgUrl}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0  pointer-events-none"></div>
                            <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 backdrop-blur-3xl rounded-2xl shadow-amber-100 mx-10 text-gray-50 text-lg sm:text-xl font-semibold text-center drop-shadow-md">
                                {name}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    aria-label="Scroll Right"
                    disabled={atEnd}
                    className={`absolute right-0 z-10 p-3 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none transition-all duration-200 ${atEnd ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                >
                    &#10095;
                </button>
            </div>
        </section>
    );
};

export default ScrollCarousel;
