import React from 'react';

type Props = {
  type: 'button' | 'submit';
  onClick?: () => void;
  className: string;
  children: string | JSX.Element;
};

function Button({ type, onClick, className, children }: Props) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
