import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean; // Add disabled prop
}

const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
