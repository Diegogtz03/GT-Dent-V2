import styles from '../styles/dashboard.module.css'
import ModalStyles from '../components/Modal/Modal.module.css'
import Head from "next/head";
import SearchBar from '@/components/SearchBar/SearchBar';
import ResultsTable from '@/components/ResultsTable/ResultsTable';
import DashboardMenu from "@/components/DashboardMenu/DashboardMenu";
import NewPatientModal from "@/components/NewPatientModal/NewPatientModal";
import { verifyUser } from "@/api/authAPI";
import { Julius_Sans_One } from 'next/font/google'
import { useState } from 'react';
import PatientRecordModal from '@/components/PatientRecordModal/PatientRecordModal';
import PrescriptionModal from '@/components/PrescriptionModal/PrescriptionModal';

const julis = Julius_Sans_One({ weight: '400', subsets: ['latin'] })

export const getServerSideProps = async (context) => {
  if (context.req.cookies.token != undefined) {
    const token = context.req.cookies.token.split(";")[0];

    if (token != "") {
      const validToken = await verifyUser(token);

      if (validToken) {
        return {
          props: { },
        };
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      }
    }
  }
  
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
};

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [activeModalId, setActiveModalId] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [modalClass, setModalClass] = useState('');
  const [blurredState, setBlurredState] = useState('');
  const [patientId, setPatientId] = useState(null);

  let modal;
  
  const showModal = (state, index) => {
    if (state) {
      setActiveModalId(index);
      setActiveModal(true);
      setBlurredState(styles.blurred);
      setTimeout(() => {
        setModalClass(ModalStyles.visible);
      }, 200);
    } else {
      setModalClass('');
      setBlurredState('');
      setTimeout(() => {
        setActiveModal(false);
        setActiveModalId(null);
      }, 200);
    }
  };

  if (activeModalId === 0) {
    modal = (<NewPatientModal secondaryClassName={modalClass} showModal={showModal} />);
  } else if (activeModalId === 1) {
    modal = (<PatientRecordModal secondaryClassName={modalClass} showModal={showModal} patientId={patientId} />);
  } else {
    modal = (<PrescriptionModal secondaryClassName={modalClass} showModal={showModal} />);
  }

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href='/favicon.ico' />
        <title>Pacientes</title>
        <meta name='dashboard' content='Dashboard principal' />
      </Head>

      <main className={styles.main}>
        { activeModal && modal }
        <div className={`${styles.wrapper} ${blurredState}`}>
          <DashboardMenu showModal={showModal}  />

          <SearchBar setPatients={setPatients} />

          { patients.length != 0 ?
            <ResultsTable patients={patients} showModal={showModal} setPatientId={setPatientId} />
            :
            ''
          }
        </div>
      </main>
    </>
  )
}

export default Dashboard