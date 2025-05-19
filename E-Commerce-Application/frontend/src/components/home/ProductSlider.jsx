import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../../context/wishlistContext";
import { useCart } from "../../context/cartContext";


const ProductSlider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();


  const products = [
    { id: "1", title: "Barca", price: "₹699.00", image: "/images/product1.webp" },
    { id: "2", title: "Matis", price: "₹799.00", image: "/images/product2.webp" },
    { id: "3", title: "Greg", price: "₹999.00", image: "/images/product3.webp" },
    { id: "4", title: "Matis", price: "₹799.00", image: "/images/product2.webp" },
    { id: "5", title: "Matis", price: "₹799.00", image: "/images/product3.webp" },
    { id: "6", title: "Mika", price: "₹699.00", image: "/images/product1.webp" },
    { id: "7", title: "Mika", price: "₹799.00", image: "/images/product4.webp" },
    { id: "8", title: "Mika", price: "₹799.00", image: "/images/product4.webp" },
  ];

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-12 px-4  bg-opacity-0 " data-aos="fade-up">
      <h2 className="text-center text-3xl font-bangers mb-8 text-white">MINIMAL STYLES</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-lg rounded-xl p-4 flex flex-col items-center transition-transform duration-300 hover:scale-[1.03] relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-50 w-full object-cover rounded-md mb-3"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-2 right-2 z-10"
            >
              <FaHeart
                className={`text-2xl bg-gray-500 p-1 rounded-full shadow hover:scale-110 transition-transform duration-300 ${
                  isInWishlist(product.id) ? "text-pink-700" : "text-white"
                }`}
              />
            </button>
            <h3 className="text-lg font-semibold text-white">{product.title}</h3>
            <p className="text-yellow-600">{product.price}</p>
            <button
              onClick={() => openModal(product)}
              className="mt-4 text-white bg-yellow-500 py-2 px-4 rounded-full"
            >
              Quick View
            </button>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-lg text-white transform scale-0 opacity-0 animate-zoomIn relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-2xl text-gray-300 hover:text-white">×</button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-white">{selectedProduct.title}</h2>
            <p className="text-yellow-600">{selectedProduct.price}</p>
            <button className="mt-4 text-white bg-yellow-500 py-2 px-4 rounded-full hover:bg-yellow-600 transition-colors"
            onClick={()=> addToCart(selectedProduct)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSlider;