import React from "react";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import wishlistImg from '../assets/wishlist.png';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-0 text-white p-4" >
        {/* <img
          src="/assets/wishlist_empty.png" 
          alt="Empty Wishlist"
          className="w-80 h-auto mb-8"
        /> */}
        <div className="w-[70vh] h-[60vh] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${wishlistImg})` }}>

        </div>
        <br/>
        <p className="text-xl font-bangers mb-2">Your wishlist is feeling lonely!</p>
        <p className="text-gray-300 mb-4">
            Add products to your wishlist, review them anytime and easily move to cart.</p>
        <Link to="/home" className="px-4 py-2 bg-yellow-600 text-gray-900 rounded hover:bg-teal-600 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 flex justify-center">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg p-5 shadow-lg flex flex-col items-center">
            <img src={product.image} alt={product.title} className="w-60 h-60 object-contain mb-4" />
            <h3 className="text-xl font-semibold ">{product.title}</h3>
            <p className="text-yellow-400 font-bold mb-4">{product.price}</p>
            <div className="flex gap-4">
              <button
                onClick={() => removeFromWishlist(product)}
                className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded"
              >
                Remove
              </button>
              <button
                onClick={() =>addToCart(product)}
                className="bg-green-600 hover:bg-green-800 w-40  rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
