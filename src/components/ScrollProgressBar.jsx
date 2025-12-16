import { useEffect, useState } from "react";
import TopBar from "./TopBar";

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScroll(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar />

      <div
        style={{
          position: "fixed",
          top: "60px",
          left: 0,
          height: "6px",
          width: `${scroll}%`,
          background: "#6b21a8",
          zIndex: 9999,
          transition: "width 0.2s linear",
        }}
      />
    </>
  );
};

export default ScrollProgressBar;
