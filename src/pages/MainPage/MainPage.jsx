import { useEffect, useState } from 'react';
import * as S from './MainPageStyle';
import NavBar from '../../components/NavBar/MainPageNavBar';
import AuthToggleForm from '../../components/Form/AuthToggleForm/AuthToggleForm';
import { ProfileForm } from '../../components/Form/ProfileForm/ProfileForm';
import { useRecoilValue } from 'recoil';
import { weatherState } from '../../atom/atom';

export default function Main() {
  const userId = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName');
  const [activeForm, setActiveForm] = useState('AuthToggle');
  const weatherInfo = useRecoilValue(weatherState);
  const backgroundImage = weatherInfo.weather
    ? `${process.env.PUBLIC_URL}/images/${weatherInfo.weather}.jpg`
    : `${process.env.PUBLIC_URL}/images/Background.jpeg`;

  useEffect(() => {
    if (userId && userName) {
      setActiveForm('Profile');
    } else {
      setActiveForm('AuthToggle');
    }
  }, [userId, userName, activeForm]);

  return (
    <S.MainPageContainer backgroundImage={backgroundImage}>
      <NavBar />
      <S.LogoImage
        src={`${process.env.PUBLIC_URL}/images/logo.svg`}
        alt="OPENMIND 로고"
      />
      {activeForm === 'Profile' ? (
        <ProfileForm
          userId={userId}
          userName={userName}
          setActiveForm={setActiveForm}
        />
      ) : (
        <AuthToggleForm />
      )}
    </S.MainPageContainer>
  );
}
