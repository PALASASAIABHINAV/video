import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { showAlertFromErrorHtml } from "../../utilities/formatApiError.js";
import LoadingProgress from "../../utilities/LoadingProgress";
import { motion } from "framer-motion";

function SignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(e.target);
    try {
      const usernameResponse = await axios.get(
        `${import.meta.env.VITE_HOST}/api/user/check-username/${formdata.get('username')}`,
        {
          withCredentials: true,
        }
      );
      if (!usernameResponse.data.data) {
        window.alert("Username already exists. Please try another username.");
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/user/register`,
        formdata,
        {
          withCredentials: true,
          headers: {
            contentType: "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate("/signin");
      } else {
        showAlertFromErrorHtml(response.data.data);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-[100vh] bg-gradient-to-br from-black via-gray-900 to-blue-950 dark:from-black dark:via-gray-900 dark:to-blue-950">
      {loading ? (
        <LoadingProgress message={"Loading..."} />
      ) : (
        <motion.div
          className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-blue-200 dark:border-blue-900 flex flex-col justify-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8" encType="multipart/form-data">
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Choose a username"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Cover Image</label>
                <input
                  type="file"
                  name="coverImage"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200 mt-4"
              >
                Create Account
              </motion.button>
              <p className="mt-4 text-gray-700 dark:text-gray-200 text-center">
                Already a User?{' '}
                <Link to="/signin" className="text-blue-500 hover:underline dark:text-blue-400">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}

export default SignUpPage;
