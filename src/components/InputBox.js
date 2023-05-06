import React from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const InputBox = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Write your text here..."
      value={value}
      onChange={onChange}
    />
  );
};

export default InputBox;
