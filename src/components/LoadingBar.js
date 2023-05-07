import React from "react";

const LoadingBar = ({ progress }) => (
  <div
    style={{
      width: "100%",
      height: "5px",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#ddd",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        height: "100%",
        backgroundColor: "#4caf50",
        width: `${progress}%`,
      }}
    ></div>
  </div>
);

export default LoadingBar;