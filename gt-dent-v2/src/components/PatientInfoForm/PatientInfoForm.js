import styles from './PatientInfoForm.module.css';
import { useState } from 'react';
import Image from 'next/image';

function PatientInfoForm({ patientData, setPatientData, hasEdited, setHasEdited }) {
  const [diagnosticNumber, setDiagnosticNumber] = useState(1);
  const [fwdSecondary, setFwdSecondary] = useState(styles.fwdBtnActive);
  const [backSecondary, setBackSecondary] = useState('');

  const handleFwdBtn = () => {
    if (diagnosticNumber == 4) return;

    setDiagnosticNumber(diagnosticNumber + 1);
    setBackSecondary(styles.backBtnActive);
    setFwdSecondary(styles.fwdBtnActive);

    if (diagnosticNumber == 3) {
      setFwdSecondary('');
    }
  }

  const handleBackBtn = () => {
    if (diagnosticNumber == 1) return;

    setDiagnosticNumber(diagnosticNumber - 1);
    setBackSecondary(styles.backBtnActive);
    setFwdSecondary(styles.fwdBtnActive);

    if (diagnosticNumber == 2) {
      setBackSecondary('');
    }
  }

  const handleChange = (e, fieldName) => {
    if (!hasEdited) {
      setHasEdited(true);
    }
    
    setPatientData((prevData) => ({
      ...prevData,
      expediente: {
        ...prevData.expediente,
        [fieldName]: e.target.value,
      },
    }));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.diagnosticWrapper}>
        <div className={styles.diagnosticContent}>
          <div className={styles.diagnosticNumber}>
            <h3>{diagnosticNumber}</h3>
          </div>
          
          <h2>Diagnostico</h2>

          <textarea
            value={patientData.expediente[`diagnostic${diagnosticNumber}`]} 
            className={styles.diagnosticInput} 
            placeholder='Diagnostico' 
            onChange={(e) => {handleChange(e, `diagnostic${diagnosticNumber}`)}}
          />
          
        </div>

        <button 
          className={`${styles.fwdBtn} ${fwdSecondary}`}
          onClick={handleFwdBtn}
        >
          <Image src='/icons/arrow.svg' width={30} height={30} alt='right arrow icon' />
        </button>

        <button 
          className={`${styles.backBtn} ${backSecondary}`}
          onClick={handleBackBtn}
        >
          <Image className={styles.rotatedImage} src='/icons/arrow.svg' width={30} height={30} alt='left arrow icon' />
        </button>
      </div>

      <div className={styles.allergiesWrapper}>
        <Image src='/icons/allergies.svg' width={35} height={35} alt='allergies icon' />
        <textarea
          value={patientData.expediente.background}
          className={styles.allergiesInput}
          placeholder='Antecedentes'
          onChange={(e) => handleChange(e, 'background')}
        />
      </div>

      <div className={styles.nextAppWrapper}>
        <Image src='/icons/clock.svg' width={35} height={35} alt='clock icon' />
        <textarea
          value={patientData.expediente.nextapp}
          className={styles.nextAppInput}
          placeholder='Siguiente cita'
          onChange={(e) => handleChange(e, 'nextapp')}
        />
      </div>
    </div>
  );
}

export default PatientInfoForm;