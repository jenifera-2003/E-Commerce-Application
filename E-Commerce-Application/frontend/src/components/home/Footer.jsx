import React from "react";

const Footer = () => {
  return (
   
     // <footer className=" text-center text-sm p-6 text-gray-500 border-t mt-10">
     //   &copy; 2025 Zidio's E-Commerce | All rights reserved.
     // </footer>
     
  
 <footer className="bg-black">
     <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
         <div className="md:flex md:justify-between">
           
           <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
               
               <div>
                   <h2 className="mb-6 text-sm font-bangers text-white uppercase dark:text-white">Follow us</h2>
                   <ul className="text-gray-500 dark:text-gray-400 font-bangers">
                       <li className="mb-4">
                           <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Instagram</a>
                       </li>
                       <li>
                           <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Facebook</a>
                       </li>
                   </ul>
               </div>
               <div>
                   <h2 className="mb-6 text-sm font-bangers text-white uppercase dark:text-white">Legal</h2>
                   <ul className="text-gray-500 dark:text-gray-400 font-bangers">
                       <li className="mb-4">
                           <a href="#" className="hover:underline">Privacy Policy</a>
                       </li>
                       <li>
                           <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                       </li>
                   </ul>
               </div>
           </div>
       </div>
       <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
       <div className="sm:flex sm:items-center sm:justify-between">
           <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://zidiostore.com/" className="hover:underline">Zidio™</a>. All Rights Reserved.
           </span>
           
       </div>
     </div>
 </footer>
  );
};

export default Footer;
