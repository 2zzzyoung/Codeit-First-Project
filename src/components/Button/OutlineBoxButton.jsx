import BoxButton from './BoxButton';
import styled from 'styled-components';

export default function OutlineBoxButton({
  ButtonName = '',
  imageSource = '',
  imageAlt = '',
}) {
  return (
    <OutlineButton>
      <img src={imageSource} alt={imageAlt} width="18px" />
      {ButtonName}
      <img src={imageSource} alt={imageAlt} width="18px" />
    </OutlineButton>
  );
}

const OutlineButton = styled(BoxButton)`
  background: var(--Brown-10);
  border: 1px solid var(--Brown-40);
  color: var(--Brown-40);

  &:focus {
    border: 2px solid var(--Brown-40);
  }

  &:hover {
    background-color: var(--Brown-10);
    border: 2px solid var(--Brown-40);
  }

  &:active {
    background-color: var(--Brown-20);
    border: 2px solid var(--Brown-40);
  }

  &:disabled {
    background-color: var(--Brown-10);
    border: 1px solid var(--Brown-30);
  }
`;
