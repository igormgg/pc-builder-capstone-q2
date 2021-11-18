import { StyledButton } from "./styles";

export const Button = ({
  children,
  variant,
  size,
  disabled = false,
  loading = false,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      loading={loading}
      size={size}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
