import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center text-gray-200 bg-black bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[length:30px_30px,60px_60px]">
      <form className="bg-black/80 p-8 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] w-[400px] text-center">
        <h2 className="text-4xl text-gray-300 mb-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          Login
        </h2>

        <div className="mb-5 text-left">
          <label htmlFor="username" className="block mb-2 text-gray-400">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-3 rounded border border-gray-800 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.5)]"
          />
        </div>

        <div className="mb-5 text-left">
          <label htmlFor="password" className="block mb-2 text-gray-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 rounded border border-gray-800 bg-gray-900 text-gray-100 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_5px_rgba(0,123,255,0.5)]"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-6 py-3 rounded bg-blue-600 hover:bg-blue-800 text-white font-bold transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            className="px-6 py-3 rounded bg-red-600 hover:bg-red-800 text-white font-bold transition-colors ml-2"
          >
            Login with Google
          </button>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="px-6 py-3 rounded bg-gray-600 hover:bg-gray-700 text-white font-bold transition-colors"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-5 text-center">
          <a href="#" className="text-gray-400 hover:underline hover:text-gray-300">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
