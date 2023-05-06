import React, { useState } from "react";
import styled from "@emotion/styled";
import InputBox from "./components/InputBox";
import ResultBox from "./components/ResultBox";
import SubmitButton from "./components/SubmitButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

function App() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (text.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <Container>
      <InputContainer>
        <InputBox value={text} onChange={(e) => setText(e.target.value)} />
        <SubmitButton onClick={handleSubmit} />
      </InputContainer>
      {submitted && (
        <>
          <ResultBox>
            {/* Display metrics on the input text here */}
          </ResultBox>
          <ResultBox>
            {/* Display the modified version of the text here */}
          </ResultBox>
        </>
      )}
    </Container>
  );
}

export default App;
