import * as React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={(e) => onClick && onClick()}>
      {children}
    </button>
  );
};

export default React.memo(Button);
