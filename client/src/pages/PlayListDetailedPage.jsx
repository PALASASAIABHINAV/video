import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Loader from "../components/InfiniteLoading/Loader.jsx";
import PlayListComponent from "../components/PlayListComponent.jsx";
import { useNavigate } from "react-router-dom";
import VideoCardListView from "../components/VideoCardListView";
import { useSelector } from "react-redux";
import DeleteAlert from "../utilities/DeleteAlert.jsx";

export default function PlayListDetailedPage() {
  const { playlistId } = useParams();
  const [playList, setPlayList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [isOwner, setIsOwner] = React.useState(false);

  // popup states
  const [isPlaylistDeletePopupOpen, setIsPlaylistDeletePopupOpen] =
    React.useState(false);
  const [isPlaylistEditPopupOpen, setIsPlaylistEditPopupOpen] =
    React.useState(false);
  const [isVideoDeletePopupOpen, setIsVideoDeletePopupOpen] =
    React.useState(false);

  const loadPlayList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/playlist/${playlistId}/`,
        {
          withCredentials: true,
        }
      );
      if (response) {
        setPlayList(response.data.data);
        setIsOwner(userData._id === response.data.data.owner._id);
      }
    } catch (e) {
      console.log(e);
      setError("Failed to load playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleEditPlayList = async ({ name, description }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/playlist/${playlistId}/`,
        {
          name,
          description,
        },
        {
          withCredentials: true,
        }
      );
      if (response) {
        setPlayList((prev) => {
          return { ...prev, name, description };
        });
      }
    } catch (e) {
      console.log("Error Editing Playlist", e);
    } finally {
      setIsPlaylistEditPopupOpen((prev) => !prev);
    }
  };

  const handleDeletePlayList = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_HOST}/api/playlist/${playlistId}/`,
        {
          withCredentials: true,
        }
      );
      if (response) {
        navigate("/playlists");
      }
    } catch (e) {
      console.log("Error Deleting Playlist", e);
    } finally {
      setIsPlaylistDeletePopupOpen((prev) => !prev);
    }
  };

  const handleDeleteVideoFromPlayList = async (videoId) => {
    try {
        const response = await axios.patch(
            `${import.meta.env.VITE_HOST}/api/playlist/remove/${videoId}/${playList._id}`,{},
            {
            withCredentials: true,
            }
        );
        if (response) {
            setPlayList(playList => (
                {
                    ...playList , 
                    videos : playList.videos.filter(video => video._id !== videoId)
                }
            ));
            
        }
        } catch (e) {
        console.log("Error Deleting Video", e);
        } finally {
        setIsVideoDeletePopupOpen((prev) => !prev);
        setSelectedVideo(null);
    }
  };

  useEffect(() => {
    if (playlistId) {
      loadPlayList();
    }
  }, [playlistId]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="flex flex-col items-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading playlist...</p>
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-6 mx-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Oops! Something went wrong</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadPlayList}
          >
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Breadcrumb Navigation */}
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.nav
            className="flex items-center space-x-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate("/playlists")}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Playlists
            </motion.button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-600 dark:text-gray-400 font-medium truncate">
              {playList?.name || "Loading..."}
            </span>
          </motion.nav>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Sidebar */}
        <motion.div 
          className="w-full lg:w-1/3 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6">
            <PlayListComponent
              playlistId={playList._id}
              name={playList.name}
              description={playList.description}
              totalVideos={playList.videos.length}
              owner={playList.owner}
              updatedAt={playList.updatedAt}
              videos={playList.videos}
            />

            {/* Actions */}
            {isOwner && (
              <motion.div
                className="mt-8"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 
                  className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  Actions
                </motion.h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPlaylistEditPopupOpen((prev) => !prev)}
                  >
                    <motion.span
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Playlist
                    </motion.span>
                  </motion.button>
                  
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPlaylistDeletePopupOpen((prev) => !prev)}
                  >
                    <motion.span
                      className="flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Playlist
                    </motion.span>
                  </motion.button>
                </div>

                {/* Edit Popup */}
                <AnimatePresence>
                  {isPlaylistEditPopupOpen && (
                    <EditPlayList
                      oldName={playList.name}
                      oldDescription={playList.description}
                      onCancel={() => setIsPlaylistEditPopupOpen((prev) => !prev)}
                      onSave={handleEditPlayList}
                    />
                  )}
                </AnimatePresence>

                {/* Delete Popup */}
                <AnimatePresence>
                  {isPlaylistDeletePopupOpen && (
                    <DeleteAlert
                      message={`Are you sure you want to Delete Playlist -- ${playList.name} ?`}
                      onConfirm={handleDeletePlayList}
                      onCancel={() => setIsPlaylistDeletePopupOpen((prev) => !prev)}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Playlist Owner */}
            <motion.div
              className="mt-8"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 
                className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Playlist Owner
              </motion.h2>
              <motion.div 
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-600"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700"
                      src={playList.owner.avatar}
                      alt="avatar"
                    />
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="ml-4">
                    <motion.div
                      onClick={() =>
                        navigate(`/channel-profile/${playList.owner._id}`)
                      }
                      className="cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        {capitalizeWords(playList.owner.username)}
                      </h3>
                    </motion.div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {capitalizeWords(playList.owner.fullName)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Playlist Stats */}
            <motion.div
              className="mt-6"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <motion.div
                      className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      {playList.videos.length}
                    </motion.div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Videos</div>
                  </div>
                  <div>
                    <motion.div
                      className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      {new Date(playList.updatedAt).toLocaleDateString()}
                    </motion.div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Last Updated</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          className="w-full lg:w-2/3 bg-white dark:bg-gray-900 min-h-screen"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6">
            {/* Header */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 shadow-sm"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Playlist Videos ({playList.videos.length})
              </motion.h1>
              
              {isOwner && (
                <motion.button 
                  disabled={!selectedVideo}
                  onClick={() => setIsVideoDeletePopupOpen((prev) => !prev)}
                  className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform ${
                    selectedVideo 
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105" 
                      : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                  whileHover={selectedVideo ? { scale: 1.05, y: -2 } : {}}
                  whileTap={selectedVideo ? { scale: 0.95 } : {}}
                >
                  <motion.span
                    className="flex items-center"
                    whileHover={selectedVideo ? { scale: 1.02 } : {}}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Video
                  </motion.span>
                </motion.button>
              )}
            </motion.div>

            {/* Video List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {playList.videos.map((video, index) => (
                <motion.div
                  key={video._id}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOwner && (
                    <motion.div
                      className="mr-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <input 
                        type="checkbox" 
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                        checked={selectedVideo === video._id}
                        onChange={() => setSelectedVideo((prev) => prev === video._id ? null : video._id)}
                      />
                    </motion.div>
                  )}
                  <div className="flex-1">
                    <VideoCardListView video={video} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {playList.videos.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Videos Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  This playlist is empty. Add some videos to get started!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Video Delete Popup */}
      <AnimatePresence>
        {isVideoDeletePopupOpen && (
          <DeleteAlert
            message={`Are you sure you want to Delete Video from this PlayList? ${selectedVideo}`}
            onConfirm={() => handleDeleteVideoFromPlayList(selectedVideo)}
            onCancel={() => setIsVideoDeletePopupOpen((prev) => !prev)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EditPlayList({ oldName, oldDescription, onCancel, onSave }) {
  const [name, setName] = React.useState(oldName);
  const [description, setDescription] = React.useState(oldDescription);

  const handleSave = () => {
    onSave({ name, description });
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
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

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onCancel}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Header */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <motion.h2 
              className="text-xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Edit Playlist
            </motion.h2>
            <motion.button
              onClick={onCancel}
              className="text-white hover:text-gray-200 transition-colors duration-200 p-1"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Playlist Name
              </label>
              <motion.input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                placeholder="Enter playlist name"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <motion.textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 resize-none"
                placeholder="Enter playlist description"
                rows="4"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex justify-end mt-6 space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={onCancel}
              className="px-6 py-2.5 text-gray-600 dark:text-gray-400 font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            
            <motion.button
              onClick={handleSave}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
