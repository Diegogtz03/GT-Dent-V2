import { useRouter } from 'next/router';
import styles from './DashboardMenu.module.css'
import CustomButton from '../CustomButton/CustomButton';
import Image from 'next/image'
import { tradeGothic } from '../../utils/fonts'
import { Julius_Sans_One } from 'next/font/google'
import { useState, useEffect } from 'react';

const julis = Julius_Sans_One({ weight: '400', subsets: ['latin'] })

function DashboardMenu({ showModal }) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogOut = async () => {  
    document.cookie = 'token=;';

    router.push('/');
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token != undefined) {
      setUsername(JSON.parse(token).username);
    }
  }, []);

  return (
    <header className={styles.wrapper}>
      <Image className={styles.logoImg} src="/GTDent-Icon.png" alt="GT Dent Logo" width={100} height={90} />
      <h1 className={`${julis.className} ${styles.headerTitle}`}>GT Dent</h1>

      <div className={styles.headerButtons}>
        <div className={styles.registerButtonWrapper}>
          <CustomButton type='button' onclick={() => showModal(true, 0)}>
            <svg width="42" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6 23H31.4M23 31.4V14.6M23 44C34.55 44 44 34.55 44 23C44 11.45 34.55 2 23 2C11.45 2 2 11.45 2 23C2 34.55 11.45 44 23 44Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CustomButton>
        </div>

        <div className={styles.prescriptionButtonWrapper}>
          <CustomButton type='button' onclick={() => showModal(true, 2)}>
            <svg width="42" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              <path d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="#ffffff" strokeWidth="1.5"></path> 
              <path d="M8 12H16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> 
              <path d="M8 8H16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> 
              <path d="M8 16H13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
            </svg>
          </CustomButton>
        </div>

        <div className={styles.userButtonWrapper}>
          <CustomButton>
            <svg width="35" height="48" viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40.6118 46.6667C40.6118 38.2817 32.2701 31.5 22.0001 31.5C11.7301 31.5 3.38843 38.2817 3.38843 46.6667M22.0001 25C24.8733 25 27.6288 23.8586 29.6604 21.827C31.6921 19.7954 32.8334 17.0399 32.8334 14.1667C32.8334 11.2935 31.6921 8.538 29.6604 6.50635C27.6288 4.47471 24.8733 3.33334 22.0001 3.33334C19.1269 3.33334 16.3714 4.47471 14.3398 6.50635C12.3081 8.538 11.1668 11.2935 11.1668 14.1667C11.1668 17.0399 12.3081 19.7954 14.3398 21.827C16.3714 23.8586 19.1269 25 22.0001 25Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CustomButton>
          <div className={styles.userTooltip}>
            <h2 className={`${styles.username} ${tradeGothic.className}`}>@{username}</h2>
            <CustomButton styles={{ marginTop:0 }} onclick={() => handleLogOut()}>
              <span className={`${styles.textButton} ${tradeGothic.className}`}>Cerrar Sesión</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardMenu;