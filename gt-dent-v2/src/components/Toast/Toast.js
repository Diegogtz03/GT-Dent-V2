import styles from './Toast.module.css';

function Toast({ message, type }) {
  toastTypes = {
    1: 'success',
    2: 'error',
    3: 'warning',
    4: 'info',
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.toast} ${toastTypes[type]}`}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  )
}

export default Toast;