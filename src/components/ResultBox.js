import React from "react";
import styled from "@emotion/styled";

const StyledBox = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: 10px 0;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeInBox 1s linear forwards;

  .fading-text {
    opacity: 0;
    animation: fadeIn 2s linear forwards;
  }

  @keyframes fadeInBox {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ResultBox = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default ResultBox;
