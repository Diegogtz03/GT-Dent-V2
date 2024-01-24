import styles from './PrescriptionModal.module.css';
import Modal from '../Modal/Modal';
import dayjs from 'dayjs';
import Image from 'next/image';
import GlowBtn from '../GlowBtn/GlowBtn';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getCookie } from '@/utils/cookies';

function PrescriptionModal({ secondaryClassName, showModal, prescriptionName = '', showToast, setPatientName }) {
  const [name, setName] = useState(prescriptionName);
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState('');
  const [calendarViewIsOpen, setCalendarViewIsOpen] = useState(false);

  const checkFields = () => {
    if (name === '' || content === '') {
      showToast('Campos vacios', 3);
      return false;
    }

    return true;
  }

  const formatDate = () => {
    const newdate = new Date(date);

    const day = newdate.getDate();
    const month = newdate.getMonth() + 1;
    const year = newdate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const makePDF = async () => {
    setPatientName('');
    
    if (checkFields()) {
      var token = getCookie('token', document);
      token = JSON.parse(token);

      const pdfPath = `/docs/receta-${token.id}.pdf`;

      try {
        const response = await fetch(pdfPath);
        const arrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        const srcDoc = await PDFDocument.load(bytes);
        const timesFont = await srcDoc.embedFont(StandardFonts.TimesRoman)
        const page = srcDoc.getPages()[0]
        const { width, height } = page.getSize()

        page.drawText(formatDate(), {
          x: width / 2 + 160,
          y: height / 2 + 240,
          size: 13,
          font: timesFont,
          color: rgb(0, 0, 0)
        })

        page.drawText(name, {
          x: width / 2 - 180,
          y: height / 2 + 210,
          size: 15,
          font: timesFont,
          color: rgb(0, 0, 0)
        })

        page.drawText(content, {
          x: width / 2 - 218,
          y: height / 2 + 102,
          size: 15,
          font: timesFont,
          color: rgb(0, 0, 0)
        })

        const pdfBytes = await srcDoc.save()

        // print pdf
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const blobUrl = URL.createObjectURL(blob)
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = blobUrl
        document.body.appendChild(iframe)
        iframe.contentWindow.print().then(() => {
          document.body.removeChild(iframe)
        });

      } catch (error) {
        showModal("PDF no encontrado", 3);
      }
    }
  }

  const handleCloseBtn = () => {
    setPatientName('');
    showModal(false);
  }
  
  return (
    <Modal title={'Receta'} secondaryClassName={secondaryClassName} showModal={showModal} customCloseHandler={handleCloseBtn}>
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
              value={dayjs(date)}
              views={['year', 'month', 'day']}
              onChange={(e) => setDate(e)}
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

          <div className={`${styles.formGroup} ${styles.textareaGroup}`}>
            <Image src="/icons/clipboard.svg" width={40} height={40} alt="Clipboard Icon" />
            <textarea 
              value={content}
              className={`${styles.inputStyle} ${styles.textareaStyle}`}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <GlowBtn text={"Imprimir"} onClick={() => makePDF()} />
        </div>
      </div>
    </Modal>
  );
}

export default PrescriptionModal;