import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
// import { BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { WishlistProvider } from "./context/wishlistContext";
import { CartProvider } from './context/cartContext';
// eslint-disable-next-line react-refresh/only-export-components
const RootWithAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,    
      once: true,       
      offset: 120,      
      easing: 'ease-in-out',
    });
  }, []);

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <RootWithAOS />
        </CartProvider>
    </WishlistProvider>
  </StrictMode>
);
