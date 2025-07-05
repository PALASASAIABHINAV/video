import React from "react";
import PlayListComponent from "../PlayListComponent.jsx";
import { useParams } from "react-router-dom";
import PlaylistsPage from "../../pages/PlaylistsPage.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

function PlayListGallery({ playlists }) {

  return (
    <div className="container mx-auto p-4 bg-">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {playlists.map((playlist) => (
          <PlayListComponent
            key={playlist._id}
            playlistId={playlist._id}
            name={playlist.name}
            description={playlist.description}
            totalVideos={playlist.videos.length}
            owner={playlist.playListOwner}
            videos={playlist.videos}
            updatedAt = {playlist.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayListGallery;
