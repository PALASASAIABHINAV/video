import React from "react";
import {calculateTimeDifference} from "../utilities/calculateTimeDifference";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
// import { useSelector }  from "../../public/"

function PlayListComponent({ playlistId, name, description, totalVideos, owner, updatedAt, videos }) {
  const navigate = useNavigate();
  
  const getPlayListImage = () => {
    if(videos.length > 0){
      return videos[0].thumbnail;
    }else{
      return "../../public/EmptyPlaylistImage.jpeg";
    }
  };

  return (
    <motion.div 
      className="group relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer"
      onClick={() => navigate(`/playlist/${playlistId}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={getPlayListImage()}
          alt="Playlist Thumbnail"
          className="w-full object-cover h-48 sm:h-52 lg:h-48 xl:h-52"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
          {/* Playlist Badge */}
          <div className="absolute top-3 left-3">
            <div className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Playlist
            </div>
          </div>

          {/* Video Count */}
          <div className="absolute top-3 right-3">
            <div className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded-md">
              {totalVideos === 1 ? `${totalVideos} Video` : `${totalVideos} Videos`}
            </div>
          </div>

          {/* Update Time */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-md">
              Updated · {calculateTimeDifference(updatedAt)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {name}
        </h2>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-3">
          {description}
        </p>

        {/* Owner Info */}
        {owner && (
          <div className="flex items-center pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 mr-2">
              <img
                src={owner.avatar}
                alt="Owner Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
              {owner.username}
            </span>
          </div>
        )}
      </div>

      {/* Subtle Hover Indicator */}
      <motion.div
        className="absolute top-2 right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default PlayListComponent;
