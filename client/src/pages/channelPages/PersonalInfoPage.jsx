import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateUserData } from '../../redux/userSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaEnvelope, FaSave, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

function PersonalInfoPage() {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState(userData.fullName);
    const [email, setEmail] = useState(userData.email);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!fullName.trim() || !email.trim()) {
            setMessage("Please fill all the fields");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setMessage("");
        
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_HOST}/api/user/update-profile`,
                { fullName, email },
                { withCredentials: true }
            );
            
            if (response.data.success) {
                dispatch(updateUserData(response.data.data));
                setMessage("Profile updated successfully!");
                setIsSuccess(true);
                
                // Reset form after successful update
                setTimeout(() => {
                    setFullName("");
                    setEmail("");
                    setMessage("");
                    setIsSuccess(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            setMessage("Failed to update profile. Please check your details and try again.");
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div
            className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-blue-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Animated background elements */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
            >
                {/* Gradient orbs */}
                <motion.div
                    className="absolute top-32 left-8 w-64 h-64 bg-gradient-to-r from-blue-400/15 to-purple-500/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-32 right-8 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    }}
                />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)]" />
            </motion.div>

            {/* Header Section */}
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative z-10 pt-6 pb-4 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/10 p-6"
                        whileHover={{ 
                            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
                            transform: "translateY(-2px)"
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Personal Information
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Update your personal details and contact information
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <FaUser className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12"
            >
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-blue-500/5 dark:shadow-blue-500/10 overflow-hidden"
                        whileHover={{ 
                            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.2)",
                            transform: "translateY(-3px)"
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="p-6 sm:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="space-y-2"
                                >
                                    <label
                                        htmlFor="fullName"
                                        className="block text-sm font-semibold text-gray-900 dark:text-white"
                                    >
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={fullName}
                                            placeholder="Enter your full name"
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </motion.div>
                                
                                {/* Email Field */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="space-y-2"
                                >
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-900 dark:text-white"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            placeholder="Enter your email address"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                {/* Message Display */}
                                <AnimatePresence mode="wait">
                                    {message && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex items-center gap-3 p-4 rounded-xl border ${
                                                isSuccess
                                                    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
                                                    : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
                                            }`}
                                        >
                                            {isSuccess ? (
                                                <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            ) : (
                                                <FaExclamationTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                            )}
                                            <span className="text-sm font-medium">{message}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="pt-4"
                                >
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                                            isLoading
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25'
                                        }`}
                                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FaSave className="w-5 h-5" />
                                                Update Profile
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default PersonalInfoPage
