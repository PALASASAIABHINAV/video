import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlayListGallery from "../../components/gallery/PlayListGallery.jsx";


function ChannelPlayListsPage() {

  const channelId = useParams().channelId;
  const [playlists, setPlaylists] = useState([]);
  const [totalPlaylists, setTotalPlaylists] = useState(0);

  const loadPlaylists = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/playlist/user/${channelId}/`,
        {
          withCredentials: true,
        }
      );

      setPlaylists(response.data.data);
      setTotalPlaylists(response.data.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, [totalPlaylists]);

  return (
    <div>
      <PlayListGallery playlists={playlists} />
    </div>
  );
}

export default ChannelPlayListsPage;
