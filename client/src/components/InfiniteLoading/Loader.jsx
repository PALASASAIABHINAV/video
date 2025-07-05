import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// import './Loader.css';
function Loader() {
  return (
    <div className="flex justify-center items-center mt-4">
      {/* <div className="ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div> */}
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default Loader;
