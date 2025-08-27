import React, { useContext } from "react";
import { plans, assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const {
    auth: { user, token },
    ui: { setShowLogin },
    credits: { loadCreditsData },
    backendurl,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const launchRazorpay = async (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendurl}/api/user/verify-razor`,
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (data.success) {
            await loadCreditsData();
            navigate("/");
            toast.success("✅ Credits added successfully");
          } else {
            toast.error(data.message || "Verification failed");
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message || "Payment verification error"
          );
        }
      },
      theme: {
        color: "#121212",
      },
    };

    const rzp = new window.Razorpay(options);

    // ✅ Handle failed payment
    rzp.on("payment.failed", function (response) {
      toast.error(response.error.description || "Payment failed");
    });

    rzp.open();
  };

  const handlePurchase = async (planId) => {
    if (!user) {
      typeof setShowLogin === "function" && setShowLogin(true);
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/pay-razor`,
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success && data.order) {
        launchRazorpay(data.order);
      } else {
        toast.error(data.message || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment initiation error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button
        className="border border-gray-400 px-10 py-2 rounded-full mb-6 focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="View available plans"
      >
        Our Plans
      </button>

      <h1 className="text-3xl font-medium mb-6 sm:mb-10">Choose the plan</h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img
              width={40}
              src={assets.logo_icon}
              alt="Imagify logo icon"
              loading="lazy"
            />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /{" "}
              {item.credits} credits
            </p>
            <button
              onClick={() => handlePurchase(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              aria-label={`Purchase ${item.credits} credits for $${item.price}`}
            >
              {user ? "Purchase" : "Get started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
