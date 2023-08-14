import axios from "axios";
import { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleQuestionSubmit = () => {
    navigate("/question", {
      state: { question: inputRef.current?.value },
    });
  };

  return (
    <StWrapper>
      <StHeader>
        <StHeaderTitle>CAU-GPT</StHeaderTitle>
        <StQuestionForm onSubmit={handleQuestionSubmit}>
          <StQuestionInput ref={inputRef} placeholder="질문을 입력하세요." />
          <StQuestionButton type="submit">질문하기</StQuestionButton>
        </StQuestionForm>
      </StHeader>
    </StWrapper>
  );
}

export default App;

const StQuestionButton = styled.button`
  height: 4rem;
  width: 10rem;
  border: none;

  background-color: transparent;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const StQuestionInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const StQuestionForm = styled.form`
  display: flex;
  align-items: center;

  width: 45rem;
  height: 4rem;
`;

const StHeaderTitle = styled.h1`
  font-size: 10rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 5rem;
`;

const StHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  background-color: #282c34;
`;
