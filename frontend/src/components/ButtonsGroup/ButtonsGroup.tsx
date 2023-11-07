import { StyledButton, StyledContainer } from "./styled";

type Props = {
  onRemove: () => void;
  onUpdate: () => void;
};

const ButtonsGroup = ({ onRemove, onUpdate }: Props): JSX.Element => {
  return (
    <StyledContainer>
      <StyledButton variant="outlined" color="primary" onClick={onUpdate}>
        Update
      </StyledButton>
      <StyledButton variant="outlined" color="secondary" onClick={onRemove}>
        Remove
      </StyledButton>
    </StyledContainer>
  );
};

export default ButtonsGroup;
