import React from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const SubmitButton = ({ onClick }) => {
  return <Button onClick={onClick}>Submit</Button>;
};

export default SubmitButton;
