import React from "react";

function TweetComponent() {
  return (
    <div className="w-full mx-auto bg-gray-800 text-white p-4 rounded-lg shadow-md hover:bg-gray-900">
      <div className="flex items-start space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Profile Picture"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="text-sm font-semibold">React Patterns</p>
            <span className="text-xs text-gray-400">5 hours ago</span>
          </div>
          <p className="text-sm mt-2">
            Exploring the latest features in JavaScript ES11! The language keeps
            evolving. 💡
            <span className="text-blue-400">#JavaScript</span>{" "}
            <span className="text-blue-400">#ES11</span>
          </p>
          <div className="flex items-center space-x-6 mt-3 text-gray-400">
            <div className="flex items-center space-x-1">
              <svg
                className="w-5 h-5 fill-current text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>425</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-5 h-5 fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2m0 2C8.13 4 5 7.13 5 11s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7m3 6h-2v6h-2v-6H9V8h6v2z" />
              </svg>
              <span>87</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetComponent;
