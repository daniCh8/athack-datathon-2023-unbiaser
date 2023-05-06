import React from "react";
import styled from "@emotion/styled";

const StyledInput = styled.textarea`
  width: 100%;
  max-width: 600px;
  min-height: 150px; /* Update the min-height value */
  padding: 15px;
  font-size: 18px;
  background-color: white;
  border-radius: 5px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  resize: vertical;
  outline: none;
  transition: box-shadow 0.3s;

  &:focus {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`;

const InputBox = ({ value, onChange }) => {
  return (
    <StyledInput
      type="text"
      placeholder="Write your text here..."
      value={value}
      onChange={onChange}
    />
  );
};

export default InputBox;
