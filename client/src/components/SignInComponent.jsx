import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignInComponent() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        // send req to backend and fetch data
        // if success
        navigate('/home');
    }

    return (
        <motion.div 
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <motion.div 
                className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200 dark:border-blue-900"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
                <motion.h2 
                    className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Sign In
                </motion.h2>
                
                <form onSubmit={handleSubmit}>
                    {/* Username or Email */}
                    <motion.div 
                        className="mb-4 sm:mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Username or Email
                        </label>
                        <motion.input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username or email"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </motion.div>
                    
                    {/* Password */}
                    <motion.div 
                        className="mb-4 sm:mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <motion.input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            whileFocus={{ scale: 1.02 }}
                        />
                    </motion.div>
                    
                    {/* Forgot Password */}
                    <motion.div 
                        className="flex justify-center sm:justify-end mb-6 sm:mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <Link
                            to="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </motion.div>
                    
                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        className="w-full px-6 py-3 text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:to-blue-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        Sign In
                    </motion.button>
                </form>
                
                {/* Sign Up Link */}
                <motion.div 
                    className="mt-6 sm:mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default SignInComponent
