'use client'
import React, { useState } from 'react';
import LinkDisplay from '../LinkDisplay/LinkDisplay';
import { usePhoneNumber } from '../../hooks/usePhoneNumber';
import styles from './LinkGenerator.module.css';

/**
 * Refactored LinkGenerator component (formerly GeradorLink)
 * - Improved naming convention (English)
 * - Better state management with custom hook
 * - Enhanced validation and user experience
 * - Cleaner component structure
 */
const LinkGenerator = () => {
  const [message, setMessage] = useState('');
  const { 
    phoneNumber, 
    handlePhoneNumberChange, 
    isValidPhoneNumber,
    getFormattedPhoneNumber 
  } = usePhoneNumber();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <h2 className={styles.inputLabel}>
            Digite o seu número com DDD
          </h2>
          <div className={styles.inputWrapper}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              maxLength={13}
              placeholder="Digite o número aqui"
              className={`${styles.input} ${phoneNumber.length > 0 && !isValidPhoneNumber() ? styles.inputError : ''}`}
              aria-describedby="phone-helper-text"
              required
            />
            <span className={styles.helperText} id="phone-helper-text">
              Exemplo: 11999999999
            </span>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <h2 className={styles.inputLabel}>
            Personalize o seu link com uma mensagem
          </h2>
          <div className={styles.inputWrapper}>
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="Digite uma mensagem personalizada (opcional)"
              rows={4}
              className={styles.textarea}
            />
          </div>
        </div>

        <LinkDisplay
          message={message}
          phoneNumber={getFormattedPhoneNumber()}
          isPhoneValid={isValidPhoneNumber()}
        />
      </div>
    </div>
  );
};

export default LinkGenerator;

