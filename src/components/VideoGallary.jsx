import React from "react";

const VideoGallery = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#3b0a45] via-[#8b5cf6] to-[#ec4899] py-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* 🌈 Subtle Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      {/* 🌟 Content */}
      <div className="relative z-10 text-center text-white max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Watch this video
        </h2>
        <p className="text-base md:text-lg opacity-90 mb-12">
          Watch our latest promotional reel — a glimpse into the experience we deliver every day.
        </p>
      </div>

      {/* 🎬 Video Container */}
      <div className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all duration-500">
        <video
          src="/Videos/Ad video.mp4" // ✅ Make sure this file exists in public/Videos
          autoPlay
          muted
          controls // 🎛️ This displays sound + progress + fullscreen
          loop
          playsInline
          className="w-full aspect-video object-cover rounded-2xl"
        ></video>
      </div>

      {/* ✨ Bottom Caption */}
      <p className="relative z-10 text-sm md:text-base text-white/70 mt-8 max-w-lg text-center">
        Follow us on Instagram for more reels and behind-the-scenes moments 🚗💨
      </p>
    </section>
  );
};

export default VideoGallery;
