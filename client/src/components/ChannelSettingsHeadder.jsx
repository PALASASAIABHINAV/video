import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./InfiniteLoading/Loader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ChannelSettingsHeadder() {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadChannel = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/user/current-user`,{
          withCredentials: true,
        }
      );
      
      if (response.data.success) {
        setChannel(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load channel", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChannel();
  }, []);

  const isActive = ({ isActive }) =>
    `flex-1 py-2 sm:py-3 px-2 text-sm sm:text-base transition-all duration-200 ${
      isActive
        ? "border-b-4 border-blue-500 text-blue-500 font-semibold bg-blue-100 dark:bg-blue-900/30 rounded-sm"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  return loading || !channel ? (
    <Loader />
  ) : (
    <motion.div 
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl w-full rounded-lg overflow-hidden border border-blue-200 dark:border-blue-900"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Header Section */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center border-b border-gray-200 dark:border-gray-700 space-y-4 sm:space-y-0">
        <motion.div 
          className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-700 shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src={channel.avatar}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div 
          className="text-center sm:text-left sm:ml-4 flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{channel.fullName}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">@{channel.username}</p>
        </motion.div>
        
        <motion.button 
          onClick={()=> navigate(`/channel-profile/${channel._id}`)}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 hover:from-blue-500 hover:to-blue-800 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        >
          View Channel
        </motion.button>
      </div>

      {/* Navigation Tabs */}
      <motion.div 
        className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      >
        <NavLink to="/channel-settings/personal-info" className={isActive}>
          Personal Information
        </NavLink>
        <NavLink to="/channel-settings/channel-info" className={isActive}>
          Channel Information
        </NavLink>
        <NavLink to="/channel-settings/change-password" className={isActive}>
          Change Password
        </NavLink>
      </motion.div>
    </motion.div>
  );
}

export default ChannelSettingsHeadder;
