import React, { useEffect, useState } from 'react'
import SubscriberProfileComponent from '../../components/SubscriberProfileComponent'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function ChannelSubscribedPage() {
    const channelId = useParams().channelId;
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get(`${import.meta.env.VITE_HOST}/api/subscription/c/${channelId}`,
                {
                    withCredentials: true
                }
            )

            if (!response.data.success) {
                setError("Failed to fetch subscribers");
                console.error("Error fetching channel profile:", response);
            } else {
                setSubscribers(response.data.data);
            }
        } catch (err) {
            setError("Network error occurred");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [channelId]);

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
                <motion.div
                    key={item}
                    className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item * 0.1 }}
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4" />
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-1/2" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Error state component
    const ErrorState = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
        >
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                <motion.button
                    onClick={loadData}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Try Again
                </motion.button>
            </div>
        </motion.div>
    );

    // Empty state component
    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
        >
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Subscribers Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">This channel doesn't have any subscribers at the moment.</p>
            </div>
        </motion.div>
    );

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
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/10 p-6"
                        whileHover={{ 
                            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
                            transform: "translateY(-2px)"
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    Channel Subscribers
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {subscribers.length} {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
                                </p>
                            </div>
                            <motion.button
                                onClick={loadData}
                                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-colors"
                                whileHover={{ scale: 1.05, rotate: 180 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </motion.button>
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
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <LoadingSkeleton />
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ErrorState />
                            </motion.div>
                        ) : subscribers.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <EmptyState />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="subscribers"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {subscribers.map((subscriber, index) => (
                                    <motion.div
                                        key={subscriber._id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: index * 0.1,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        whileHover={{ 
                                            scale: 1.02,
                                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)"
                                        }}
                                        className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5 dark:shadow-blue-500/10 overflow-hidden transition-all duration-300"
                                    >
                                        <SubscriberProfileComponent 
                                            avatar={subscriber.channel.avatar}
                                            username={subscriber.channel.username}
                                            fullName={subscriber.channel.fullName}
                                            channelId={subscriber.channel._id}
                                            subscribedSince={subscriber.createdAt}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ChannelSubscribedPage
