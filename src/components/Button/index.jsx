import { StyledButton } from "./styles";

export const Button = ({
  children,
  variant,
  size,
  disabled = false,
  ...rest
}) => {
  return (
    <StyledButton variant={variant} disabled={disabled} size={size} {...rest}>
      {children}
    </StyledButton>
  );
};
