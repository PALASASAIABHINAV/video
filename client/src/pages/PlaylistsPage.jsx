import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlayListComponent from "../components/PlayListComponent";
import Container from "../components/Container";
import Gallery from "../components/gallery/Gallery";
import { useSelector } from "react-redux";
import axios from "axios";
import PlayListGallery from "../components/gallery/PlayListGallery";

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [totalPlaylists, setTotalPlaylists] = useState(0);
  const [isPlaylistCreatePopupOpen, setIsPlaylistCreatePopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.user.userData);

  const loadPlaylists = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/playlist/user/${userData._id}/`,
        {
          withCredentials: true,
        }
      );

      setPlaylists(response.data.data);
      setTotalPlaylists(response.data.data.length);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlayList = async ({name, description}) => {
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/playlist/`,
        {
          name,
          description,
        },
        {
          withCredentials: true,
        }
      );
      if(response.data.success){
        setPlaylists((prevPlaylists) => [response.data.data, ...prevPlaylists]);
        setTotalPlaylists(prev => prev + 1);
      }
    }catch(e){
      console.log(e);
    }finally{
      setIsPlaylistCreatePopupOpen((prev)=> !prev);
    }
  }

  useEffect(() => {
    if(userData._id){
      loadPlaylists();
    }
  }, []);

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

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
      {/* Header Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-lg"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                My Playlists
              </motion.h1>
              <motion.p 
                className="text-blue-100 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Organize and manage your video collections
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-6 sm:mt-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform flex items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaylistCreatePopupOpen((prev) => !prev)}
              >
                <motion.span
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Playlist
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* Stats Card */}
          <motion.div
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white font-semibold">
              {totalPlaylists} {totalPlaylists === 1 ? 'Playlist' : 'Playlists'} Created
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="flex justify-center items-center min-h-[400px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your playlists...</p>
              </motion.div>
            </motion.div>
          ) : playlists.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
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
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                No Playlists Yet
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Start organizing your videos by creating your first playlist. Group related content together for easy access.
              </motion.p>
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaylistCreatePopupOpen((prev) => !prev)}
              >
                <motion.span
                  className="flex items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Your First Playlist
                </motion.span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PlayListGallery playlists={playlists} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Create Playlist Popup */}
      <AnimatePresence>
        {isPlaylistCreatePopupOpen && (
          <CreatePlayListPopup  
            onCancel={() => setIsPlaylistCreatePopupOpen((prev) => !prev)}
            onCreate={handleCreatePlayList}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PlaylistsPage;

function CreatePlayListPopup({onCancel, onCreate}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
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

  const handleCreate = () => {
    if (name.trim() && description.trim()) {
      onCreate({name, description});
      setName("");
      setDescription("");
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
              Create New Playlist
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
              onClick={handleCreate}
              disabled={!name.trim() || !description.trim()}
              className={`px-6 py-2.5 font-semibold rounded-xl shadow-lg transition-all duration-300 transform ${
                name.trim() && description.trim()
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
              whileHover={name.trim() && description.trim() ? { scale: 1.05 } : {}}
              whileTap={name.trim() && description.trim() ? { scale: 0.95 } : {}}
            >
              <motion.span
                className="flex items-center"
                whileHover={name.trim() && description.trim() ? { scale: 1.02 } : {}}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Playlist
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
