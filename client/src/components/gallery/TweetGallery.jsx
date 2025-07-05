import React from "react";
import TweetComponent from "../TweetComponent";

function TweetGallery() {
  return (
    <div className="w-full mx-auto space-y-2 m-2">
      <TweetComponent />
        <TweetComponent />
        <TweetComponent />
    </div>
  );
}

export default TweetGallery;
