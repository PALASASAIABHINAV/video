import React, { useCallback, useEffect, useState } from 'react';
import ChannelProfileHeadder from '../../components/ChannelProfileHeadder';
import useInfiniteScroll from '../../components/InfiniteLoading/useInfiniteScroll';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ScrollableVideoGallery from '../../components/gallery/ScrollableVideoGallery';
import { motion, AnimatePresence } from 'framer-motion';

function ChannelVideosPage() {
  const channelId = useParams().channelId;
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
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/video/channel`, {
        params: { page, limit: 6, channelId },
        withCredentials: true,
      });
      const newVideos = response.data.data;
      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prevVideos) => {
          const videoIds = new Set(prevVideos.map(video => video._id));
          const uniqueNewVideos = newVideos.filter(video => !videoIds.has(video._id));
          return [...prevVideos, ...uniqueNewVideos];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setError('Failed to load videos');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [page, hasMore, loading, channelId]);

  useEffect(() => {
    loadMoreVideos();
    // eslint-disable-next-line
  }, []);

  const [lastElementRef] = useInfiniteScroll(loadMoreVideos);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <motion.div
          key={item}
          className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item * 0.1 }}
        >
          <div className="aspect-video bg-gray-300 dark:bg-gray-600 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-1/2" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-20" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <motion.button
          onClick={() => {
            setError(null);
            setHasMore(true);
            setPage(1);
            setVideos([]);
            loadMoreVideos();
          }}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );

  // Empty state component
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Videos Yet</h3>
        <p className="text-gray-600 dark:text-gray-400">This channel doesn't have any videos at the moment.</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950 overflow-x-hidden overflow-y-auto scrollbar-hide relative">
      {/* Animated background elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-32 left-8 w-64 h-64 bg-gradient-to-r from-blue-400/15 to-purple-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-8 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)]" />
      </motion.div>

      {/* Channel Header Section */}
      <div className="relative z-10 pt-6 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ChannelProfileHeadder />
        </div>
      </div>

      {/* Content Section (Videos) */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {initialLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingSkeleton />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorState />
              </motion.div>
            ) : videos.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <EmptyState />
              </motion.div>
            ) : (
              <motion.div
                key="videos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-blue-500/5 dark:shadow-blue-500/10 overflow-hidden"
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
    </div>
  );
}

export default ChannelVideosPage;
