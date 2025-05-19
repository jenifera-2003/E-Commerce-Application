import React from "react";
import { Link } from 'react-router-dom';
import { FaHome, FaHeart, FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { useWishlist } from '../../context/wishlistContext';
import { useCart } from '../../context/cartContext';

const Navbar = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  // Total quantity in cart (not just length)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b  bg-opacity-0 text-white">
      <div className="text-2xl font-bangers tracking-widest">ZIDIO STORE</div>
      
      <ul className="hidden md:flex gap-8 text-md font-bangers">
        {["What's New", "Shop", "Collection", "About", "Contact"].map((item) => (
          <li key={item} className="hover:underline cursor-pointer">{item}</li>
        ))}
      </ul>

      

      <div className="flex justify-center items-center gap-4 text-lg">
        <Link to="/home" className="text-xl">
          <FaHome />
        </Link>

        <Link to="/wishlist" className="relative">
          <FaHeart className="hover:text-pink-700" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative">
          <FaShoppingCart className="hover:text-yellow-200 transition duration-200" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        {/* ✅ Login & Signup Buttons */}
                <Link
                  to="/login"
                  className="px-4 py-1 border border-white text-white rounded hover:bg-white hover:text-black transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 bg-white text-black rounded hover:bg-gray-200 transition duration-200"
                >
                  Signup
                </Link>
      </div>
    </nav>
  );
};

export default Navbar;

