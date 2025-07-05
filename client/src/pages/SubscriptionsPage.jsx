import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import ChannelSubscriptionsCard from "../components/ChannelSubscriptionsCard";

function SubscriptionsPage() {
  const [subscribed, setSubscribed] = useState([]);
  const [totalSubscribed, setTotalSubscribed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.user.userData);

  const loadSubscribtions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/subscription/c/${userData._id}/`,
        {
          withCredentials: true,
        }
      );
    
      setSubscribed(response.data.data);
      setTotalSubscribed(response.data.data.length);
    } catch (e) {
      console.log(e);
      setError("Failed to load subscriptions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      loadSubscribtions();
    }
  }, [userData?._id]);

  // Professional animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Professional Header */}
      <motion.div 
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <motion.h1 
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Subscriptions
              </motion.h1>
              <motion.p 
                className="mt-1 text-sm text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Manage your channel subscriptions
              </motion.p>
            </div>
            
            <motion.div
              className="mt-4 sm:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {totalSubscribed} {totalSubscribed === 1 ? 'Channel' : 'Channels'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Loading subscriptions...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center max-w-md">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Unable to load subscriptions
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{error}</p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  onClick={loadSubscribtions}
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : subscribed.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2zM10 19h10v-2H10v2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No subscriptions yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  Start exploring channels and subscribe to your favorite content creators.
                </p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => window.history.back()}
                >
                  Explore Channels
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {subscribed.map((item, index) => (
                <motion.div
                  key={item.channel._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ChannelSubscriptionsCard
                    channelId={item.channel._id}
                    avatar={item.channel.avatar}
                    username={item.channel.username}
                    fullName={item.channel.fullName}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default SubscriptionsPage;
