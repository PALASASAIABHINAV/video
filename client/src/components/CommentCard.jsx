import React from "react";
import { calculateTimeDifference } from "../utilities/calculateTimeDifference";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CommentCard({ comment , onDelete ,onEdit }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  return (
    <motion.div 
      className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-blue-200 dark:border-blue-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Avatar */}
      <motion.img
        src={comment.createdBy.avatar}
        alt={"avatar"}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-200 dark:border-blue-700 shadow-md flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
          {/* Comment Owner  */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <h2 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate">{comment.createdBy.fullName}</h2>
            <span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">@{comment.createdBy.username}</span>
          </motion.div>

          {/* Delete Button  and Controls */}
          <motion.div 
            className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{calculateTimeDifference(comment.createdAt)}</span>
            {comment.isMyComment && (
              <div className="flex items-center space-x-2">
                {/* Edit Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MdModeEdit 
                    onClick={()=> setIsPopupOpen((prev) => !prev)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-1.5 sm:p-2 h-7 w-7 sm:h-8 sm:w-8 hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-md cursor-pointer"
                  />
                </motion.div>
                
                {/* Delete Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MdDelete 
                    onClick={()=> onDelete(comment._id)}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full p-1.5 sm:p-2 h-7 w-7 sm:h-8 sm:w-8 hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-md cursor-pointer"
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
        
        <motion.p 
          className="mt-2 sm:mt-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base break-words"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {comment.content}
        </motion.p>
      </div>

      {/* Edit Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <EditPopup 
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
            editContent={editContent}
            setEditContent={setEditContent}
            saveContent={()=> {
              onEdit(comment._id, editContent);
              setIsPopupOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
  
export default CommentCard;
  
function EditPopup({isPopupOpen, setIsPopupOpen, editContent, setEditContent, saveContent}) {
  return(
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:w-96 p-6 sm:p-8 relative border border-blue-200 dark:border-blue-900"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Close Button */}
        <motion.button
          onClick={() => setIsPopupOpen((prev) => !prev)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-red-500 text-lg sm:text-xl font-bold transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>

        {/* Content */}
        <motion.h2 
          className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Update Comment
        </motion.h2>
        
        <motion.input
          type="text"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Comment here..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-end mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Cancel Button */}
          <motion.button
            onClick={() => setIsPopupOpen(false)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          
          {/* Save Button */}
          <motion.button
            onClick={saveContent}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-200 font-semibold shadow-md text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export {EditPopup};