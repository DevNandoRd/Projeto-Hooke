'use client'
import { useState } from 'react';
import styles from '../GeradorLink/Gerador.module.css'
import { TextField } from "@mui/material";
import Showlink from '../ShowLink/ShowLink';


export default function GeradorLink() {
  const [numero, setNumero] = useState()
  const [texto, setTexto] = useState('')

  const handleNumber = (e) => {
    setNumero(e.target.value)
  }
  const handleText = (e) => {
    setTexto(e.target.value)
  }

  console.log(numero)
  return (
    <>
      <div className={styles.form}>
        <h2>Digite o seu número com DDD</h2>
        <TextField
          label="Digite o número aqui"
          type="number" required
          onChange={handleNumber}
        />
        <h2>Personalize o seu link com uma mensagem</h2>
        <TextField
          id="outlined-multiline-static"
          label="Seu texto aqui"
          multiline
          rows={4}
          onChange={handleText}
        />
        <Showlink
          texto={texto}
          numero={numero}
        />
      </div>
    </>
  );
}
