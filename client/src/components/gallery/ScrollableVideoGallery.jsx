import React from 'react'
import VideoCard from '../VideoCard.jsx';
import Loader from '../InfiniteLoading/Loader.jsx';



function ScrollableVideoGallery({videos, loading, hasMore, lastElementRef}) {
    return (
        <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
        {videos.map((video) => (           
          <VideoCard
          key={video._id}
            video={video}
          />
        ))}
        <div ref={lastElementRef} className="h-10"></div>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Loader />
        </div>
      )}
      {!hasMore && videos.length === 0 && (
        <div className="text-center mt-4 text-gray-500">
          No videos available.
        </div>
      )}
    </div>
    )
}

export default ScrollableVideoGallery
