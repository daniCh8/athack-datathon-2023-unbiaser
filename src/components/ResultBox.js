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

  .highlighted-racial-bias {
    background-color: #FF6347;
    padding: 2px;
    border-radius: 3px;
  }

  .highlighted-ethnic-bias {
    background-color: #FFD700;
    padding: 2px;
    border-radius: 3px;
  }

  .highlighted-gender-bias {
    background-color: #40E0D0;
    padding: 2px;
    border-radius: 3px;
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

const ResultBox = ({ children, isHtml }) => {
  return (
    <StyledBox>
      {isHtml ? (
        <p
          className="fading-text"
          dangerouslySetInnerHTML={{ __html: children }}
        ></p>
      ) : (
        <p className="fading-text">{children}</p>
      )}
    </StyledBox>
  );
};

export default ResultBox;
