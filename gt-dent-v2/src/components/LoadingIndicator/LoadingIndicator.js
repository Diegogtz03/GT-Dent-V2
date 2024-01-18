import style from './LoadingIndicator.module.css';

function LoadingIndicator() {
  return (
    <div className={style.spinnerContainer}>
      <div className={style.loadingSpinner}>
      </div>
    </div>
  );
}

export default LoadingIndicator