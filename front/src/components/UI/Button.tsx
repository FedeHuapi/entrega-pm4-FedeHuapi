import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit';
  className?: string;
  disabled: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, className, disabled, children, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
