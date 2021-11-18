import { StyledButton } from "./styles";

export const Button = ({
  children,
  variant,
  size,
  disabled = false,
  isLoading = false,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      isLoading={isLoading}
      size={size}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
