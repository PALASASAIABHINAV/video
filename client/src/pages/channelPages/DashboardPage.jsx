import React from "react";
import { FaEdit, FaTrash, FaUpload, FaEye, FaUsers, FaHeart, FaPlay } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/InfiniteLoading/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditPopup } from "../../components/CommentCard";
import DeleteAlert from "../../utilities/DeleteAlert";
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  const [isUploadVideoPopupOpen, setIsUploadVideoPopupOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false); // Loading while Uploading Video

  const fetchStats = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/dashboard/stats`,
        {
          withCredentials: true,
        }
      );
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Failed to load dashboard stats");
    }
  };
  
  const fetchVideos = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/dashboard/videos`,
        {
          withCredentials: true,
        }
      );
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos");
    }
  };
  
  const uploadVideo = async (formData) => {
    setLoadingProgress((prev) => !prev);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/video/`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setVideos((prevVideos) => [response.data.data, ...prevVideos]);
      } else {
        console.error("Error while uploading video - :", response);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoadingProgress((prev) => !prev);
      setIsUploadVideoPopupOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchStats(), fetchVideos()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-8">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
          >
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-16 mx-auto mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-24 mx-auto" />
          </motion.div>
        ))}
      </div>
      
      {/* Table skeleton */}
      <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-32 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          ))}
        </div>
      </div>
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
            setLoading(true);
            fetchStats();
            fetchVideos();
            setLoading(false);
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

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
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

      {/* Header Section */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 pt-6 pb-4 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/10 p-6"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
              transform: "translateY(-2px)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome Back, {userData?.username}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Seamless Video Management, Elevated Results.
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {loading ? (
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
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Stats Section */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 p-6 text-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaEye className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stats.totalViews || 0}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Total Views</p>
                  </motion.div>

                  <motion.div
                    className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 p-6 text-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.2)"
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUsers className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stats.totalSubscribers || 0}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Total Subscribers</p>
                  </motion.div>

                  <motion.div
                    className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 p-6 text-center"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.2)"
                    }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stats.totalLikes || 0}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Total Likes</p>
                  </motion.div>
                </motion.div>

                {/* Video Table */}
                <motion.div
                  className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-blue-500/5 dark:shadow-blue-500/10 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Videos</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Manage your video content
                        </p>
                      </div>
                      <motion.button
                        onClick={() => setIsUploadVideoPopupOpen((prev) => !prev)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaUpload className="w-4 h-4" />
                        Upload Video
                      </motion.button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                          <th className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                          <th className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Title</th>
                          <th className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Rating</th>
                          <th className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Date Uploaded</th>
                          <th className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                        {videos.map((video, index) => (
                          <VideoRow
                            key={video._id}
                            video={video}
                            row={index}
                            setVideos={setVideos}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Upload Video Popup */}
      <AnimatePresence>
        {isUploadVideoPopupOpen && (
          <UploadVideoPopup
            onCancel={() => setIsUploadVideoPopupOpen((prev) => !prev)}
            onSubmit={uploadVideo}
          />
        )}
      </AnimatePresence>

      {/* Loading Progress */}
      <AnimatePresence>
        {loadingProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPlay className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Uploading Video...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please wait while we process your video
                </p>
                <Loader />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function UploadVideoPopup({ onSubmit, onCancel }) {
  const handleUploadVideoFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Title Bar */}
        <div className="flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Video Upload Form</h2>
          <motion.button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>

        {/* Form Layout */}
        <form
          onSubmit={handleUploadVideoFormSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
          encType="multipart/form-data"
        >
          {/* Left Section */}
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter video title"
              />
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter video description"
              ></textarea>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            {/* Video File Input */}
            <div>
              <label
                htmlFor="videoFile"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Video File
              </label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/*"
                required
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
              />
            </div>

            {/* Thumbnail Input */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                required
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <motion.button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Video
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function VideoRow({ video, row, setVideos }) {
  const [published, setPublished] = useState(video.published);
  const [isEditVideoPopupOpen, setIsEditVideoPopupOpen] = useState(false);
  const [isDeleteVideoPopupOpen, setIsDeleteVideoPopupOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const navigate = useNavigate();

  const handleTogglePublish = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/video/toggle/publish/${video._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setPublished((prev) => !prev);
      } else {
        window.alert("Toggling publish status Failed");
        console.error(
          "Error :: toggling publish status Unsuccessful :",
          response
        );
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };
  
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB");
  }
  
  const editVideo = async (formData, videoId) => {
    setLoadingProgress((prev) => !prev);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_HOST}/api/video/${videoId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { title, description, thumbnail } = response.data.data;
        setVideos((prevVideos) => (
          prevVideos.map((video) => (
            video._id === videoId ? 
            { ...video, title, description, thumbnail } 
            : video
          ))
        ));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingProgress((prev) => !prev);
      setIsEditVideoPopupOpen((prev) => !prev);
    }
  };
  
  const deleteVideo = async (videoId) => {
    if (!videoId) {
      return;
    }
    setLoadingProgress((prev) => !prev);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST}/api/video/${videoId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video._id !== videoId)
        );
      } else {
        console.error("Error while deleting video - :", response);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setLoadingProgress((prev) => !prev);
      setIsDeleteVideoPopupOpen((prev) => !prev);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: row * 0.1 }}
      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
    >
      <td className="py-4 px-6">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={published}
            onChange={handleTogglePublish}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors duration-200"></div>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full peer-checked:bg-white dark:peer-checked:bg-gray-300"></span>
        </label>
      </td>
      <td
        className="py-4 px-6 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors duration-200"
        onClick={() => navigate(`/watch/${video._id}`)}
      >
        <div className="font-medium text-gray-900 dark:text-white">{video.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{video.description?.substring(0, 50)}...</div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-red-500">
            <FaHeart className="w-4 h-4" />
            {video.likes}
          </span>
          <span className="flex items-center gap-1 text-blue-500">
            <FaEye className="w-4 h-4" />
            {video.comments}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
        {formatDate(video.createdAt)}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setIsEditVideoPopupOpen((prev) => !prev)}
            className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEdit className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => setIsDeleteVideoPopupOpen((prev) => !prev)}
            className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTrash className="w-4 h-4" />
          </motion.button>
        </div>
      </td>

      {/* Edit Video Popup */}
      <AnimatePresence>
        {isEditVideoPopupOpen && (
          <VideoEditPopup
            video={video}
            onSubmit={editVideo}
            onCancel={() => setIsEditVideoPopupOpen((prev) => !prev)}
          />
        )}
      </AnimatePresence>

      {/* Delete Alert */}
      <AnimatePresence>
        {isDeleteVideoPopupOpen && (
          <DeleteAlert
            message={`Are you sure you want to delete "${video.title}"?`}
            onCancel={() => setIsDeleteVideoPopupOpen((prev) => !prev)}
            onConfirm={() => deleteVideo(video._id)}
          />
        )}
      </AnimatePresence>

      {/* Loading Progress */}
      <AnimatePresence>
        {loadingProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Processing...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we update your video
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.tr>
  );
}

function VideoEditPopup({ video, onSubmit, onCancel }) {
  const [updatedVideo, setUpdatedVideo] = useState(video);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditVideoFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData, video._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Title Bar */}
        <div className="flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">
            Edit Video: {video.title}
          </h2>
          <motion.button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>

        {/* Form Layout */}
        <form
          onSubmit={handleEditVideoFormSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
          encType="multipart/form-data"
        >
          {/* Left Section */}
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={updatedVideo.title}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={updatedVideo.description}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            {/* Thumbnail Input */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <motion.button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium shadow-lg shadow-green-500/25 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
