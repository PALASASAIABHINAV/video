import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import Loader from "../../components/InfiniteLoading/Loader";
import LoadingProgress from "../../utilities/LoadingProgress";
import { motion } from "framer-motion";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);
    const usernameValue = e.target.username.value.trim();
    const passwordValue = e.target.password.value;
    if (!usernameValue || !passwordValue) {
      setFormError("Please enter both username/email and password.");
      setLoading(false);
      return;
    }
    const userOrEmail = usernameValue.includes('@') ? 'email' : 'username';
    const data = {
      [userOrEmail]: usernameValue,
      password: passwordValue,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST}/api/user/login`, 
        data,{
        withCredentials: true,
      });
      dispatch(login(response.data.user));
      navigate('/home');
    } catch (error) {
      let message = 'Error signing in. Please try again.';
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      } else if (error.response && error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }
      setFormError(message);
    }
    finally{
      setLoading(false);
    }
  };
  return (
    loading ? <LoadingProgress message={"Loading..."}/> : (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 dark:from-black dark:via-gray-900 dark:to-blue-950">
        <motion.div
          className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-blue-200 dark:border-blue-900"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
            Sign In
          </h2>
          {formError && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-center dark:bg-red-900/40 dark:border-red-700 dark:text-red-200 transition-all">
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username or Email */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                required
                placeholder="Enter your username or email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* Forgot Password */}
            <div className="flex justify-between items-center mb-2">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot Password?
              </Link>
              <Link
                to="/signup"
                className="text-sm text-gray-500 hover:underline dark:text-gray-300"
              >
                Create account
              </Link>
            </div>
            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  );
}

export default SignInPage;
