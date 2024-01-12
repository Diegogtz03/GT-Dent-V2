import styles from './CustomButton.module.css';

function CustomButton({children, className = "", onclick = null, customStyle = {}, type = 'submit', disabled = false}) {
  return (
    <button className={`${styles.wrapper} ${className}`} onClick={onclick} style={customStyle} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

export default CustomButton;