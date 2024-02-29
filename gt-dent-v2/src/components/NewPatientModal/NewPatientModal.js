import styles from './NewPatientModal.module.css';
import Modal from '../Modal/Modal';
import Image from 'next/image';
import GlowBtn from '../GlowBtn/GlowBtn';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { registerPatient, toIsoString } from '@/api/patientInfoAPI';
import { getCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

function NewPatientModal({ secondaryClassName, showModal, setPatientId, showToast }) {
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [phone, setPhone] = useState('')
  const [calendarViewIsOpen, setCalendarViewIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  const handleSubmit = async () => {
    if (!checkForm()) return;

    setIsLoading(true);

    const cookie = getCookie('token', document);
    var date = new Date(birthdate);

    if (cookie == null || cookie.expiresIn < Date.now() ) {
      router.push('/login')
      return;
    }

    const data = await registerPatient(cookie, name, toIsoString(date), phone);

    if (data.patientId == -1) {
      showToast(data.message, 2)
    } else {
      showToast("Paciente registrado", 1)
      setPatientId(data.patientId);
      showModal(false);

      setTimeout(() => {
        showModal(true, 1);
      }, 250);
    }

    setIsLoading(false);
  }

  const checkForm = () => {
    if (name == '') {
      showToast("Ingrese un nombre", 3)
      return false;
    }

    if (birthdate == '') {
      showToast("Ingrese una fecha de nacimiento", 3)
      return false;
    }

    if (phone == '') {
      showToast("Ingrese un número de teléfono", 3)
      return false;
    }

    return true;
  }

  return (
    <Modal title={"Registro"} secondaryClassName={secondaryClassName} showModal={showModal}>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <Image src="/icons/user.svg" width={40} height={40} alt="User Icon" />
            <input 
              className={styles.inputStyle} 
              type="text" 
              id="name" 
              placeholder="Nombre"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div className={styles.formGroup} onClick={() => !calendarViewIsOpen && setCalendarViewIsOpen(true)}>
            <Image src="/icons/calendar.svg" width={40} height={40} alt="Calendar Icon" />
            <DatePicker
              className={styles.inputStyle}
              value={birthdate}
              views={['year', 'month', 'day']}
              onChange={(e) => setBirthdate(e)}
              openTo='year'
              open={calendarViewIsOpen}
              onClose={() => {
                setCalendarViewIsOpen(false);
              }}
              onAccept={(newDate) => {
                setCalendarViewIsOpen(false);
              }}
            />
          </div>

          <div className={styles.formGroup}>
            <Image src="/icons/phone.svg" width={40} height={40} alt="Phone Icon" />
            <input 
              className={styles.inputStyle} 
              type="tel" id="phone" 
              placeholder="Teléfono"
              value={phone} 
              onChange={(e) => setPhone(formatPhoneNumber(e.target.value))} 
            />
          </div>

          {isLoading &&
            <LoadingIndicator />
          }
          
          <GlowBtn text={"Registrar"} onClick={() => handleSubmit()} disabled={isLoading} />
        </div>
      </div>
    </Modal>
  )
}

export default NewPatientModal;