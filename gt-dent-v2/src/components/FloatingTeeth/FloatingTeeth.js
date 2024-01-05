import styles from './FloatingTeeth.module.css';
import Image from 'next/image';

function FloatingTeeth() {
  return (
    <div className={styles.container}>
      <Image src={'/teeth.png'} alt="GT Dent Logo" width={250} height={250} />
    </div>
  );
}

export default FloatingTeeth;