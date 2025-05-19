type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  return <button onClick={onClick} {...props}>{children}</button>;
};
