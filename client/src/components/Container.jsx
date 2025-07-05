import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function Container({ children }) {
  return (
    <motion.div 
      className="w-full h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function ScrollableContainer() {
  return (
    <motion.div 
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl w-full p-4 overflow-auto flex-1 border-t border-blue-200 dark:border-blue-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
}

export default Container;

export { ScrollableContainer };
