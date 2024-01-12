import styles from './NewPatientModal.module.css';
import Modal from '../Modal/Modal';
import Image from 'next/image';
import GlowBtn from '../GlowBtn/GlowBtn';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { registerPatient } from '@/api/patientInfoAPI';
import { getCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

function NewPatientModal({ secondaryClassName, showModal }) {
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [phone, setPhone] = useState('')
  const [calendarViewIsOpen, setCalendarViewIsOpen] = useState(false);

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

    const cookie = getCookie('token', document);
    const date = new Date(birthdate);

    if (cookie == null) {
      router.push('/login')
      return;
    }

    const data = await registerPatient(cookie, name, date.toISOString(), phone);

    if (data.patientId == -1) {
      alert(data.message);
      // SHOW TOAST
    } else {
      alert(data.message);
      console.log(data.patientId)
      // SHOW TOAST
      showModal(false);
    }
  }

  const checkForm = () => {
    if (name == '') {
      alert("Ingrese un nombre");
      return false;
    }

    if (birthdate == '') {
      alert("Ingrese una fecha de nacimiento");
      return false;
    }

    if (phone == '') {
      alert("Ingrese un número de teléfono");
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
          
          <GlowBtn text={"Registrar"} onClick={() => handleSubmit()} />
        </div>
      </div>
    </Modal>
  )
}

export default NewPatientModal;