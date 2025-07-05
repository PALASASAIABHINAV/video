import React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import useInfiniteScroll from "../components/InfiniteLoading/useInfiniteScroll.js";
import ScrollableVideoGallery from "../components/gallery/ScrollableVideoGallery.jsx";

function LikedVideosPage() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const loadMoreVideos = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/like/videos`, {
        params: { page, limit: 6 },
        withCredentials: true,
      });
      const newVideos = response.data.data.map(res => res.likedVideos);

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
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    if (hasMore && !loading) {
      loadMoreVideos();
    }
  }, [hasMore, loading]);

  const [lastElementRef] = useInfiniteScroll(loadMoreVideos);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const loadingVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            Liked Videos
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Your collection of favorite videos
          </motion.p>
          
          {/* Stats Card */}
          <motion.div
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {videos.length} {videos.length === 1 ? 'Liked Video' : 'Liked Videos'}
            </span>
          </motion.div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {isInitialLoad ? (
            <motion.div
              key="loading"
              className="flex justify-center items-center min-h-[400px]"
              variants={loadingVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your liked videos...</p>
              </motion.div>
            </motion.div>
          ) : videos.length === 0 && !hasMore ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
              variants={loadingVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                No Liked Videos Yet
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Start liking videos to see them appear here. Your favorites will be saved for easy access.
              </motion.p>
              <motion.button
                className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
              >
                Explore Videos
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ScrollableVideoGallery 
                videos={videos}
                loading={loading}
                hasMore={hasMore}
                lastElementRef={lastElementRef}
              />
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </motion.div>
  );
}

export default LikedVideosPage;