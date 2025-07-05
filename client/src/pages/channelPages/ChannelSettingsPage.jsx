import React from "react";
import { Outlet } from "react-router-dom";
import ChannelSettingsHeadder from "../../components/ChannelSettingsHeadder";
import Container from "../../components/Container";
import { motion } from "framer-motion";

function ChannelSettingsPage() {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950 overflow-x-hidden overflow-y-auto scrollbar-hide relative"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl"
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

      <Container>
        {/* Header Section */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2 
          }}
          className="relative z-10 pt-6 pb-4"
        >
          <motion.div
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/10"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
              transform: "translateY(-2px)"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ChannelSettingsHeadder />
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.9, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4 
          }}
          className="relative z-10 mt-8 mb-12"
        >
          <motion.div
            className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-blue-500/5 dark:shadow-blue-500/10 overflow-hidden"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.2)",
              transform: "translateY(-3px)"
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Content wrapper with proper padding */}
            <div className="p-6 sm:p-8 lg:p-10">
              <Outlet />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating action indicator */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </Container>

      {/* Responsive design considerations */}
      <style jsx>{`
        @media (max-width: 640px) {
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default ChannelSettingsPage;
