import React from 'react'
import Loader from '../components/InfiniteLoading/Loader'

function LoadingProgress({message}) {
    return (
        <div className="fixed -inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {" "}
            <div className="bg-gray-800 text-white w-auto min-w-32 h-32 p-6 rounded-lg shadow-lg mx-4 justify-center items-center font-semibold ">
              <div>{message}</div>
              <Loader />
            </div>
          </div>
    )
}

export default LoadingProgress
