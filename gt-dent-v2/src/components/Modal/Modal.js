import styles from './Modal.module.css';
import CustomButton from '../CustomButton/CustomButton';
import { Julius_Sans_One } from 'next/font/google'

const julis = Julius_Sans_One({ weight: '400', subsets: ['latin'] })

function Modal({children, title, secondaryClassName = '', showModal, customStyle={}, patientName = '', customCloseHandler = null, notOverflow = false }) {

  return (
    <div className={`${styles.wrapper} ${secondaryClassName}`}>
      <div className={styles.noiseWrapper} />
      <div className={styles.header}>
        <span className={julis.className}>{title}</span>
        {patientName != '' && 
          <span className={styles.patientName}>{patientName}</span>
        }
      </div>
      <CustomButton className={styles.closeBtn} onclick={() => customCloseHandler == null ? showModal(false) : customCloseHandler()}>
        ⓧ
      </CustomButton>
      <div className={!notOverflow ? styles.overflowContent : styles.scrollContent} style={customStyle}>
        {children}
      </div>
    </div>
  );
}

export default Modal;