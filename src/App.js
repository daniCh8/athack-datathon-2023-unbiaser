import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import InputBox from "./components/InputBox";
import SubmitButton from "./components/SubmitButton";
import ResultBox from "./components/ResultBox";
import ResetButton from "./components/ResetButton";
import StatusCircle from "./components/StatusCircle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const CircleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  width: 75%;
  max-width: 600px;
  padding: 0 15px;
`;


const ResultContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [racialBias, setRacialBias] = useState(null);
  const [ethnicBias, setEthnicBias] = useState(null);
  const [genderBias, setGenderBias] = useState(null);

  const handleTextChange = e => {
    if (!result) {
      setText(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const modifiedText = "Debias this text: " + text; // Prepend the characters to the input text
      const response = await axios.post(
        "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference",
        {
          data: {
            text_inputs: modifiedText, // Use the modified text for the API call
            max_length: 50,
            num_return_sequences: 3,
            top_k: 50,
            top_p: 0.95,
            do_sample: true,
          },
        }
      );
      setResult(response.data);
      
      const modifiedRacialBiasText = "is there racism on this sentence? reply yes/no: " + text;
      const racialBiasResponse = await axios.post(
        "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference",
        {
          data: {
            text_inputs: modifiedRacialBiasText,
            max_length: 80,
            num_return_sequences: 1,
            top_k: 20,
            top_p: 0.95,
            do_sample: true,
            num_beams: 5,
            seed: 123
          },
        }
      );
      setRacialBias(racialBiasResponse.data[0] === 'yes')

      const modifiedEthnicBiasText = "is there ethnic bias on this sentence? reply yes/no: " + text;
      const ethnicBiasResponse = await axios.post(
        "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference",
        {
          data: {
            text_inputs: modifiedEthnicBiasText,
            max_length: 80,
            num_return_sequences: 1,
            top_k: 20,
            top_p: 0.95,
            do_sample: true,
            num_beams: 5,
            seed: 123
          },
        }
      );
      setEthnicBias(ethnicBiasResponse.data[0] === 'yes')

      const modifiedGenderBiasText = "is there gender bias on this sentence? reply yes/no: " + text;
      const modifiedGenderBiasResponse = await axios.post(
        "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference",
        {
          data: {
            text_inputs: modifiedGenderBiasText,
            max_length: 80,
            num_return_sequences: 1,
            top_k: 20,
            top_p: 0.95,
            do_sample: true,
            num_beams: 5,
            seed: 123
          },
        }
      );
      setGenderBias(modifiedGenderBiasResponse.data[0] === 'yes')
      
    } catch (error) {
      console.error("Error submitting text:", error);
    }
  };

  return (
    <Container>
      <h1>Hack the bias</h1>
      <InputBox value={text} onChange={handleTextChange} />
      <SubmitButton onClick={handleSubmit} disabled={!text || result} />
      <ResetButton
        onClick={() => {
          setResult(null);
          setText("");
        }}
        disabled={!result}
      />
      {result &&
        <ResultContainer>
          <CircleContainer>
            <StatusCircle active={racialBias} color="#FF6347" label="Racial Bias" />
            <StatusCircle active={ethnicBias} color="#FFD700" label="Ethnic Bias" />
            <StatusCircle active={genderBias} color="#40E0D0" label="Gender Bias" />
          </CircleContainer>
          <ResultBox>
            {/* Display the modified version of the text here */}
          </ResultBox>
          <ResultBox>
            {result[0].split(" ").map((word, index) =>
              <span
                key={index}
                className="fading-text"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {word}{" "}
              </span>
            )}
          </ResultBox>
        </ResultContainer>}
    </Container>
  );
}

export default App;
