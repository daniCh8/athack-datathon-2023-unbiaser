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

const Spacer = styled.div`height: 40px;`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 10px 0;
`;

const StyledTextButton = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #808080;
  cursor: pointer;

  &:hover {
    color: #606060;
  }

  &:focus {
    outline: none;
  }
`;

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [racialBias, setRacialBias] = useState(null);
  const [ethnicBias, setEthnicBias] = useState(null);
  const [genderBias, setGenderBias] = useState(null);
  const [highlightedText, setHighlightedText] = useState(null);
  const [boolValue, setBoolValue] = useState(false);

  const handleBias = async (biasType, resText) => {
    return new Promise(async resolve => {
      const modifiedText =
        `remove the ${biasType} bias from this text: ` + resText;
      const response = await makeApiCall(modifiedText, 50, 3, 50, 0.95, true);
      setResult(response.data);
      let newText = response.data[0];

      const highlightResponseText =
        `can you highlight where there is ${biasType} bias on this sentence? ` +
        text;
      const highlightResponse = await makeApiCall(
        highlightResponseText,
        80,
        1,
        20,
        0.95,
        true,
        5,
        123
      );
      const newHighlightedText = highlightSentences(
        highlightedText,
        [highlightResponse.data[0]],
        `highlighted-${biasType}-bias`
      );

      resolve({ newText, newHighlightedText });
    });
  };

  const makeApiCall = (
    textInputs,
    maxLength,
    numReturnSequences,
    topK,
    topP,
    doSample,
    numBeams,
    seed
  ) => {
    const axiosRequestUrl =
      "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference";
    const requestData = {
      text_inputs: textInputs,
      max_length: maxLength,
      num_return_sequences: numReturnSequences,
      top_k: topK,
      top_p: topP,
      do_sample: doSample,
      num_beams: numBeams,
      seed: seed,
    };

    return axios.post(axiosRequestUrl, { data: requestData });
  };

  const handleTextChange = e => {
    if (!result) {
      setText(e.target.value);
      setHighlightedText(e.target.value);
    }
  };

  const highlightSentences = (
    inputText,
    sentencesToHighlight,
    highlightClass
  ) => {
    let highlightedText = inputText;

    sentencesToHighlight.forEach(sentence => {
      const highlightedSentence = `<span class="${highlightClass}">${sentence}</span>`;
      highlightedText = highlightedText.replace(sentence, highlightedSentence);
    });

    return highlightedText;
  };

  const handleSubmit = async () => {
    try {
      let this_text = text;
      setHighlightedText(text);

      const modifiedRacialBiasText =
        "is there racism on this sentence? reply yes/no: " + text;
      const racialBiasResponse = await makeApiCall(
        modifiedRacialBiasText,
        80,
        1,
        20,
        0.95,
        true,
        5,
        123
      );
      setRacialBias(racialBiasResponse.data[0] === "yes");

      const modifiedEthnicBiasText =
        "is there ethnic bias on this sentence? reply yes/no: " + text;
      const ethnicBiasResponse = await makeApiCall(
        modifiedEthnicBiasText,
        80,
        1,
        20,
        0.95,
        true,
        5,
        123
      );
      setEthnicBias(ethnicBiasResponse.data[0] === "yes");

      const modifiedGenderBiasText =
        "is there gender bias on this sentence? reply yes/no: " + text;
      const genderBiasResponse = await makeApiCall(
        modifiedGenderBiasText,
        80,
        1,
        20,
        0.95,
        true,
        5,
        123
      );
      setGenderBias(genderBiasResponse.data[0] === "yes");

      if (racialBiasResponse.data[0] === "yes") {
        const { newText, newHighlightedText } = await handleBias("racial", this_text);
        this_text = newText;
        setHighlightedText(newHighlightedText);
      }
      if (ethnicBiasResponse.data[0] === "yes") {
        const { newText, newHighlightedText } = await handleBias("ethnic", this_text);
        this_text = newText;
        setHighlightedText(newHighlightedText);
      }
      if (genderBiasResponse.data[0] === "yes") {
        const { newText, newHighlightedText } = await handleBias("gender", this_text);
        this_text = newText;
        setHighlightedText(newHighlightedText);
      }

      if (
        racialBiasResponse.data[0] === "no" &&
        ethnicBiasResponse.data[0] === "no" &&
        genderBiasResponse.data[0] === "no"
      ) {
        const modifiedText = "remove the bias from this text: " + text;
        const response = await makeApiCall(modifiedText, 50, 3, 50, 0.95, true);
        setResult(response.data);
      }
    } catch (error) {
      console.error("Error submitting text:", error);
    }
  };

  return (
    <Container>
      <h1>Hack the bias</h1>
      <InputBox value={text} onChange={handleTextChange} />
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit} disabled={!text || result} />
        <ResetButton
          onClick={() => {
            setResult(null);
            setText("");
          }}
          disabled={!result}
        />
      </ButtonContainer>
      <Spacer />
      {result &&
        <ResultContainer>
          <CircleContainer>
            <StatusCircle
              active={racialBias}
              color="#FF6347"
              label="Racial Bias"
            />
            <StatusCircle
              active={ethnicBias}
              color="#FFD700"
              label="Ethnic Bias"
            />
            <StatusCircle
              active={genderBias}
              color="#40E0D0"
              label="Gender Bias"
            />
          </CircleContainer>
          <ResultBox children={highlightedText} isHtml={true} />
          <ResultBox>
            {result[0]}
          </ResultBox>
        </ResultContainer>}
      <StyledTextButton onClick={() => setBoolValue(!boolValue)}>
        {boolValue ? "Flan" : "ChatGPT"}
      </StyledTextButton>
    </Container>
  );
}

export default App;
