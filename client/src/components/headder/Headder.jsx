import React, { useState } from 'react'
import Container from '../Container'
import Logo from './Logo'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserIcon from './UserIcon'
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/userSlice'
import SearchComponent from './SearchComponent.jsx'
import { motion, AnimatePresence } from 'framer-motion'

function Headder() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const status = useSelector(state => state.user.isLoggedIn);
    const userData = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    // console.log(userData);
    
    return (
        <motion.header
            className="fixed z-50 top-0 left-0 p-4 w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 shadow-xl"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
        <div className="container flex justify-between items-center h-12 mx-auto">
          <Link
            to="/home"
            className="flex items-center p-2"
          >
            <Logo />
          </Link>

          {/* Desktop Search */}
          {status && (
            <div className="hidden md:flex flex-1 justify-center items-center gap-2">
              <SearchComponent />
            </div>
          )}

          {/* Desktop User Actions */}
          <div className="items-center space-x-4 hidden md:flex">
            {status ? <>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden md:block"
                >
                  <Link to={`channel-profile/${userData._id}`} className="items-center p-2">
                    <UserIcon avatar={userData.avatar}/>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link to="/signout"
                    className='h-12 w-12 rounded-full flex items-center shadow-md shadow-blue-900 bg-gradient-to-br from-red-500 via-red-700 to-blue-900 hover:scale-105 active:scale-95 transition-all duration-200'
                    onClick={()=> {
                      dispatch(logout())
                    }}>
                    <abbr
                      title="Signout" 
                      className='m-auto'
                    >
                      <FiLogOut className='size-6 text-gray-100'/>
                    </abbr>
                  </Link>
                </motion.div>
            </>
            : <>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/signin"
                    className="self-center px-8 py-3 rounded font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white hover:from-blue-500 hover:to-blue-800 active:scale-95 shadow-md transition-all duration-200">
                      Sign in
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/signup"
                    className="self-center px-8 py-3 font-semibold rounded bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white hover:from-blue-500 hover:to-blue-800 active:scale-95 shadow-md transition-all duration-200">
                    Sign up
                  </Link>
                </motion.div>
                </>}
          </div>

          {/* Hamburger for mobile */}
          <button className="md:hidden flex items-center p-2 text-gray-200" onClick={() => setMobileMenuOpen(v => !v)}>
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute left-0 right-0 top-full bg-gradient-to-br from-black via-gray-900 to-blue-950 shadow-2xl border-b border-blue-900 px-4 py-4 flex flex-col gap-4"
          >
            {status && (
              <div>
                <SearchComponent />
              </div>
            )}
            <div className="flex flex-col gap-2">
              {status ? <>
                <Link to={`channel-profile/${userData._id}`} className="flex items-center gap-2 p-2 rounded hover:bg-blue-900/30 transition-colors" onClick={()=>setMobileMenuOpen(false)}>
                  <UserIcon avatar={userData.avatar}/>
                  <span className="text-gray-100 font-semibold">My Channel</span>
                </Link>
                <button
                  className='flex items-center gap-2 p-2 rounded hover:bg-red-900/30 transition-colors text-red-300 font-semibold'
                  onClick={()=> { dispatch(logout()); setMobileMenuOpen(false); }}
                >
                  <FiLogOut className='size-5'/>
                  Sign out
                </button>
              </>
              : <>
                <Link to="/signin" className="block px-4 py-2 rounded font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white text-center hover:from-blue-500 hover:to-blue-800 shadow-md transition-all duration-200" onClick={()=>setMobileMenuOpen(false)}>
                  Sign in
                </Link>
                <Link to="/signup" className="block px-4 py-2 font-semibold rounded bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white text-center hover:from-blue-500 hover:to-blue-800 shadow-md transition-all duration-200" onClick={()=>setMobileMenuOpen(false)}>
                  Sign up
                </Link>
              </>}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.header>
    )
}

export default Headder
