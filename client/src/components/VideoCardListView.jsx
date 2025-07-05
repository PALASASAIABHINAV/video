import React from "react";
import { calculateTimeDifference } from "../utilities/calculateTimeDifference";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VideoCardListView = ({ video }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <Link to={`/watch/${video._id}`} className="block">
        <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-blue-200 dark:border-blue-900 shadow-lg hover:shadow-xl rounded-xl p-3 sm:p-4 transition-all duration-300">
          {/* Thumbnail Section */}
          <motion.div 
            className="relative w-full sm:w-48 h-32 sm:h-28 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={video.thumbnail}
              alt="Video Thumbnail"
              className="w-full h-full rounded-lg object-cover shadow-md"
            />
            {/* Video Duration */}
            <motion.div 
              className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {video.duration.toFixed(2)}
            </motion.div>
          </motion.div>
          
          {/* Video Details */}
          <motion.div 
            className="flex-1 min-w-0 flex flex-col justify-between space-y-2 sm:space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Title */}
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
              {video.title}
            </h2>
            
            {/* Views and Created At */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {video.views} Views · {calculateTimeDifference(video.createdAt)}
            </p>
            
            {/* Owner */}
            <div className="flex items-center space-x-2 pt-1">
              <motion.div 
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-blue-200 dark:border-blue-700 shadow-md"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={video.owner.avatar}
                  alt="Owner Avatar"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {video.owner.username}
              </p>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCardListView;
