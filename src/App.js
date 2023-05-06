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
  const [flan, setFlan] = useState(false);

  const findIfRaciallyBiased = async () => {
    return new Promise(async resolve => {
      console.log("asking if there is a racial bias.");
      const modifiedRacialBiasText =
        "is there racism on this sentence? reply only yes/no: " + text;
      const racialBiasResponse = flan
        ? await makeAWSApiCall(modifiedRacialBiasText, 80, 1, 20, 0.95, true, 5)
        : await callOpenAI(modifiedRacialBiasText);
      const isRaciallyBiased = flan
        ? racialBiasResponse.data[0] === "yes"
        : racialBiasResponse.toLowerCase().includes("yes");
      console.log(flan ? racialBiasResponse.data[0] : racialBiasResponse);
      console.log("is racially biased? " + isRaciallyBiased);

      resolve(isRaciallyBiased);
    });
  };

  const findIfEthnicallyBiased = async () => {
    return new Promise(async resolve => {
      const modifiedEthnicBiasText =
        "is there ethnic bias on this sentence? reply only yes/no: " + text;
      const ethnicBiasResponse = flan
        ? await makeAWSApiCall(modifiedEthnicBiasText, 80, 1, 20, 0.95, true, 5)
        : await callOpenAI(modifiedEthnicBiasText);
      const isEthnicallyBiased = flan
        ? ethnicBiasResponse.data[0] === "yes"
        : ethnicBiasResponse.toLowerCase().includes("yes");
      console.log(flan ? ethnicBiasResponse.data[0] : ethnicBiasResponse);
      console.log("is ethically biased? " + isEthnicallyBiased);

      resolve(isEthnicallyBiased);
    });
  };

  const findIfGenderBiased = async () => {
    return new Promise(async resolve => {
      const modifiedGenderBiasText =
        "is there gender bias on this sentence? reply only yes/no: " + text;
      const genderBiasResponse = flan
        ? await makeAWSApiCall(modifiedGenderBiasText, 80, 1, 20, 0.95, true, 5)
        : await callOpenAI(modifiedGenderBiasText);
      const isGenderBiased = flan
        ? genderBiasResponse.data[0] === "yes"
        : genderBiasResponse.toLowerCase().includes("yes");
      console.log(flan ? genderBiasResponse.data[0] : genderBiasResponse);
      console.log("is gender biased? " + isGenderBiased);

      resolve(isGenderBiased);
    });
  };

  const handleBiasGPT = async biasType => {
    return new Promise(async resolve => {
      console.log(`handling ${biasType} bias with gpt.`);
      const modifiedText =
        `Return a list of the specific parts of the text that contain ${biasType} bias. Your response should only be a javascript parsable list, and no additional text. Be as short and specific as possible. ` +
        text;
      const highlightResponse = await callOpenAI(modifiedText);

      console.log(highlightResponse)
      const match = highlightResponse.match(/\[[^\]]*\]/);
      let parsedStrings;
      try {
        parsedStrings = match ? JSON.parse(match[0]) : [];
      } catch (error) {
        console.log("caught error" + error)
        parsedStrings = []
      }
      
      const cleanedStrings = parsedStrings.map(str => str.replace(/[^a-zA-Z0-9\s]/g, ''));

      const newHighlightedText = highlightSentences(
        highlightedText,
        cleanedStrings,
        `highlighted-${biasType}-bias`
      );

      resolve(newHighlightedText);
    });
  };

  const handleBias = async (biasType, resText) => {
    return new Promise(async resolve => {
      const modifiedText =
        `remove the ${biasType} bias from this text: ` + resText;
      const response = await makeAWSApiCall(
        modifiedText,
        120,
        3,
        50,
        0.95,
        true,
        5
      );
      setResult(response.data[0]);
      let newText = response.data[0];

      const highlightResponseText =
        `can you highlight where there is ${biasType} bias on this sentence? ` +
        text;
      const highlightResponse = await makeAWSApiCall(
        highlightResponseText,
        120,
        1,
        20,
        0.95,
        true,
        5
      );
      const newHighlightedText = highlightSentences(
        highlightedText,
        [highlightResponse.data[0]],
        `highlighted-${biasType}-bias`
      );

      resolve({ newText, newHighlightedText });
    });
  };

  const makeAWSApiCall = (
    textInputs,
    maxLength,
    numReturnSequences,
    topK,
    topP,
    doSample,
    numBeams
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
      seed: 8,
    };

    return axios.post(axiosRequestUrl, { data: requestData });
  };

  const callOpenAI = text => {
    return new Promise(async (resolve, reject) => {
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ];

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      };

      const data = {
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 500,
      };

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          data,
          { headers: headers }
        );
        const content = response.data.choices[0].message.content;
        resolve(content);
      } catch (error) {
        reject(error);
      }
    });
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
    console.log("highlighting " + sentencesToHighlight + " in inputText.");

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

      const isRaciallyBiased = await findIfRaciallyBiased();
      setRacialBias(isRaciallyBiased);

      const isEthnicallyBiased = await findIfEthnicallyBiased();
      setEthnicBias(isEthnicallyBiased);

      const isGenderBiased = await findIfGenderBiased();
      setGenderBias(isGenderBiased);

      if (isRaciallyBiased) {
        if (flan) {
          const { newText, newHighlightedText } = await handleBias(
            "racial",
            this_text
          );
          this_text = newText;
          setHighlightedText(newHighlightedText);
        } else {
          const newHighlightedText = await handleBiasGPT("racial");
          setHighlightedText(newHighlightedText);
        }
      }
      if (isEthnicallyBiased) {
        if (flan) {
          const { newText, newHighlightedText } = await handleBias(
            "ethnic",
            this_text
          );
          this_text = newText;
          setHighlightedText(newHighlightedText);
        } else {
          const newHighlightedText = await handleBiasGPT("ethnic");
          setHighlightedText(newHighlightedText);
        }
      }
      if (isGenderBiased) {
        if (flan) {
          const { newText, newHighlightedText } = await handleBias(
            "gender",
            this_text
          );
          this_text = newText;
          setHighlightedText(newHighlightedText);
        } else {
          const newHighlightedText = await handleBiasGPT("gender");
          setHighlightedText(newHighlightedText);
        }
      }

      if (
        !flan ||
        (!isRaciallyBiased && !isEthnicallyBiased && !isGenderBiased)
      ) {
        console.log("flan: " + flan);
        if (flan) {
          console.log("asking flan!");
          const modifiedText = "remove the bias from this text: " + text;
          const response = await makeAWSApiCall(
            modifiedText,
            120,
            3,
            50,
            0.95,
            true,
            5
          );
          setResult(response[0]);
          console.log(flan);
        } else {
          console.log("asking chatgpt!");
          const modifiedText =
            "Can you remove the racial-bias, gender-bias or ethnic-bias from the following text? Keep the text structure close to the initial one and only reply with the modified text." +
            text;
          const response = await callOpenAI(modifiedText);
          setResult(response);
          console.log(response);
        }
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
            {result}
          </ResultBox>
        </ResultContainer>}
      <StyledTextButton onClick={() => setFlan(!flan)}>
        {flan ? "GPT-3.5" : "Flan"}
      </StyledTextButton>
    </Container>
  );
}

export default App;
