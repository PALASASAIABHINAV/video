import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ProtectedPage({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.user.isLoggedIn);
    const [loading, setLoading] = useState(true);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        const handleAuthCheck = async () => {
            setLoading(true);
            
            // Simulate a brief loading time for better UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            if (!authStatus && authentication) {
                setRedirecting(true);
                setTimeout(() => {
                    navigate('/signin');
                }, 1000);
            } else if (authStatus && !authentication) {
                setRedirecting(true);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
            
            setLoading(false);
        };

        handleAuthCheck();
    }, [authentication, authStatus, navigate]);

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const loadingVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: {
                duration: 0.3
            }
        }
    };

    const redirectVariants = {
        initial: { opacity: 0, y: 30 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            y: -30,
            transition: {
                duration: 0.3
            }
        }
    };

    if (loading) {
        return (
            <motion.div
                className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center"
                variants={loadingVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <motion.div
                    className="flex flex-col items-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="relative mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                        <motion.div
                            className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                    <motion.h2
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Verifying Access
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 dark:text-gray-400 text-center max-w-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Please wait while we verify your authentication status...
                    </motion.p>
                </motion.div>
            </motion.div>
        );
    }

    if (redirecting) {
        return (
            <motion.div
                className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center"
                variants={redirectVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <motion.div
                    className="text-center max-w-md mx-auto p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6 mx-auto"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.div>
                    
                    <motion.h3
                        className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Redirecting...
                    </motion.h3>
                    
                    <motion.p
                        className="text-gray-600 dark:text-gray-400 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {!authStatus && authentication 
                            ? "You need to sign in to access this page."
                            : "You're already signed in. Redirecting to home..."
                        }
                    </motion.p>
                    
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="flex space-x-2">
                            <motion.div
                                className="w-3 h-3 bg-blue-600 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                                className="w-3 h-3 bg-purple-600 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                                className="w-3 h-3 bg-blue-600 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="content"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default ProtectedPage;
