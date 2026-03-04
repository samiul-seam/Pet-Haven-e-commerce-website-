import { useCallback, useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    try {
      const token = localStorage.getItem("authTokens");
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const [loading, setLoading] = useState(getToken() ? true : false);

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) {
      fetchUserProfile();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [authTokens]);

  const handleAPIError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again",
  ) => {
    console.log(error);

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    if (!authTokens?.access) {
      setUser(null);
      return;
    }

    try {
      const response = await apiClient.get("auth/users/me/", {
        headers: {
          Authorization: `JWT ${authTokens.access}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [authTokens]);

  // Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // After login set user
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Update User Profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Password Change
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    setLoading(true);
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      setErrorMsg(error, "Registration Failed! Try Again");
    } finally {
      setLoading(false);
    }
  };

  // Logout User
  const logOutUser = () => {
    setUser(false);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("adoptId");
  };

  return {
    user,
    errorMsg,
    loading,
    loginUser,
    registerUser,
    logOutUser,
    updateUserProfile,
    changePassword,
  };
};

export default useAuth;
