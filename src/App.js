import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import InputBox from "./components/InputBox";
import SubmitButton from "./components/SubmitButton";
import ResultBox from "./components/ResultBox";
import ResetButton from "./components/ResetButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleTextChange = (e) => {
    if (!result) {
      setText(e.target.value);
    }
  };  

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference", {
        data: {
          text_inputs: text,
          max_length: 50,
          num_return_sequences: 3,
          top_k: 50,
          top_p: 0.95,
          do_sample: true,
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error submitting text:", error);
    }
  };

  return (
    <Container>
      <h1>Hack the bias</h1>
      <InputBox value={text} onChange={handleTextChange} />
      <SubmitButton onClick={handleSubmit} disabled={!text || result} />
      <ResetButton onClick={() => {setResult(null); setText("");}} disabled={!result} />
      {result && (
  <>
    <ResultBox>
      {result[0].split(" ").map((word, index) => (
        <span key={index} className="fading-text" style={{ animationDelay: `${index * 0.5}s` }}>
          {word}{" "}
        </span>
      ))}
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
