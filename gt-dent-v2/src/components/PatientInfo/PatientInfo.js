import styles from './PatientInfo.module.css';
import Image from 'next/image';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect} from 'react';
import { toIsoString } from '@/api/patientInfoAPI';

function PatientInfo({ patientData, setPatientData, hasEdited, setHasEdited }) {
  const [calendarViewIsOpen, setCalendarViewIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (patientData.patient.birthday != null) {
      var newDate = new Date(patientData.patient.birthday);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  }, [])

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '');
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  const transformData = (fieldName, value) => {
    if (fieldName == 'phone') {
      return formatPhoneNumber(value);
    } else {
      return value;
    }
  }

  const handleChange = (e, fieldName) => {
    if (!hasEdited) {
      setHasEdited(true);
    }
    
    var value = e;

    if (fieldName != 'birthday') {
      value = e.target.value;
    }

    setPatientData({
      ...patientData,
      patient: {
        ...patientData.patient,
        [fieldName]: transformData(fieldName, value)
      }
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <Image src="/icons/user.svg" width={40} height={40} alt="User Icon" />
        <input 
          className={styles.inputStyle} 
          type="text"
          id="name"
          placeholder="Nombre"
          value={patientData.patient.name}
          onChange={(e) => handleChange(e, 'name')}
        />
      </div>

      <div className={styles.formGroup} onClick={() => !calendarViewIsOpen && setCalendarViewIsOpen(true)}>
        <Image src="/icons/calendar.svg" width={40} height={40} alt="Calendar Icon" />
        <DatePicker
          className={styles.inputStyle}
          value={dayjs(toIsoString(new Date(currentDate)))}
          views={['year', 'month', 'day']}
          onChange={(e) => handleChange(e, 'birthday')}
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
          value={patientData.patient.phone} 
          onChange={(e) => handleChange(e, 'phone')} 
        />
      </div>
    </div>
  )
}

export default PatientInfo;