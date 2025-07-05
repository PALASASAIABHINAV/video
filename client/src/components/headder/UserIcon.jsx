import React from 'react'
import { motion } from 'framer-motion'

function UserIcon({avatar}) {
    // console.log(avatar);
    
    return (
        <motion.div
            className='w-12 h-12 rounded-full overflow-hidden border-2 border-blue-700 shadow-lg bg-gradient-to-br from-black via-gray-900 to-blue-950'
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px 2px #3b82f6' }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <img src={avatar} alt="User Avatar" className='object-cover w-full h-full' />
        </motion.div>
    )
}

export default UserIcon
