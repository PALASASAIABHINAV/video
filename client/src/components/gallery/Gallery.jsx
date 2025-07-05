import React from "react";
import { motion } from "framer-motion";

function Gallery({ children }) {
  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            className="rounded-xl shadow-lg bg-white/5 border border-blue-900/30 hover:shadow-blue-400/40 hover:scale-105 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0, 123, 255, 0.25)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Gallery;
