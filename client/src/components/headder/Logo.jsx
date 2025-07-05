import React from 'react';
import { motion } from 'framer-motion';

function Logo() {
    return (
        <motion.div
            className="flex items-center gap-2 select-none cursor-pointer py-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
            {/* Play button icon with blue gradient */}
            <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 via-blue-700 to-black flex items-center justify-center shadow-lg border-2 border-white/20"
                whileHover={{ scale: 1.12, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polygon points="7,5 21,12 7,19" fill="white"/>
                </svg>
            </motion.div>
            {/* Logo text with accent */}
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-400 to-blue-900 bg-clip-text text-transparent drop-shadow-lg">
                VShare
            </span>
        </motion.div>
    );
}

export default Logo;
