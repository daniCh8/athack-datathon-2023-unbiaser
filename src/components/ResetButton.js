import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  min-width: 100px;
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4a4a4a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #28a745;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResetButton = ({ onClick, disabled }) =>
  <StyledButton onClick={onClick} disabled={disabled}>
    Reset
  </StyledButton>;

export default ResetButton;
