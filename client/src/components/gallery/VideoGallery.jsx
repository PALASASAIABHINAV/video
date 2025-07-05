import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useInfiniteScroll from "../InfiniteLoading/useInfiniteScroll.js";
import ScrollableVideoGallery from "./ScrollableVideoGallery.jsx";
import { useParams } from "react-router-dom";

function VideoGallery() {

  const channelId = useParams().channelId;
  !channelId ? console.error("Channel Id not found") : null;
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more videos are available

  const loadMoreVideos = useCallback(async () => {
    if (!hasMore || loading) return; // Stop if no more videos are available or if already loading

    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/video/`, {
        params: { page, limit: 6 ,userId : channelId},
        withCredentials: true,
      });
      const newVideos = response.data.data; // Adjust this based on your API response structure
      // console.log(" Home : "+newVideos);
      // console.log(newVideos);
      if (newVideos.length === 0) {
        setHasMore(false); // No more videos available
      } else {
        setVideos((prevVideos) => {
          // Prevent duplicate videos
          const videoIds = new Set(prevVideos.map(video => video._id));
          const uniqueNewVideos = newVideos.filter(video => !videoIds.has(video._id));
          return [...prevVideos, ...uniqueNewVideos];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
    // console.log("page"+page+" "+"hasMore:"+hasMore+" "+"loading"+" "+loading);
    
  }, [page, hasMore, loading]);

  useEffect(() => {
    loadMoreVideos();
  }, []); // Only run once on component mount

  const [lastElementRef] = useInfiniteScroll(loadMoreVideos);

  return (
    <ScrollableVideoGallery 
        videos={videos}
        loading={loading}
        hasMore={hasMore}
        lastElementRef={lastElementRef}
    />
  );
}

export default VideoGallery;
