import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSubject } from '../../api/api';
import * as S from './AnswrePageStyle';

export default function AnswerPage() {
  const [subject, setSubject] = useState({});
  const [questionCount, setQuestionCount] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const questionCountString = questionCount
    ? `${questionCount}개의 질문이 있습니다`
    : '아직 질문이 없습니다';

  const handleDeleteQuestionButtonOnClick = async () => {
    try {
      if (
        window.confirm(
          '정말로 이 질문 대상을 삭제하시겠습니까?\n질문 대상의 모든 질문들은 같이 삭제됩니다.',
        )
      ) {
        const response = await fetch(
          `https://openmind-api.vercel.app/3-3/subjects/${subjectId}/`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.ok) {
          navigate('/');
        } else {
          alert('삭제에 실패하였습니다.');
        }
      } else return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const nextSubject = await getSubject(subjectId);
      if (!nextSubject) return;
      setSubject(nextSubject);
      setQuestionCount(nextSubject.questionCount);
    })();
  }, [subjectId]);

  return (
    <>
      <S.Header>
        <S.HeaderImage />
        <S.LogoAndProfileAndShare>
          <img className="logo" src="/images/logo.png" alt="로고 이미지" />
          <img
            className="header__profileImage"
            src={subject?.imageSource}
            alt="프로필 사진"
          />
          <h1 className="profileName">{subject?.name}</h1>
          <S.ShareButton />
        </S.LogoAndProfileAndShare>
      </S.Header>
      <S.MainContainer>
        <S.QuestionListContainer>
          <S.DeleteSubjectButton onClick={handleDeleteQuestionButtonOnClick}>
            삭제하기
          </S.DeleteSubjectButton>
          <S.CountQuestion>
            <img src="/images/Messages.svg" alt="메세지 아이콘" />
            <span>{questionCountString}</span>
          </S.CountQuestion>
          {questionCount > 0 ? (
            <S.QuestionList
              subjectId={subjectId}
              subject={subject}
              questionList={questionList}
              setQuestionList={setQuestionList}
              setQuestionCount={setQuestionCount}
            />
          ) : (
            <S.NoQuestionImageContainer>
              <img src="/images/empty.png" alt="편지지 이미지" />
            </S.NoQuestionImageContainer>
          )}
        </S.QuestionListContainer>
      </S.MainContainer>
    </>
  );
}
