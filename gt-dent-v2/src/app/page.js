"use client";

import Image from 'next/image'
import styles from '../styles/landing.module.css'
import { Julius_Sans_One } from 'next/font/google'
import { useState, useRef, useEffect } from 'react'
import FloatingTeeth from '../components/FloatingTeeth/FloatingTeeth'

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

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={styles.main}>
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
            // CHECK LOGIN
          }}>
            <input 
              className={styles.inputStyle} 
              placeholder="Usuario"
              type="username" 
              id="username" 
              name="username"
              value={username}
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
              onChange={e => {
                setPassword(e.target.value);
              }}
            />

            <button className={styles.loginBtn} type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </main>
  )
}
