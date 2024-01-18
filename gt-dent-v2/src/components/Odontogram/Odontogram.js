import styles from './Odontogram.module.css';

function Odontogram({ patientData, setPatientData, hasEdited, setHasEdited }) {

  const handleInputChange = (i, j) => (e) => {
    if (!hasEdited) {
      setHasEdited(true);
    }
    
    setPatientData((prevData) => ({
      ...prevData,
      odontograma: {
        ...prevData.odontograma,
        [`d${i + 1}_${j + 1}`]: e.target.value,
      },
    }));
  };

  const translateRow = (row) => {
    switch (row) {
      case 0:
        return 1;
      case 1:
        return 0;
      default:
        return 0;
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topPanel}>
        {Array.from(Array(2)).map((_, i) => (
          <div className={styles.sectionWrapper} key={`TOP-${i}`}>
            {Array.from(Array(8)).map((_, j) => (
              <div className={styles.tooth} key={`d${i}-${j}`}>
                <div className={styles.toothNumber}>
                  <h3>{`${i + 1}.${j + 1}`}</h3>
                </div>
                <input 
                  type="text"
                  className={styles.toothInput}
                  value={patientData.odontograma[`d${i + 1}_${j + 1}`]}
                  onChange={handleInputChange(i, j)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.bottomPanel}>
        {Array.from(Array(2)).map((_, i) => (
          <div className={styles.sectionWrapper} key={`BOTTOM-${i}`}>
            {Array.from(Array(8)).map((_, j) => (
              <div className={styles.tooth} key={`d${translateRow(i)}-${j}`}>
                <div className={styles.toothNumber}>
                  <h3>{`${translateRow(i) + 3}.${j + 1}`}</h3>
                </div>
                <input 
                  type="text"
                  className={styles.toothInput}
                  value={patientData.odontograma[`d${translateRow(i) + 3}_${j + 1}`]}
                  onChange={handleInputChange(translateRow(i) + 2, j)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Odontogram