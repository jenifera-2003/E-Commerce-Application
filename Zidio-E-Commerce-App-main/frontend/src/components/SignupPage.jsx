import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/zidio-logo.png';
import Avatar from '../components/Avatar';

function SignupPage() {
  const usernameInputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password, avatar: selectedAvatar };

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setShowAvatarSelection(true);
      } else {
        setErrorMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage('Network error during signup');
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("token", "newUserTokenWithAvatar");
    navigate("/");
  };

  const handleSkipAvatar = () => {
    localStorage.setItem("token", "newUserTokenSkippedAvatar");
    navigate("/");
  };

  if (showAvatarSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h3 className="text-2xl mb-4">Choose your Avatar (Optional)</h3>
          <Avatar selected={selectedAvatar} setSelected={handleAvatarSelect} />
          <button
            onClick={handleSkipAvatar}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded text-white"
          >
            Skip for Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden relative">
      <div className="flex-1 flex flex-col items-center justify-center p-5">
        <img src={logo} alt="Zidio Logo" className="max-w-[80%] mb-4" />
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px),radial-gradient(circle,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[length:30px_30px,60px_60px] animate-pulse" />
      </div>

      <div className="flex-1 flex items-center justify-center p-5 relative z-10">
        <div className="bg-black/70 p-8 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] w-full max-w-md text-center">
          <h2 className="text-3xl text-gray-300 mb-8">Sign Up</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSignupSubmit} className="text-left space-y-5">
            <div>
              <label htmlFor="username" className="block text-gray-400 mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                ref={usernameInputRef}
                value={username}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded border border-gray-800 bg-gray-900 text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded border border-gray-800 bg-gray-900 text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-400 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded border border-gray-800 bg-gray-900 text-white"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-400 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded border border-gray-800 bg-gray-900 text-white"
              />
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" id="remember" name="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-400">Remember Me</label>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-green-600 hover:bg-green-800 text-white font-bold rounded transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/" className="text-blue-400 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
