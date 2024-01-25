import { useState, useEffect, useRef, Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Feed, //card, profileimg, question, questioncardcontainer, reaction
  Button, //sharebutton, floatingbutton, badgebutton 
} from 'src\components'
import * as Styled from "./PostPageStyle"
import { getSubjectsQuestion } from 'api/api';

//한 번에 로드되는 항목 수
const LIMIT = 5;

export default function Post() {
  const location = useLocation();
  const navigate = useNavigate();
  const subjectId = location.pathname.split('/')[2];
  const { isOpen, openModal, closeModal } = useModal();
  const option = { visible: true, filter: true };
  const target = useRef();
  const [hasNext, setHasNext] = useState(true);
  const offset = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [subject, setSubject] = useState();
  const [questionList, setQuestionList] = useState();

  //질문목록 데이터 호출 함수
  function handleFeedCardSelection(id, limit, offset){
    setIsLoading(true);
    try {
      //api 호출
      getSubjectsQuestion(id, limit, offset.current).then((result)=>{
        const { count, next, results: questionData } = result;
        //데이터 업데이트
        setQuestionData((prevData)=>({
          data: [...prevData.data, ...questionData],
        }));
        setTotal(count);
        setHasNext(next);
      });
    } catch(err) {
      console.log(err);
      //오류처리 및 리다이렉트
    } finally {
      offset.current +=limit;
      setIsLoading(false);
    }
  } 


  return (
  <>
  {/*헤더 컴포넌트 */}
  <PostHeader>
    <headerImage/>
    <LogoAndProfile>
      <img className="logo" src= "/images/logo.png" alt="로고 이미지" />
      <img 
      className="HeaderProfileImage"
      src={subject?.imageSource}
      alt="프로필 사진"/>
      <h1 className="profileName">{subject?.name}</h1>
      <ShareButton/>
    </LogoAndProfile>
  </PostHeader>
  {/* 메인 컨테이너 */}
  <MainContainer>
    <CountQuestion>
      <img src="/images/Messages.svg" alt="메세지 아이콘" />
      <span>{QuestionCount}</span>
    </CountQuestion>
    {/* 질문목록 컴포넌트 */}
    <QuestionFeedCard>
      total={total}
      data={questionData}
      subjectData={[subjectName, subjectImg]}
    </QuestionFeedCard>


  </MainContainer>

  </>);
}


