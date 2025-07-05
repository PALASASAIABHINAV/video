import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../redux/userSlice";
import Loader from "../../components/InfiniteLoading/Loader";
import { motion } from "framer-motion";

const ChannelInfoPage = () => {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  const [username, setUsername] = useState(userData.username);
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [status, setStatus] = useState(false);

  const updateField = async (field, value) => {
    try {
      setStatus(prev => !prev);
      let response;

      if (field === "avatar" || field === "coverImage") {
        const formData = new FormData();
        formData.append(field, value);

        response = await axios.patch(
          `${import.meta.env.VITE_HOST}/api/user/update-${field}`,
          formData,
          {
            withCredentials: true,
          }
        );
      }
      else if (field === "username") {
        response = await axios.patch(
            `${import.meta.env.VITE_HOST}/api/user/update-profile`,
            { username : value },
            { withCredentials: true }
        );
      }

      if(response.data.success){
        dispatch(updateUserData(response.data.data));
      }
    } catch (error) {
      console.error(`${field} error:`, error.response || error.message);
    }finally{
        setStatus(prev => !prev);
    }
  };

  const handleUsernameUpdate = (e) => {
    e.preventDefault();
    updateField("username", username);
  };

  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    if (avatar) await updateField("avatar", avatar);
  };

  const handleCoverImageUpdate = async (e) => {
    e.preventDefault();
    if (coverImage) await updateField("coverImage", coverImage);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 dark:from-black dark:via-gray-900 dark:to-blue-950">
      <motion.div
        className="w-full max-w-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-blue-200 dark:border-blue-900 rounded-2xl shadow-2xl p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">Update Profile</h2>

        {/* Update Username */}
        <form onSubmit={handleUsernameUpdate} className="space-y-4 mb-6">
          <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Update Username</label>
          <div className="flex space-x-2 justify-between h-10">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
              disabled
            />
            <motion.button
              type="submit"
              disabled
              className="w-72 py-2 px-4 bg-gray-600 rounded-lg text-gray-100 font-semibold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Update Username
            </motion.button>
          </div>
        </form>

        {/* Update Avatar */}
        <form onSubmit={handleAvatarUpdate} className="space-y-4 mb-6">
          <label htmlFor="avatar" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Update Avatar</label>
          <div className="flex space-x-2 justify-between">
            <input
              type="file"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              accept="image/*"
              required
            />
            <motion.button
              type="submit"
              className="w-72 py-2 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-lg text-white font-semibold shadow-md hover:from-blue-500 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Update Avatar
            </motion.button>
          </div>
        </form>

        {/* Update Cover Image */}
        <form onSubmit={handleCoverImageUpdate} className="space-y-4">
          <label htmlFor="coverImage" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Update Cover Image</label>
          <div className="flex space-x-2 justify-between ">
            <input
              type="file"
              id="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              accept="image/*"
              required
            />
            <motion.button
              type="submit"
              className="w-72 py-2 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-lg text-white font-semibold shadow-md hover:from-blue-500 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Update Cover Image
            </motion.button>
          </div>
        </form>

        {/* Status Message */}
        {status && 
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white w-auto min-w-32 h-32 p-6 rounded-lg shadow-lg mx-4 justify-center items-center font-semibold ">
              <div>{"Uploading..."}</div>
              <Loader />
            </div>
          </div>
        }
      </motion.div>
    </div>
  );
};

export default ChannelInfoPage;
