import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);        // Show bar
    setProgress(30);         // Start progress

    // Simulate async route transition
    const timer1 = setTimeout(() => setProgress(70), 150);
    const timer2 = setTimeout(() => {
      setProgress(100);

      // Hide after animation completes
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "4px",
        width: progress + "%",
        backgroundColor: "#7c3aed", // purple-600
        zIndex: 9999,
        transition: "width 0.3s ease",
      }}
    ></div>
  );
};

export default RouteProgressBar;
