import styles from './PatientRecordModal.module.css';
import Modal from '../Modal/Modal';
import GlowBtn from '../GlowBtn/GlowBtn';
import PatientInfoForm from '../PatientInfoForm/PatientInfoForm';
import Odontogram from '../Odontogram/Odontogram';
import PatientInfo from '../PatientInfo/PatientInfo';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import CustomButton from '../CustomButton/CustomButton';
import Image from 'next/image';
import { updatePatient } from '@/api/patientInfoAPI';
import { getPatientRecord } from '@/api/retrievalAPI';
import { getCookie } from '@/utils/cookies';
import { useState, useEffect } from 'react';

function PatientRecordModal({ secondaryClassName, showModal, patientId, setPatientId, setSearchValue, setSearchDate, setPatients, showToast, setPatientName }) {
  const [modalType, setModalType] = useState(0);
  const [patientData, setPatientData] = useState(null);
  const [hasEdited, setHasEdited] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const cookie = getCookie("token", document);
      const patientData = await getPatientRecord(cookie, patientId);
      setPatientData(patientData);
      setSearchValue('');
      setSearchDate('');
      setPatients([]);
      setPatientId(null);
    }

    fetchData();
  }, []);

  const checkForm = () => {
    if (patientData.patient.name == '') {
      showToast("Ingrese un nombre", 3)
      return false;
    }

    if (patientData.patient.birthday == '') {
      showToast("Ingrese una fecha de nacimiento", 3)
      return false;
    }

    if (patientData.patient.phone == '') {
      showToast("Ingrese un número de teléfono", 3)
      return false;
    }

    return true;
  }

  const handleSaveBtn = async () => {
    if (checkForm()) {
      const cookie = getCookie("token", document);
      const result = await updatePatient(cookie, patientData);

      if (result.success) {
        showToast(result.message, 1);
        showModal(false);
      } else {
        showToast(result.message, 2);
      }
    }
  }

  const handleCloseBtn = () => { 
    if (hasEdited) {
      // REQUEST CONFIRMATION
      if (confirm("¿Está seguro que desea salir sin guardar?")) {
        showModal(false);
      }
    } else {
      showModal(false);
    }
  };

  const handleTabChange = (e) => {
    setModalType(e.target.value);
  }

  const handlePrescriptionBtn = () => {
    if (checkForm()) {
      handleSaveBtn();
      showModal(false);
      setPatientName(patientData.patient.name);
      setTimeout(() => {
        showModal(true, 2);
      }, 300);
    }
  }

  return (
    <Modal secondaryClassName={secondaryClassName} showModal={showModal} title={modalType == 0 ? 'Expediente' : 'Información'} patientName={patientData != null ? patientData.patient.name : ''} customCloseHandler={handleCloseBtn}>
      <div className={styles.wrapper}>
        <div className={styles.centerBtns}>
          <div className={styles.tabs}>
            <input type="radio" id="expediente" name="fav_language_two" value={0} checked={modalType == 0} onChange={handleTabChange} />
            <label htmlFor="expediente">Expediente</label>
            <input type="radio" id="paciente" name="fav_language_two" value={1} checked={modalType == 1} onChange={handleTabChange} />
            <label htmlFor="paciente">Paciente</label>
          </div>
        </div>

        {modalType == 0 ? (
          <div className={styles.patientInfoWrapper}>
            { patientData != null ? (
              <>
                <PatientInfoForm patientData={patientData} setPatientData={setPatientData} hasEdited={hasEdited} setHasEdited={setHasEdited} />
                <Odontogram patientData={patientData} setPatientData={setPatientData} hasEdited={hasEdited} setHasEdited={setHasEdited} />
              </>
            ) : (
              <LoadingIndicator />
            )
            }
          </div>
        ) : (
          <PatientInfo patientData={patientData} setPatientData={setPatientData} hasEdited={hasEdited} setHasEdited={setHasEdited} />
        )}

        <div className={styles.prescriptionBtnWrapper}>
          <CustomButton className={styles.prescriptionBtn} onclick={() => handlePrescriptionBtn()}>
            <Image src={'/icons/clipboard.svg'} alt="Prescription icon" width={30} height={35} />
          </CustomButton>
        </div>

        <GlowBtn text={'Guardar'} onClick={handleSaveBtn} />
      </div>
    </Modal>
  )
}

export default PatientRecordModal;