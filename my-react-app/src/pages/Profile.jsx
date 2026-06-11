import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token)

        if (!token) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("profile response:", response.data);
        setUser(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        // if unauthorized, redirect to login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        No profile data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white px-5 py-4 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-700">
          Account Settings
        </h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white px-5 py-6 mt-2">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1 text-white text-xs">
              📷
            </div>
          </div>

          <div>
            <h2 className="font-bold text-gray-800">
              {user.fullName}
            </h2>

            <p className="text-gray-600 text-sm">
              {user.email}
            </p>
          </div>
        </div>

        <p className="mt-5 text-gray-600 text-sm leading-6">
          Phone Number: {user.phoneNumber}
        </p>

        <p className="mt-2 text-gray-600 text-sm">
          Company Name: {user.companyName || "N/A"}
        </p>

        <p className="mt-2 text-gray-600 text-sm">
          Agency: {user.isAgency}
        </p>
      </div>

      <div className="border-t border-dashed border-gray-300 mt-2"></div>
    </div>
  );
};

export default Profile;