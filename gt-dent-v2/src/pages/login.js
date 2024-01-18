import Image from 'next/image'
import styles from '../styles/landing.module.css'
import FloatingTeeth from '../components/FloatingTeeth/FloatingTeeth'
import Toast from '@/components/Toast/Toast';
import toastStyles from '@/components/Toast/Toast.module.css';
import { Julius_Sans_One } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { login } from '../api/authAPI'
import { verifyUser } from '../api/authAPI'
const julis = Julius_Sans_One({ weight: '400', subsets: ['latin'] })

function normalize(value, min, max, newMin, newMax) {
  return (value - min) * (newMax - newMin) / (max - min) + newMin;
}

function draw(width, height, numRows, numCols, ctx) {
  ctx.clearRect(0, 0, width, height);

  for (let rowI = 0; rowI < numRows; rowI++) {
    for (let colI = 0; colI < numCols; colI++) {
      let x = normalize(colI, 0, numCols, 0, width) + 30;
      let y = normalize(rowI, 0, numRows, 0, height) + 20;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2, false);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();
      
      ctx.closePath();
    }
  }
}

const DottedBackground = props => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const canvas = canvasRef.current
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')

    draw(width, height, 20, 20, context);
  }, [])

  return <canvas ref={canvasRef} {...props} />
};

export const getServerSideProps = async (context) => {
  if (context.req.cookies.token != undefined) {
    const token = context.req.cookies.token.split(";")[0];

    if (token != "") {
      let validToken = await verifyUser(token);

      if (validToken) {
        return {
          redirect: {
            permanent: false,
            destination: "/dashboard",
          }
        };
      }
    }
  }

  return { props: { } };
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastStyle, setToastStyle] = useState(toastStyles.hidden);
  const [toastType, setToastType] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showToast = (message, type) => {
    if (toastStyle != null) {
      setToastStyle(toastStyles.toast);
      setMessage(message);
      setToastStyle(null);
      setToastType(type);
      setTimeout(() => {
        setToastStyle(toastStyles.hidden);
      }, 3000);
    } else {
      setToastStyle(toastStyles.hidden);
      setMessage(message);
      setToastType(type);

      setTimeout(() => {
        setToastStyle(null);
      }, 300);

      setTimeout(() => {
        setToastStyle(toastStyles.hidden);
      }, 3000);
    }
  };

  const loginCheck = async () => {
    setLoading(prevState => !prevState);
    let data = await login(username, password);

    if (data.successLogin) {
      showToast(data.message, 1)
      var midnight = new Date();
      midnight.setHours(23,59,59,0);
      document.cookie = `token=${data.cookie};expires=${midnight.toUTCString()};path=/`
      router.push("/dashboard");
    } else {
      showToast(data.message, 2)
    }

    setLoading(prevState => !prevState);
  };

  return (
    <main className={styles.main}>
      <Toast message={message} type={toastType} secondaryClassName={toastStyle} />

      <title>Login</title>
      <DottedBackground className={styles.backgroundCanvas} />
      <FloatingTeeth />

      <div className={styles.header}>
        <Image src={'/GTDent-Icon.png'} alt="GT Dent Logo" width={120} height={100} />
        <h1 className={`${julis.className} ${styles.headerTitle}`}>GT Dent</h1>
      </div>

      <div className={styles.landingContent}>
        <div className={styles.loginContainer}>
          <h2 className={styles.loginTitle}>Bienvenid@</h2>

          <form className={styles.loginForm} onSubmit={(e) => {
            e.preventDefault();
            loginCheck();
          }}>
            <input 
              className={styles.inputStyle} 
              placeholder="Usuario"
              type="username" 
              id="username" 
              name="username"
              value={username}
              disabled={loading}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />

            <input 
              className={styles.inputStyle} 
              placeholder="Constraseña"
              type="password"
              id="password" 
              name="password"
              value={password}
              disabled={loading}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />

            <button 
              className={styles.loginBtn} 
              disabled={loading}
              type="submit">Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
