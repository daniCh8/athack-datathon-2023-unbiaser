import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  min-width: 100px;
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005fa3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SubmitButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>Debias!</StyledButton>;
};

export default SubmitButton;
