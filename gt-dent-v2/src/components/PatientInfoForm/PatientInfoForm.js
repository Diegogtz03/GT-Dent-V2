import styles from './PatientInfoForm.module.css';
import { useState, useEffect } from 'react';

function PatientInfoForm({ patientData }) {
  const [diagnosticNumber, setDiagnosticNumber] = useState(1);
  
  const [diagnostic1, setDiagnostic1] = useState('');
  const [diagnostic2, setDiagnostic2] = useState('');
  const [diagnostic3, setDiagnostic3] = useState('');
  const [diagnostic4, setDiagnostic4] = useState('');
  const [allergies, setAllergies] = useState('');
  const [nextAppointment, setNextAppointment] = useState('');

  useEffect(() => {
    if (patientData == null) return;

    setDiagnostic1(patientData.expediente.diagnostic1);
    setDiagnostic2(patientData.expediente.diagnostic2);
    setDiagnostic3(patientData.expediente.diagnostic3);
    setDiagnostic4(patientData.expediente.diagnostic4);
    setAllergies(patientData.expediente.background);
    setNextAppointment(patientData.expediente.nextapp);
  }, [patientData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.diagnosticWrapper}>
        <div className={styles.diagnosticNumber}>
          <h3>{diagnosticNumber}</h3>
        </div>
        
        <h2>Diagnostico</h2>

        <textarea value={diagnostic1} className={styles.diagnosticInput} placeholder='Diagnostico' />
      </div>
    </div>
  );
}

export default PatientInfoForm;