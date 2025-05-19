import React from "react";
import { motion } from "framer-motion";
import heroVideo from "../../assets/hero.mp4";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 💬 Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/40 px-4 text-center">
        {/* ✨ Heading Slide-in */}
        <motion.h1
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          className="text-white text-4xl md:text-6xl font-bangers backdrop-blur bg-black/30 px-6 py-4 rounded border-4 border-yellow-400 shadow-xl"
        >
          TRENDY COLLECTIONS
        </motion.h1>

        {/* 🚀 CTA Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-8 rounded-xl uppercase border-2 border-black shadow-lg"
        >
          Shop Now
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
