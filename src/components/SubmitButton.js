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
    background-color: #2a2a2a;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SubmitButton = ({ onClick, disabled }) => {
  return <StyledButton onClick={onClick} disabled={disabled}>Unbias</StyledButton>;
};

export default SubmitButton;
