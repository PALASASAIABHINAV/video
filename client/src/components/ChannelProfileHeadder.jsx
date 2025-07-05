import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function ChannelProfileHeadder() {
  const channelId = useParams().channelId;
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.user.userData);

  const loadProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/user/c/${channelId}`,
        {
          withCredentials: true,
        }
      );
      if(!response.data.success){
        console.error("Error fetching channel profile:", response.data.message);
      }else{
        setChannel(response.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    loadProfile();
    if(!channel){
      console.error(channel);
      return;
    }
    setLoading(false);
  }, [channelId,loading]);

  const isActive = ({ isActive }) =>
    `flex-1 py-2 sm:py-3 px-2 text-sm sm:text-base transition-all duration-200 ${
      isActive
        ? "border-b-4 border-blue-500 text-blue-500 font-semibold bg-blue-100 dark:bg-blue-900/30 rounded-sm"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  const toggleSubscription = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/subscription/c/${channel._id}/`,
        {},
        {
          withCredentials: true,
        }
      );
      if(!response.data.success){
        console.error("Error subscribing to channel:", response.data.message);
      }else{
        const {subscribersCount, isSubscribed} = channel;
        const updatedSubscribersCount = isSubscribed ? subscribersCount-1 : subscribersCount+1;
        const updatedIsSubscribed = !isSubscribed 
        setChannel((prev)=> ({
          ...prev, 
          subscribersCount: updatedSubscribersCount,
          isSubscribed: updatedIsSubscribed,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <motion.div 
      className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl w-full rounded-lg overflow-hidden border border-blue-200 dark:border-blue-900"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Header Section */}
      {/* Cover Image */}
      <motion.div 
        className="w-full h-24 sm:h-32 overflow-hidden"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img
          src={channel.coverImage}
          alt="Cover Image"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Avatar and Info */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0">
        <motion.div 
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-700 shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src={channel.avatar}
            alt="Avatar"
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
          <h6 className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            {`${channel.subscribersCount} ${channel.subscribersCount != 1 ? "Subscribers" : "Subscriber"}   
            .  ${channel.subscribedToCount} Subscribed`}
          </h6>
        </motion.div>
        
        {userData?._id !== channelId && 
        <motion.button 
          className={`w-full sm:w-auto text-white px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 ${
            channel.isSubscribed
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 hover:from-blue-500 hover:to-blue-800"
          }`}
          onClick={toggleSubscription}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        >
          {channel.isSubscribed ? "Unsubscribe" : "Subscribe"}
        </motion.button>}
      </div>

      {/* Navigation Tabs */}
      <motion.div 
        className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
      >
        <NavLink to={`/channel-profile/${channelId}/videos`} className={isActive}>
          Videos
        </NavLink>
        <NavLink to={`/channel-profile/${channelId}/play-lists`} className={isActive} end>
          Play Lists
        </NavLink>
        <NavLink to={`/channel-profile/${channelId}/tweets`} className={isActive}>
          Tweets
        </NavLink>
        <NavLink to={`/channel-profile/${channelId}/subscribed-channels`} className={isActive}>
          Subscribed
        </NavLink>
      </motion.div>
    </motion.div>
  );
}

export default ChannelProfileHeadder;
