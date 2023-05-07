# Athack @ [Datadays 2023](https://www.datadays.ch/): Hack The Bias

Welcome to the Hack The Bias repository! This project was created for the Datadays 2023 AI Hackathon, organized by the Analytics Club at ETH. Our goal is to help users identify and remove biases from their text in order to promote fair and inclusive language. By providing your text, our website generates a new version that is free from racial, ethnical, and gender biases. Additionally, it highlights the specific parts of your input text related to each category of bias.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Flan instance on AWS SageMaker](#flan-instance-on-aws-sagemaker)
  - [GPT-3.5 on OpenAI](#gpt-35-on-openai)
  - [Start the development server](#start-the-development-server)
- [Built With](#built-with)
- [Live Demo](#live-demo)

## Features

- Text input with bias identification and highlighting
- Choice between two AI models: Flan instance on AWS SageMaker or GPT-3.5 on OpenAI
- Bias categories: Racial, Ethnical, and Gender
- React-based website hosted on Vercel

## Getting Started

To get started with the project, follow the instructions below.

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- Git

### Installation

1. Clone the repo.
2. Change into the project directory:

```bash
cd athack-datathon-2023-web-app
```

3. Install dependencies:
```bash
npm install
```


## Usage

There are two alternatives for text generation: using a Flan instance deployed on AWS SageMaker or using GPT-3.5 on OpenAI. The website provides a switcher by default, but the endpoints and api keys have to be available. See below to understand how to do that.

### Flan instance on AWS SageMaker

We've built a pipeline using AWS Lambda and AWS API Gateway to make our Flan instance reachable from the website. To use this option, you should do the same, and provide the endpoint. Don't forget to enable CORS on the API Gateway. You should set the endpoint link at line 217 of [App.js](/src/App.js).

### GPT-3.5 on OpenAI

To use GPT-3.5 for text generation, you'll need an OpenAI API key. You should set it up at line 241 of [App.js](/src/App.js).

### Start the development server

```bash
npm start
```


## Built With

- [React](https://reactjs.org/) - Frontend framework
- [AWS SageMaker](https://aws.amazon.com/sagemaker/) - Machine learning platform
- [AWS Lambda](https://aws.amazon.com/lambda/) - Serverless compute service
- [AWS API Gateway](https://aws.amazon.com/api-gateway/) - API management service
- [OpenAI](https://www.openai.com/) - AI research organization
- [Vercel](https://vercel.com/) - Website hosting platform

## Live Demo

You can access the live demo of the Unbiased Text Generator at the following public endpoint:

[https://athack-datathon-2023-web-app.vercel.app/](https://athack-datathon-2023-web-app.vercel.app/)
