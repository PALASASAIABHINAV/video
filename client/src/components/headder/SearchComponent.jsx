import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import 'tailwindcss/tailwind.css';
import { FaSearch } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
// import LinearProgress from '@mui/material/LinearProgress';
import { IoVideocam } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// const SearchComponent = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (query.length === 0) {
//         setResults([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
//         setResults(response.data.items);
//       } catch (error) {
//         console.error('Error fetching search results', error);
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounceFetch = setTimeout(fetchData, 300);

//     return () => clearTimeout(debounceFetch);
//   }, [query]);

//   return (
//     <div className="flex p-4 max-w-md mx-auto my-auto justify-center items-center text-gray-900">
//       <div className="flex justify-center items-center relative">

//         <input
//           type="text"
//           placeholder="Search..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className=" bg-white w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         {loading && (
//           <div className="absolute top-0 right-0 mt-2 mr-4">
//             <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"></path>
//             </svg>
//           </div>
//         )}
//       </div>
//       <div className="mt-4">
//         {results.length > 0 ? (
//           <ul className="text-white bg-gray-800 border rounded-lg shadow-md divide-y divide-gray-200">
//             {results.map((result, index) => (
//               <li key={index} className="p-4 hover:bg-gray-100">
//                 {result.name || result.full_name}
//               </li>
//             ))}
//           </ul>
//         ) : query.length > 0 && !loading ? (
//           <p className="text-center text-white">No results found</p>
//         ) : null}
//       </div>
//     </div>
//   );
// };

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  const handleSearch = async () => {
    if (query.length === 0) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/user/search/${query}`
      );
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching search results", error);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => handleSearch(), 300);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <motion.div
      className="w-full sm:w-2/5 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      ref={containerRef}
    >
      <motion.div
        className="flex bg-gradient-to-r from-black via-gray-900 to-blue-950 rounded-xl shadow-lg p-1"
        initial={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
        animate={{ boxShadow: "0 4px 32px 0 rgba(0, 123, 255, 0.10)" }}
        transition={{ duration: 0.7 }}
      >
        <motion.input
          type="text"
          placeholder="Search for videos or users..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="bg-black/80 text-white w-full px-4 py-2 rounded-s-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-none placeholder:text-gray-400 text-base"
          whileFocus={{ scale: 1.03, borderColor: "#3b82f6" }}
        />
        <motion.button
          onClick={() => { handleSearch(query); setShowDropdown(true); }}
          className="cursor-pointer flex p-3 bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 rounded-e-lg items-center justify-center shadow-md hover:from-blue-400 hover:to-blue-800 transition-all"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? (
            <div className="m-auto p-0">
              <CircularProgress size="20px" color="inherit" />
            </div>
          ) : (
            <FaSearch className="m-auto text-white size-5" />
          )}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showDropdown && (query.length > 0) && (
          <motion.div
            className="absolute left-0 top-full w-full z-50 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            {results && results.users && results.videos ? (
              <motion.ul
                className="text-white bg-gradient-to-br from-black via-gray-900 to-blue-950 rounded-xl border border-blue-900/30 shadow-xl max-h-80 overflow-y-auto backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                {results.users.map((user, index) => (
                  <motion.li
                    key={index}
                    className="p-4 hover:bg-blue-900/30 border-b border-gray-800 rounded-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    <UserResultCard user={user} />
                  </motion.li>
                ))}
                {results.videos.map((video, index) => (
                  <motion.li
                    key={index}
                    className="space-y-2 p-4 hover:bg-blue-900/30 border-b border-gray-800 rounded-md"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (results.users.length + index) * 0.04, duration: 0.3 }}
                  >
                    <VideoResultCard video={video} />
                  </motion.li>
                ))}
              </motion.ul>
            ) : query.length > 0 && !loading ? (
              <motion.p
                className="bg-gray-900/80 text-center text-white rounded-md border border-blue-900/30 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >No results found</motion.p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default SearchComponent;

function UserResultCard({ user }) {
  return (
    <div className="flex items-center ">
      <FaUser className="text-blue-400 mr-5 size-5" />
      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full border-2 border-blue-700 shadow-md"
      />
      <div className="ml-4">
        <h2 className="text-white text-lg font-semibold">{user.username}</h2>
        <p className="text-sm text-blue-300">{user.fullName}</p>
      </div>
    </div>
  );
}

function VideoResultCard({ video }) {
  return (
    <button className="flex items-center w-full text-left">
      <IoVideocam className="text-blue-400 mr-5 size-6" />
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-12 h-12 rounded-md border-2 border-blue-700 shadow-md"
      />
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-white">{video.title}</h2>
        <p className="text-sm text-blue-300">{video.description}</p>
      </div>
    </button>
  );
}