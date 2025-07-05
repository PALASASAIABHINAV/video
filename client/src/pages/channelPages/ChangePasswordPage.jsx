import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/user/change-password`,
        { oldPassword: currentPassword, newPassword },
        { withCredentials: true }
      );
      if (response.data.success) {
        setMessage("Password updated successfully!");
      }
    } catch (error) {
      setMessage("Failed to update password. Check Password and Try Again.");
      return;
    } finally {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 dark:from-black dark:via-gray-900 dark:to-blue-950">
      <motion.div
        className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-blue-200 dark:border-blue-900 rounded-2xl shadow-2xl p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              placeholder="Enter Your Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              placeholder="Enter New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          {message && (
            <motion.p
              className={`text-sm font-medium text-center rounded-lg px-3 py-2 transition-all mb-2 ${
                message.includes("successfully")
                  ? "bg-green-100 border border-green-300 text-green-700 dark:bg-green-900/40 dark:border-green-700 dark:text-green-200"
                  : "bg-red-100 border border-red-300 text-red-700 dark:bg-red-900/40 dark:border-red-700 dark:text-red-200"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.p>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
          >
            Update Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChangePasswordPage;
