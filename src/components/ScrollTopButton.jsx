const ScrollTopButton = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollTop}
      className="w-12 h-8 flex items-center justify-center rounded-full bg-purple-500/90 opacity-90 text-white shadow-lg hover:scale-110 transition-all duration-300 "
    >
      ↑
    </button>
  );
};

export default ScrollTopButton;
