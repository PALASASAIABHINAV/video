import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ChannelSubscriptionsCard({ channelId, avatar, username, fullName }) {
  const navigate = useNavigate();

  const [subscribed, setSubscribed] = React.useState(true);

  const onUnsubscribe = async (channelId) => {
    axios
      .post(`${import.meta.env.VITE_HOST}/api/subscription/c/${channelId}`, {},{
        withCredentials: true,
      })
      .then((response) => {
        if (!response) {
          console.error("ERROR :: In Unsubscribing the Channel.");
          console.log(response);
        }
        setSubscribed((prev) => !prev);
        // console.log("Channel subscribed / toggled  Successfully.");
      })
      .catch((e) => {
        console.error("ERROR :: In Unsubscribing the Channel.");
        console.log(e);
      });
  };
  const onViewChannel = async (channelId) => {
    navigate(`/channel-profile/${channelId}/videos`);
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-gray-900 dark:text-white rounded-xl border border-blue-200 dark:border-blue-900 shadow-lg hover:shadow-xl transition-all duration-300 w-full mb-4 space-y-4 sm:space-y-0"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      {/* Left Section: Avatar and Info */}
      <div className="flex items-center w-full sm:w-auto">
        <motion.div 
          className="mr-4 sm:mr-6"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={avatar}
            alt={`${username}'s avatar`}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700 shadow-md"
          />
        </motion.div>
        
        <motion.div 
          className="flex flex-col flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">{username}</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{fullName}</p>
        </motion.div>
      </div>

      {/* Right Section: Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          onClick={() => onUnsubscribe(channelId)}
          className={`w-full sm:w-auto ${
            !subscribed
              ? "bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 hover:from-red-500 hover:to-red-600"
              : "bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 hover:from-gray-500 hover:to-gray-600"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {subscribed ? "Unsubscribe" : "Subscribe"}
        </motion.button>
        
        <motion.button
          onClick={()=> onViewChannel(channelId)}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 hover:from-blue-500 hover:to-blue-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Channel
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ChannelSubscriptionsCard;
