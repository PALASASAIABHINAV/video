import React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import useInfiniteScroll from "../components/InfiniteLoading/useInfiniteScroll.js";
import ScrollableVideoGallery from "../components/gallery/ScrollableVideoGallery.jsx";

function WatchHistoryPage() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMoreVideos = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/user/watch-history`, {
        params: { page, limit: 10 },
        withCredentials: true,
      });
      const newVideos = response.data.data;
      
      if (!newVideos || newVideos.length === 0) {
        setHasMore(false);
        return;
      } else {
        setVideos((prevVideos) => {
          const videoIds = new Set(prevVideos.map(video => video._id));
          const uniqueNewVideos = newVideos.filter(video => !videoIds.has(video._id));
          return [...prevVideos, ...uniqueNewVideos];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log("Error fetching videos:", error);
      setError("Failed to load watch history. Please try again.");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    if (hasMore && !loading) {
      loadMoreVideos();
    }
  }, [hasMore, loading]);

  const [lastElementRef] = useInfiniteScroll(loadMoreVideos);

  // Enhanced animation variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const headerItemVariants = {
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

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const loadingVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const errorVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const emptyVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
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
      {/* Enhanced Professional Header */}
      <motion.div 
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <motion.div variants={headerItemVariants}>
              <motion.h1 
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                Watch History
              </motion.h1>
              <motion.p 
                className="mt-1 text-sm text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Videos you've recently watched
              </motion.p>
            </motion.div>
            
            <motion.div
              className="mt-4 sm:mt-0"
              variants={headerItemVariants}
            >
              <motion.div 
                className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer"
                variants={badgeVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="w-2 h-2 bg-purple-500 rounded-full mr-2"
                  variants={pulseVariants}
                  animate="animate"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {videos.length} {videos.length === 1 ? 'Video' : 'Videos'}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {initialLoading ? (
            <motion.div
              key="initial-loading"
              className="flex justify-center items-center py-20"
              variants={loadingVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div 
                className="text-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div 
                  className="w-12 h-12 border-3 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading your watch history...
                </motion.p>
              </motion.div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="flex flex-col items-center justify-center py-20"
              variants={errorVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="text-center max-w-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 mx-auto"
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Unable to load watch history
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 text-sm mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {error}
                </motion.p>
                <motion.button
                  className="px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    setError(null);
                    setPage(1);
                    setVideos([]);
                    setHasMore(true);
                    setInitialLoading(true);
                  }}
                >
                  Try Again
                </motion.button>
              </motion.div>
            </motion.div>
          ) : videos.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-20"
              variants={emptyVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="text-center max-w-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 mx-auto"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  No watch history yet
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 text-sm mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Start watching videos to build your watch history.
                </motion.p>
                <motion.button
                  className="px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => window.history.back()}
                >
                  Explore Videos
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <ScrollableVideoGallery 
                videos={videos}
                loading={loading}
                hasMore={hasMore}
                lastElementRef={lastElementRef}
              />
              
              {/* Enhanced loading indicator for infinite scroll */}
              {loading && (
                <motion.div
                  className="flex justify-center items-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div 
                    className="text-center"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className="w-8 h-8 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-2"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.p 
                      className="text-gray-500 dark:text-gray-400 text-xs"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Loading more videos...
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default WatchHistoryPage;