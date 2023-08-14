import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";
const Answer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const question = location.state.question;
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/langchain", { question })
      .then((res) => {
        setIsLoading(true);
        setAnswer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StWrapper>
      <StHeader>CAU-GPT</StHeader>
      {!isLoading && <StLoadingPannel>로딩중...</StLoadingPannel>}
      {isLoading && <StAnswerPannel>{answer}</StAnswerPannel>}
      <StQuestionButton onClick={() => navigate("/")}>
        질문하기
      </StQuestionButton>
    </StWrapper>
  );
};

export default Answer;

const StQuestionButton = styled.button`
  height: 4rem;
  width: 10rem;
  border: none;
  margin-top: 5rem;

  background-color: white;

  font-size: 1.5rem;
  font-weight: 700;
`;

const StAnswerPannel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 45rem;
  border-radius: 0.5rem;

  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;

  background-color: white;
`;

const StLoadingPannel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;

  background-color: white;
`;

const StHeader = styled.h1`
  font-size: 10rem;
  font-weight: 700;
  margin-bottom: 5rem;

  color: white;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-color: #282c34;
`;
