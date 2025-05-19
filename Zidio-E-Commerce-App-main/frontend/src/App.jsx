import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ParticleEffect from "./components/ParticleEffect";

import Navbar from "./components/home/Navbar";
import HeroSection from "./components/home/HeroSection";
import FeaturedCards from "./components/home/FeaturedCards";
import ProductSlider from "./components/home/ProductSlider";
import Footer from "./components/home/Footer";

import WishlistPage from "./components/WishlistPage";
import CartPage from "./components/CartPage";
import CheckoutSuccess from './pages/CheckoutSuccess';
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";





const HomePage = () => (
  <>
    <HeroSection />
    <FeaturedCards />
    <ProductSlider />
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {/* Starry night particle effect */}
      <ParticleEffect />
      
      {/* Background overlay with slight transparency */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-0"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen font-sans text-white">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />

            
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
