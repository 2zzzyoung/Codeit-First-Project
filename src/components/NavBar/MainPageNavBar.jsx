import * as S from './MainPageNavBarStyle';
import OutlineBoxButton from '../../components/Button/OutlineBoxButton/OutlineBoxButton';

export default function NavBar() {
  return (
    <S.NavBar>
      <OutlineBoxButton
        appendix={
          <img
            src={`${process.env.PUBLIC_URL}/images/arrow-right-icon.png`}
            alt="화살표"
            width="18"
          />
        }
      >
        질문하러 가기
      </OutlineBoxButton>
    </S.NavBar>
  );
}
