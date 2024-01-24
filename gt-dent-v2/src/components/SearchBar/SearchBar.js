import styles from './SearchBar.module.css'
import CustomButton from '../CustomButton/CustomButton';
import { useState } from 'react';
import { getPatientsByName, getPatientsByDate } from '../../api/retrievalAPI';
import { getCookie } from '@/utils/cookies';
import { palette } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';

function SearchBar({ searchValue, setSearchValue, searchDate, setSearchDate, setPatients, setIsLoading }) {
  const [searchType, setSearchType] = useState(0); // 0 = name, 1 = date
  const [storedPatients, setStoredPatients] = useState([]);
  const [calendarViewIsOpen, setCalendarViewIsOpen] = useState(false);

  const resetValues = () => {
    setSearchValue('');
    setSearchDate('');
    setPatients([]);
    setStoredPatients([]);
  }

  const changeSearchType = () => {
    if (searchType == 0) {
      setSearchType(1);
    } else {
      setSearchType(0);
    }
    resetValues();
  }

  const search = (searchText) => {
    if (searchType == 0) {
      const cookie = getCookie('token', document);

      if (searchText.length === 1 || searchText.length === 2) {
        setIsLoading(true);
        getPatientsByName(cookie, searchText, 0).then((res) => {
          setPatients(res);
          setIsLoading(false);
        });
      } else if (searchText.length == 3) {
        setIsLoading(true);
        getPatientsByName(cookie, searchText, 1).then((res) => {
          setStoredPatients(res);
          setPatients(res);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
        setPatients(storedPatients.filter((patient) => {
          return patient.name.toLowerCase().includes(searchText.toLowerCase());
        }));
      }
    } else {
      const cookie = getCookie('token', document);

      getPatientsByDate(cookie, searchText).then((res) => {
        setPatients(res);
      });
    }

    if (searchText == '') {
      resetValues();
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBarContainer}>
        <div className={styles.typeBtn}>
          {searchType == 0 ? (
            <CustomButton className={styles.btn} type='button' onclick={() => changeSearchType()}>
              <svg width={44} height={44} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <circle cx="9" cy="9" r="2" stroke="#18203a" strokeWidth="1.5"></circle> 
                  <path d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z" stroke="#18203a" strokeWidth="1.5"></path> 
                  <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#18203a" strokeWidth="1.5"></path> 
                  <path d="M19 12H15" stroke="#18203a" strokeWidth="1.5" strokeLinecap="round"></path> 
                  <path d="M19 9H14" stroke="#18203a" strokeWidth="1.5" strokeLinecap="round"></path> 
                  <path d="M19 15H16" stroke="#18203a" strokeWidth="1.5" strokeLinecap="round"></path> 
                </g>
              </svg>
            </CustomButton>
          ) : (
            <CustomButton className={styles.btn} type='button' onclick={() => changeSearchType()}>
              <svg width={44} height={44} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#1c222c" strokeWidth="2" strokeLinecap="round"></path> 
                </g>
              </svg>
            </CustomButton>
          )}
        </div>
        <div className={styles.separator} />
        <div className={styles.inputField}>
          {searchType == 0 ? (
            <input 
              className={styles.inputStyle} 
              placeholder="Busqueda" 
              type="text" 
              value={searchValue} 
              onChange={e => {
                  setSearchValue(e.target.value);
                  // ONE BEHIND
                  search(e.target.value);
                  // SET LOADING
                }
              }
            />
          ) : (
            <div className={styles.datepicker} onClick={() => !calendarViewIsOpen && setCalendarViewIsOpen(true)}>
              <DatePicker
                className={styles.inputStyle}
                value={searchDate}
                views={['year', 'month', 'day']}
                onChange={(newDate) => {
                  setSearchDate(newDate)
                }}
                onAccept={(newDate) => {
                  const date = new Date(newDate.$d).toISOString()
                  setCalendarViewIsOpen(false);
                  search(date);
                }}
                openTo='year'
                onClose={() => {
                  setCalendarViewIsOpen(false);
                }}
                open={calendarViewIsOpen}
                sx={{ 
                  border: 'text.secondary' 
                }}
              />
            </div>

          )}
        </div>
        <div className={styles.clearBtnWrapper}>
          <button className={`${styles.clearBtn} ${searchValue == '' && searchDate == '' ? styles.hidden : ''}`} onClick={() => resetValues()}>
            ⓧ
          </button>
        </div>
        <div className={styles.separator} />
        <div className={styles.searchBtn}>
          <CustomButton className={styles.btn} type='button'>
            <svg width={34} height={34} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#5CB6E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g>
            </svg>
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;