import { StyledButton } from "./styles";

export const Button = ({ children, variant, size, ...rest }) => {
  return (
    <StyledButton variant={variant} size={size} {...rest}>
      {children}
    </StyledButton>
  );
};
