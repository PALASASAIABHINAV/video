import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentCard from "../../components/CommentCard.jsx";
import { calculateTimeDifference } from "../../utilities/calculateTimeDifference.js";
import Loader from "../../components/InfiniteLoading/Loader.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VideoCardListView from "../../components/VideoCardListView.jsx";
import { showAlertFromErrorHtml } from "../../utilities/formatApiError.js";
import { motion, AnimatePresence } from "framer-motion";

export default function SingleVideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadVideoData = async () => {
    try {
      // Fetch video details
      const videoResponse = await axios.get(
        `${import.meta.env.VITE_HOST}/api/video/${videoId}`,
        { withCredentials: true }
      );
      const videoData =
        videoResponse && videoResponse.data.data.length > 0
          ? videoResponse.data.data[0]
          : null;

      setVideo(videoData);

      // Fetch video owner's details
    } catch (error) {
      console.error("Error loading video or owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideoData();
    // console.log(video);
  }, [videoId]);

  if (loading) {
    return <Loader />;
  }

  // console.log(videoOwner);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row h-auto max-w-7xl mx-auto">
        {/* Left Section */}
        <motion.div 
          className="w-full lg:w-2/3 p-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Video Section */}
          <motion.div 
            className="relative w-full h-64 md:h-96 lg:h-[500px] mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {video ? (
              <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 rounded-2xl p-2 shadow-2xl border border-white/20 dark:border-gray-700/30">
                <video
                  className="w-full h-full object-cover rounded-xl"
                  src={video.videoFile}
                  controls
                  autoPlay
                ></video>
              </div>
            ) : (
              <Loader />
            )}
          </motion.div>

          {/* Video Details */}
          <motion.div 
            className="mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/30">
              <VideoDetails video={video} setVideo={setVideo} />
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30">
              <VideoComments videoId={video._id} />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div 
          className="w-full lg:w-1/3 p-4"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <VideoSuggestions videoOwner={video.owner} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ---- components of single video page ----
function VideoDetails({ video, setVideo }) {
  // states in the parent component are passed as props to this component
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [videoOwner, setVideoOwner] = useState({});
  const [loading, setLoading] = useState(true);
  const [videoLikes, setVideoLikes] = useState(video.videoLikes);

  // add to playlist popup states
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const loadVideoOwnerProfile = async () => {
    // setLoading(true);
    try {
      if (video.owner) {
        const videoOwnerId = video.owner;
        const ownerResponse = await axios.get(
          `${import.meta.env.VITE_HOST}/api/user/c/${video.owner}`,
          { withCredentials: true }
        );
        // console.log(ownerResponse);

        const videoOwnerData =
          ownerResponse && ownerResponse.data.data
            ? ownerResponse.data.data
            : null;

        setVideoOwner(videoOwnerData);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSubscription = async (channelId) => {
    if (!channelId) {
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/subscription/c/${channelId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        // set isSubscribed state
        setVideoOwner((prevOwner) => {
          return { ...prevOwner, isSubscribed: !prevOwner.isSubscribed };
        });
      }
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  const toggleVideoLike = async (videoId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/like/toggle/v/${videoId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        // state management for video likes count
        if (video.isLiked) {
          setVideoLikes((prevLikes) => prevLikes - 1);
        } else {
          setVideoLikes((prevLikes) => prevLikes + 1);
        }
        // set isLiked state
        setVideo((prevVideo) => {
          return { ...prevVideo, isLiked: !prevVideo.isLiked };
        });
      }
    } catch (error) {
      console.error("Error toggling video like:", error);
    }
  };

  const handleAddVideoToPlaylist = async ({ playlistId, videoId }) => {
    // const videoId = video._id;
    // console.log(videoId + " playlist : "+playlistId);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/playlist/add/${videoId}/${playlistId}`,
        {},
        { withCredentials: true }
      );

      if (response?.data?.success) {
        console.log("Video Added to Playlist Successfully !");
      }
    } catch (e) {
      // console.log(e.response.data);
      const data = showAlertFromErrorHtml(e.response.data);
      console.error("ERROR :: "+ data);
    } finally {
      setShowAddToPlaylist((prev) => !prev);
    }
  };

  useEffect(() => {
    loadVideoOwnerProfile();
    // console.log(videoOwner);
  }, [video]);

  return (
    !loading && (
      <div className="text-gray-800 dark:text-white w-full">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-700 dark:from-gray-100 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {video?.title}
        </motion.h1>
        <motion.p 
          className="text-sm text-gray-600 dark:text-gray-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {video?.views} Views · {calculateTimeDifference(video?.createdAt)}
        </motion.p>

        {/* Channel Info */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center gap-4 mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center">
            <motion.img
              src={videoOwner?.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 object-cover border-2 border-blue-500"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{videoOwner?.username}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {videoOwner?.subscribersCount} Subscribers
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSubscription(videoOwner._id)}
              className={`px-6 py-2 rounded-xl border-2 font-semibold transition-all duration-300
                ${
                  videoOwner?.isSubscribed
                    ? "bg-gray-600 border-gray-700 hover:bg-gray-700 text-white"
                    : "bg-gradient-to-r from-red-500 to-red-600 border-red-600 hover:from-red-600 hover:to-red-700 text-white"
                }
                ${
                  videoOwner._id === userData._id
                    ? "bg-gray-600 border-gray-700 cursor-not-allowed"
                    : ""
                }
              `}
            >
              {videoOwner?.isSubscribed ? "Unsubscribe" : "Subscribe"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                navigate(`/channel-profile/${videoOwner._id}/videos`)
              }
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl border-2 border-blue-700 transition-all duration-300 font-semibold"
            >
              View Channel
            </motion.button>
          </div>
        </motion.div>

        {/* Video Actions */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleVideoLike(video._id)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 bg-gradient-to-r from-gray-600 to-gray-700 border-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold transition-all duration-300"
          >
            <span>{videoLikes}</span>
            <span className="text-xl">{video?.isLiked ? "👍🏻" : "👍"}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddToPlaylist((prev) => !prev)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Playlist
          </motion.button>
        </motion.div>

        {/* Description */}
        <motion.div 
          className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Description</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {video?.description || "No description available."}
          </p>
        </motion.div>

        <AnimatePresence>
          {showAddToPlaylist && (
            <AddToPlaylistPopup
              videoId={video._id}
              onCancel={() => setShowAddToPlaylist((prev) => !prev)}
              onSubmit={handleAddVideoToPlaylist}
            />
          )}
        </AnimatePresence>
      </div>
    )
  );
}

function AddToPlaylistPopup({ videoId, onCancel, onSubmit }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const channelId = useSelector((state) => state.user.userData._id);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/playlist/user/${channelId}/`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data);

      setPlaylists(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSave = () => {
    if (!selectedPlaylist) {
      return;
    }
    onSubmit({ playlistId: selectedPlaylist, videoId });
  };

  useEffect(() => {
    loadPlaylists();
  }, [channelId]);

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden border border-white/20 dark:border-gray-700/30"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Add Video to Playlist
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCancel}
            className="text-gray-500 hover:text-red-500 text-2xl transition-colors"
          >
            ✕
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading && playlists.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <Loader />
            </div>
          ) : errorMessage ? (
            <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              {errorMessage}
            </div>
          ) : (
            <div className="space-y-3">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist._id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    selectedPlaylist === playlist._id
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                  onClick={() => {
                    selectedPlaylist === playlist._id
                      ? setSelectedPlaylist(null)
                      : setSelectedPlaylist(playlist._id);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      checked={selectedPlaylist === playlist._id}
                      onChange={() => {
                        selectedPlaylist === playlist._id
                          ? setSelectedPlaylist(null)
                          : setSelectedPlaylist(playlist._id);
                      }}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {playlist.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {playlist.videos.length} videos • Updated {calculateTimeDifference(playlist.updatedAt)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-semibold"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOnSave}
            disabled={!selectedPlaylist}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
              selectedPlaylist
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Playlist
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VideoSuggestions({ videoOwner }) {
  const channelId = videoOwner;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadSuggestedVideos = async () => {
    const response = axios
      .get(`${import.meta.env.VITE_HOST}/api/video/channel`, {
        params: { page, limit: 5, channelId },
        withCredentials: true,
      })
      .then((response) => {
        const newVideos = response.data.data;
        if (newVideos.length === 0) {
          setHasMore(false);
        } else {
          setVideos((prevVideos) => {
            const videoIds = new Set(prevVideos.map((video) => video._id));
            const uniqueNewVideos = newVideos.filter(
              (video) => !videoIds.has(video._id)
            );
            return [...prevVideos, ...uniqueNewVideos];
          });
        }
      })
      .catch((error) => {
        console.error("Error loading suggested videos:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (channelId) loadSuggestedVideos();
  }, [page, channelId]);

  return (
    <motion.div 
      className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        More from this channel
      </h2>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader />
          </div>
        ) : (
          <>
            {videos.map((video, index) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <VideoCardListView video={video} />
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!hasMore}
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                hasMore
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {hasMore ? "Load More Videos" : "No more videos"}
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function VideoComments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");

  const loadComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/comments/${videoId}`,
        {
          withCredentials: true,
        }
      );
      const commentsData = response.data.data;

      setComments((prevComments) => {
        const commentIds = new Set(prevComments.map((comment) => comment._id));
        const uniqueComments = commentsData.filter(
          (comment) => !commentIds.has(comment._id)
        );
        return [...prevComments, ...uniqueComments];
      });

      comments.sort(
        (com1, com2) => new Date(com2.createdAt) - new Date(com1.createdAt)
      );
      setComments(comments);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async (content, videoId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/comments/${videoId}`,
        { content },
        { withCredentials: true }
      );
      if (response.status === 200) {
        loadComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST}/api/comments/c/${commentId}`,
        {
          withCredentials: true,
        }
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (commentId, updatedContent) => {
    const comment = comments.find((comnt) => comnt._id === commentId);
    if (comment.content === updatedContent) {
      console.log("Edit / Update Content (Content is same)  !...");
      return;
    }
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST}/api/comments/c/${commentId}`,
        { content: updatedContent },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment._id === commentId) {
              return { ...comment, content: updatedContent };
            }
            return comment;
          });
        });
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      loadComments();
    }
  }, [videoId]);

  return loading ? (
    <div className="flex justify-center items-center h-32">
      <Loader />
    </div>
  ) : (
    <div className="text-gray-800 dark:text-white p-6">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {comments.length} Comments
        </h1>
        
        {/* Add New Comment Section */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            onChange={(e) => setCommentContent(e.target.value)}
            id="contentField"
            type="text"
            placeholder="Add a comment..."
            className="flex-1 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-700"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              postComment(commentContent, videoId);
              document.getElementById("contentField").value = "";
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300"
          >
            Post
          </motion.button>
        </div>
      </motion.div>

      {/* Comments List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <CommentCard
              comment={comment}
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
