import styles from './ResultsTable.module.css';

function ResultsTable({ patients, showModal, setPatientId }) {
  const formatBirthday = (birthday) => {
    const date = new Date(birthday);

    const months = [
      "ene", "feb", "mar", "abr", "may", "jun",
      "jul", "ago", "sep", "oct", "nov",
      "dic"
    ];

    return `${date.getDate() + 1} / ${months[date.getMonth()]} / ${date.getFullYear()}`;
  }

  const getAge = (birthday) => {
    const date = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - date.getFullYear();

    if (today.getMonth() < date.getMonth()) {
      age--;
    } else if (today.getMonth() == date.getMonth()) {
      if (today.getDate() < date.getDate()) {
        age--;
      }
    }

    return age;
  }

  const handlePatientClick = (patientId) => {
    setPatientId(patientId);
    showModal(true, 1);
  }

  return (
    <div className={styles.wrapper}>
      {patients.map((patient) => {
        return (
          <button className={styles.patientBtn} key={patient.id} onClick={() => handlePatientClick(patient.id)}>
            <div className={styles.patientBtnContent}>
              <h3 className={styles.patientName}>{patient.name}</h3>
              <div className={styles.separator} />
              <h3>{formatBirthday(patient.birthday)}</h3>
              <div className={styles.separator} />
              <h3>{getAge(patient.birthday)}</h3>
              <div className={styles.separator} />
              <h3>{patient.phone}</h3>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default ResultsTable;