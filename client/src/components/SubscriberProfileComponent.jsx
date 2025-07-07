import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateTimeDifference } from "../utilities/calculateTimeDifference";
import { motion } from "framer-motion";

function SubscriberProfileComponent({ 
  subscribedSince ,
   avatar ,
    username ,
     fullName ,
      channelId }) {
  
    const navigate = useNavigate();

  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-white p-4 sm:p-6 rounded-xl border border-blue-200 dark:border-blue-900 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center gap-4 w-full"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={avatar}
          alt={`Subscriber Avatar`}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-blue-200 dark:border-blue-700 shadow-md object-cover"
        />
      </motion.div>
      
      <motion.div 
        className="flex-1 text-center sm:text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">{fullName}</h3>
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          <p className="hidden sm:block">{username} • Subscribed </p>
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            {calculateTimeDifference(subscribedSince)}
          </span>
        </div>
      </motion.div>
      
      <motion.button
        onClick={() => navigate(`/channel-profile/${channelId}`)}
        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 hover:from-blue-500 hover:to-blue-800 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-lg font-semibold shadow-md transition-all duration-200 text-sm sm:text-base"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        View Channel
      </motion.button>
    </motion.div>
  );
}

export default SubscriberProfileComponent;
