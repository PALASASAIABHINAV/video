import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MdHome,
  MdThumbUp,
  MdSubscriptions,
  MdHistory,
  MdPlaylistPlay,
  MdDashboard,
  MdGroup,
  MdSettings
} from "react-icons/md";

function SideBar() {
  const userData = useSelector((state) => state.user.userData);

  const navItems = [
    {
      label: "Home",
      to: "/home",
      icon: <MdHome size={24} />,
    },
    {
      label: "Liked Videos",
      to: "/liked-videos",
      icon: <MdThumbUp size={24} />,
    },
    {
      label: "My Content",
      to: `/channel-profile/${userData?._id}/videos`,
      icon: <MdPlaylistPlay size={24} />,
    },
    {
      label: "Subscriptions",
      to: "/subscriptions",
      icon: <MdSubscriptions size={24} />,
    },
    {
      label: "Watch History",
      to: "/watch-history",
      icon: <MdHistory size={24} />,
    },
    {
      label: "Playlists",
      to: "/playlists",
      icon: <MdPlaylistPlay size={24} />,
    },
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <MdDashboard size={24} />,
    },
    {
      label: "Subscribers",
      to: "/subscribers",
      icon: <MdGroup size={24} />,
    },
    {
      label: "Settings",
      to: "/channel-settings/personal-info",
      icon: <MdSettings size={24} />,
    },
  ];

  return (
    <div
      className="h-screen bg-gray-700 border-r-4 border-gray-900 flex flex-col transition-all duration-300 w-18 md:w-64"
    >
      <nav className="flex-1 flex flex-col gap-1 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-2 w-full transition-colors duration-200 rounded-lg font-semibold border-l-4 ` +
              (isActive
                ? "text-blue-600 bg-gray-800 border-blue-500"
                : "text-gray-200 hover:bg-gray-600 border-transparent")
            }
          >
            <span className="min-w-[32px] flex justify-center items-center">{item.icon}</span>
            {/* Only show label on md and up */}
            <span className="hidden md:inline-block text-left ml-2">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default SideBar;
