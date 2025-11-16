'use client'
import { useState } from 'react';
import styles from '../GeradorLink/Gerador.module.css';
import ShowLink from '../ShowLink/ShowLink';

export default function GeradorLink() {
  const [numero, setNumero] = useState('');
  const [texto, setTexto] = useState('');

  const handleNumber = (e) => {
    // Remove qualquer caractere que não seja número
    const value = e.target.value.replace(/\D/g, '');
    setNumero(value);
  };

  const handleText = (e) => {
    setTexto(e.target.value);
  };

  console.log(numero)
  return (
    <>
      <div className={styles.form}>
        <h2>Digite o seu número com DDD</h2>
        <input
          type="tel"
          placeholder="Digite o número aqui"
          value={numero}
          onChange={handleNumber}
          maxLength={13}
          className={styles.input}
          required
        />

        <h2>Personalize o seu link com uma mensagem</h2>
        <textarea
          placeholder="Seu texto aqui"
          rows={4}
          value={texto}
          onChange={handleText}
          className={styles.textarea}
        />

        <ShowLink
          texto={texto}
          numero={numero}
        />
      </div>
    </>
  );
}
