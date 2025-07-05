import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// import VideoCard from "../components/VideoCard.jsx";
// import Loader from "../components/InfiniteLoading/Loader.jsx";
import useInfiniteScroll from "../components/InfiniteLoading/useInfiniteScroll.js";
import ScrollableVideoGallery from "../components/gallery/ScrollableVideoGallery.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Track if more videos are available

  const loadMoreVideos = useCallback(async () => {
    if (!hasMore || loading) return; // Stop if no more videos are available or if already loading

    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/video/`,
        {
          params: { page, limit: 6 },
          withCredentials: true,
        }
      );

      const newVideos = response.data.data; // Adjust this based on your API response structure
      // console.log(" Home : "+newVideos);
      // console.log(newVideos);
      if (newVideos.length === 0) {
        setHasMore(false); // No more videos available
      } else {
        setVideos((prevVideos) => {
          // Prevent duplicate videos
          const videoIds = new Set(prevVideos.map((video) => video._id));
          const uniqueNewVideos = newVideos.filter(
            (video) => !videoIds.has(video._id)
          );
          return [...prevVideos, ...uniqueNewVideos];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
    // console.log("page"+page+" "+"hasMore:"+hasMore+" "+"loading"+" "+loading);
  }, [page, hasMore, loading]);

  useEffect(() => {
    
    loadMoreVideos();
    setLoading(false);
  }, []); // Only run once on component mount

  const [lastElementRef] = useInfiniteScroll(loadMoreVideos);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Animated background elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-500/15 to-cyan-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 pt-6 pb-12">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2 
          }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Header Section */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-4">
              Discover Amazing Videos
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore a world of creativity, entertainment, and knowledge
            </p>
          </motion.div>

          {/* Video Gallery */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.9, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6 
            }}
            className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/20 overflow-hidden"
          >
            <ScrollableVideoGallery
              videos={videos}
              loading={loading}
              hasMore={hasMore}
              lastElementRef={lastElementRef}
            />
          </motion.div>

          {/* Loading indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center mt-8"
            >
              <div className="flex space-x-2">
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-3 h-3 bg-indigo-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-3 h-3 bg-purple-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}

          {/* End of content indicator */}
          {!hasMore && videos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700/50">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-700 dark:text-green-300 font-medium">
                  You've reached the end
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomePage;

// <div className="container mx-auto p-4">
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     {videos.map((video, index) => (
//       <VideoCard
//         key={index}
//         title={video.title}
//         description={video.description}
//         videoUrl={video.videoUrl}
//         thumbnail={video.thumbnail}
//         duration={video.duration}
//       />
//     ))}
//     <div ref={lastElementRef} className="h-10"></div>
//   </div>
//   {loading && (
//     <div className="flex justify-center items-center mt-4">
//       <Loader />
//     </div>
//   )}
//   {!hasMore && (
//     <div className="text-center mt-4 text-gray-500">
//       No more videos available.
//     </div>
//   )}
// </div>
