import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const navigate = useNavigate();

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
  };

  // ✅ Load user credits
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits ?? 0);
        setUser(data.user);
      } else {
        toast.error(data.message || "Unable to fetch credits");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logout();
      }
      toast.error("Failed to load credits");
    }
  };

  // ✅ Generate image
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        await loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message || "Image generation failed");
        await loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logout();
      }
      toast.error("Image generation error");
    }
  };

  // ✅ Load credits on token change
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    auth: { user, setUser, token, setToken, logout },
    ui: { showLogin, setShowLogin },
    credits: { credit, setCredit, loadCreditsData },
    backendUrl,
    generateImage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
