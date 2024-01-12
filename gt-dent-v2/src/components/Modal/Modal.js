import styles from './Modal.module.css';
import CustomButton from '../CustomButton/CustomButton';
import { Julius_Sans_One } from 'next/font/google'

const julis = Julius_Sans_One({ weight: '400', subsets: ['latin'] })

function Modal({children, title, secondaryClassName = '', showModal, customStyle={}}) {
  return (
    <div className={`${styles.wrapper} ${secondaryClassName}`}>
      <div className={styles.noiseWrapper} />
      <div className={styles.header}>
        <span className={julis.className}>{title}</span>
      </div>
      <CustomButton className={styles.closeBtn} onclick={() => showModal(false)}>
        ⓧ
      </CustomButton>
      <div className={styles.overflowContent} style={customStyle}>
        {children}
      </div>
    </div>
  );
}

export default Modal;