import styles from './PatientRecordModal.module.css';
import Modal from '../Modal/Modal';
import GlowBtn from '../GlowBtn/GlowBtn';
import PatientInfoForm from '../PatientInfoForm/PatientInfoForm';
import { getPatientRecord } from '@/api/retrievalAPI';
import { getCookie } from '@/utils/cookies';
import { useState, useEffect } from 'react';

function PatientRecordModal({ secondaryClassName, showModal, patientId }) {
  const [modalType, setModalType] = useState(0);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cookie = getCookie("token", document);
      const patientData = await getPatientRecord(cookie, patientId);
      setPatientData(patientData);
    }

    fetchData();
  }, []);

  // patientData = { patient: {}, odontograma: {}, expediente: {} }

  return (
    <Modal secondaryClassName={secondaryClassName} showModal={showModal} title={modalType == 0 ? 'Expediente' : 'Información'}>
      <div className={styles.wrapper}>
        {/* TOGGLER HERE */}
        {modalType == 0 ? (
          <div className={styles.patientInfoWrapper}>
            <PatientInfoForm patientData={patientData} setPatientData={setPatientData} />
          </div>
        ) : (
          <>
          {/* PATIENT INFO DATA */}
          </>
        )}

        <GlowBtn text={'Guardar'} onClick={() => {}} />
      </div>
    </Modal>
  )
}

export default PatientRecordModal;