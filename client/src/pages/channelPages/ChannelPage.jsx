// import { useState } from "react";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import ChannelProfileHeadder from "../../components/ChannelProfileHeadder";
import Container from "../../components/Container";

function ChannelPage() {
  const navigate = useNavigate();
  const { channelId } = useParams();
  const location = useLocation();

  useEffect(() => {
    // If the current path is exactly /channel-profile/:channelId, redirect to videos
    if (location.pathname === `/channel-profile/${channelId}`) {
      navigate(`/channel-profile/${channelId}/videos`, { replace: true });
    }
  }, [channelId, location.pathname, navigate]);

  return (
    <Container>
      <ChannelProfileHeadder />
      {/* Content Section */}
      <div className="pb-4">
        <Outlet />
      </div>
    </Container>
  );
}

export default ChannelPage;
