import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateTimeDifference } from '../utilities/calculateTimeDifference.js';
import { motion } from "framer-motion";

function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate("/watch/" + video._id);
  };

  return (
    <motion.div
      onClick={handleVideoClick}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={`${video.thumbnail}`}
          alt="Video Thumbnail"
          className="w-full object-cover h-48 sm:h-52 lg:h-48 xl:h-52"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Play Button */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </motion.div>
        </div>

        {/* Duration Badge */}
        <motion.div 
          className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {video.duration.toFixed(2)}
        </motion.div>

        {/* Video Type Badge */}
        <motion.div 
          className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          VIDEO
        </motion.div>
      </div>
      
      {/* Content Section */}
      <motion.div 
        className="p-4 sm:p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {video.title}
        </h2>
        
        {/* Video Stats */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{video.views} Views</span>
          </motion.div>
          <span className="mx-2">•</span>
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{calculateTimeDifference(video.createdAt)}</span>
          </motion.div>
        </div>
        
        {/* Channel Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-blue-200 dark:border-blue-700 mr-3 shadow-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={`${video.owner.avatar}`}
                alt="Channel Avatar"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                {video.owner.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Channel
              </p>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default VideoCard;
