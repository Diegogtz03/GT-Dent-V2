import styles from './Toast.module.css';

function Toast({ message, type, secondaryClassName }) {
  const toastTypes = {
    1: styles.success,
    2: styles.error,
    3: styles.warning,
    4: styles.info,
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.toast} ${toastTypes[type]} ${secondaryClassName}`}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}

export default Toast;