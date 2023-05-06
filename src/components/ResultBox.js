import React from "react";
import styled from "@emotion/styled";

const Box = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  margin-bottom: 20px;
`;

const ResultBox = ({ children }) => {
  return <Box>{children}</Box>;
};

export default ResultBox;
