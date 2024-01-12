import styles from './GlowBtn.module.css';
import { useEffect } from 'react';

function GlowBtn({ text, onClick }) {
  // effect to track mouse position

  const handlePointerMove = (e) => {
    const pointerX = e.clientX
    const pointerY = e.clientY
    
    const x = pointerX.toFixed(2)
    const y = pointerY.toFixed(2)
    const xp = (pointerX / window.innerWidth).toFixed(2)
    const yp = (pointerY / window.innerHeight).toFixed(2)
    document.documentElement.style.setProperty('--x', x)
    document.documentElement.style.setProperty('--xp', xp)
    document.documentElement.style.setProperty('--y', y)
    document.documentElement.style.setProperty('--yp', yp)
  }

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    }
  }, []);

  return (
    <button className={styles.btn} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}

export default GlowBtn;