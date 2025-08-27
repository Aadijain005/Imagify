import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [authMode, setAuthMode] = useState("Login"); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    auth: { setToken, setUser },
    ui: { setShowLogin },
    backendUrl,
  } = useContext(AppContext);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // validation
    if (!email || !password || (authMode === "Sign Up" && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        authMode === "Login" ? "/api/user/login" : "/api/user/register";
      const payload =
        authMode === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post({ backendUrl }, { endpoint }, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(
          authMode === "Login" ? "Logged in successfully" : "Account created!"
        );
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center"
      role="dialog"
      aria-modal="true"
    >
      <motion.form
        onSubmit={handleSubmit}
        role="form"
        aria-labelledby="auth-heading"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md shadow-lg"
      >
        {/* Heading */}
        <h1
          id="auth-heading"
          className="text-center text-2xl text-neutral-700 font-medium"
        >
          {authMode}
        </h1>
        <p className="text-sm text-center mb-4">
          {authMode === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Create your account to get started"}
        </p>

        {/* Name Field (Sign Up only) */}
        {authMode === "Sign Up" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img
              src={assets.profile_icon}
              alt="Profile icon"
              className="w-6 h-6 rounded-full object-contain"
              loading="lazy"
            />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              aria-label="Full Name"
              className="text-sm w-full focus:ring-2 focus:ring-blue-500 rounded-full px-2"
            />
          </div>
        )}

        {/* Email Field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="Email icon" loading="lazy" />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            autoComplete="email"
            aria-label="Email address"
            className="text-sm w-full focus:ring-2 focus:ring-blue-500 rounded-full px-2"
          />
        </div>

        {/* Password Field */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="Lock icon" loading="lazy" />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            aria-label="Password"
            className="text-sm w-full focus:ring-2 focus:ring-blue-500 rounded-full px-2"
          />
        </div>

        {/* Forgot Password */}
        {authMode === "Login" && (
          <button
            type="button"
            onClick={() => toast.info("Password recovery coming soon!")}
            className="text-sm text-blue-600 my-4 block ml-auto hover:underline"
          >
            Forgot Password?
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-full text-white transition-all duration-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          {loading
            ? "Processing..."
            : authMode === "Login"
            ? "Login"
            : "Create Account"}
        </button>

        {/* Switch Auth Mode */}
        <p className="mt-5 text-center text-sm">
          {authMode === "Login" ? (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setAuthMode("Sign Up")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setAuthMode("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Close Modal */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close login form"
          aria-label="Close login modal"
          className="absolute top-5 right-5 cursor-pointer w-5 h-5"
          loading="lazy"
        />
      </motion.form>
    </div>
  );
}

export default Login;
