import React from "react";
import styled from "@emotion/styled";

const LoadingBarContainer = styled.div`
  width: 100%;
  height: 5px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ddd;
  z-index: 9999;

  @media only screen and (max-width: 600px) {
    position: absolute;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${({ progress }) => progress}%;
`;

const LoadingBar = ({ progress }) => (
  <LoadingBarContainer>
    <ProgressBar progress={progress} />
  </LoadingBarContainer>
);

export default LoadingBar;
