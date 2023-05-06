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

const Spacer = styled.div`
  height: 20px;
`;

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [racialBias, setRacialBias] = useState(null);
  const [ethnicBias, setEthnicBias] = useState(null);
  const [genderBias, setGenderBias] = useState(null);
  const [highlightedText, setHighlightedText] = useState(null);

  const handleTextChange = e => {
    if (!result) {
      setText(e.target.value);
      setHighlightedText(e.target.value)
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
            seed: 123,
          },
        }
      );
      setRacialBias(racialBiasResponse.data[0] === "yes");
      if (racialBiasResponse.data[0] === "yes") {
        const modifiedText =
          "remove the racial bias from this text: " + this_text;
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
        this_text = response.data[0];

        const highlightResponse = await axios.post(
          "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference",
          {
            data: {
              text_inputs:
                "can you highlight where there is racial bias on this sentence? " +
                text,
              max_length: 80,
              num_return_sequences: 1,
              top_k: 20,
              top_p: 0.95,
              do_sample: true,
              num_beams: 5,
              seed: 123,
            },
          }
        );
        setHighlightedText(
          highlightSentences(
            highlightedText,
            [highlightResponse.data[0]],
            "highlighted-racial-bias"
          )
        );
      }

      const modifiedEthnicBiasText =
        "is there ethnic bias on this sentence? reply yes/no: " + text;
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
            seed: 123,
          },
        }
      );
      setEthnicBias(ethnicBiasResponse.data[0] === "yes");
      if (ethnicBiasResponse.data[0] === "yes") {
        const modifiedText =
          "remove the ethnic bias from this text: " + this_text;
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
        this_text = response.data[0];
        console.log(response.data[0])

        const highlightResponse = await axios.post(
          "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference",
          {
            data: {
              text_inputs:
                "can you highlight where there is ethnic bias on this sentence? " +
                text,
              max_length: 80,
              num_return_sequences: 1,
              top_k: 20,
              top_p: 0.95,
              do_sample: true,
              num_beams: 5,
              seed: 123,
            },
          }
        );
        setHighlightedText(
          highlightSentences(
            highlightedText,
            [highlightResponse.data[0]],
            "highlighted-ethnic-bias"
          )
        );
      }

      const modifiedGenderBiasText =
        "is there gender bias on this sentence? reply yes/no: " + text;
      const genderBiasResponse = await axios.post(
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
            seed: 123,
          },
        }
      );
      setGenderBias(genderBiasResponse.data[0] === "yes");
      if (genderBiasResponse.data[0] === "yes") {
        const modifiedText =
          "remove the gender bias from this text: " + this_text;
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
        this_text = response.data[0];

        const highlightResponse = await axios.post(
          "https://i4c1mz81dj.execute-api.us-east-1.amazonaws.com/dev/flan-inference",
          {
            data: {
              text_inputs:
                "can you highlight where there is gender bias on this sentence? " +
                text,
              max_length: 80,
              num_return_sequences: 1,
              top_k: 20,
              top_p: 0.95,
              do_sample: true,
              num_beams: 5,
              seed: 123,
            },
          }
        );
        setHighlightedText(
          highlightSentences(
            highlightedText,
            [highlightResponse.data[0]],
            "highlighted-gender-bias"
          )
        );
      }

      if (
        racialBiasResponse.data[0] === "no" &&
        ethnicBiasResponse.data[0] === "no" &&
        genderBiasResponse.data[0] === "no"
      ) {
        const modifiedText = "remove the bias from this text: " + this_text;
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
      }
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
    </Container>
  );
}

export default App;
