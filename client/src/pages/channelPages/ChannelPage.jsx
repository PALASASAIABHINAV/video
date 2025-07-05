// import { useState } from "react";
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ChannelProfileHeadder from "../../components/ChannelProfileHeadder";
import Container, { ScrollableContainer } from "../../components/Container";

function ChannelPage() {

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
