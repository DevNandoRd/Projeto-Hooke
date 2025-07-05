'use client'
import React, { useState } from 'react';
import { TextField, Box } from "@mui/material";
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
    <Box className={styles.container}>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <h2 className={styles.inputLabel}>
            Digite o seu número com DDD
          </h2>
          <TextField
            label="Digite o número aqui"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            inputProps={{ 
              maxLength: 13,
              'aria-describedby': 'phone-helper-text'
            }}
            helperText="Exemplo: 11999999999"
            id="phone-helper-text"
            required
            fullWidth
            variant="outlined"
            error={phoneNumber.length > 0 && !isValidPhoneNumber()}
          />
        </div>

        <div className={styles.inputGroup}>
          <h2 className={styles.inputLabel}>
            Personalize o seu link com uma mensagem
          </h2>
          <TextField
            label="Sua mensagem aqui"
            multiline
            rows={4}
            value={message}
            onChange={handleMessageChange}
            placeholder="Digite uma mensagem personalizada (opcional)"
            fullWidth
            variant="outlined"
          />
        </div>

        <LinkDisplay
          message={message}
          phoneNumber={getFormattedPhoneNumber()}
          isPhoneValid={isValidPhoneNumber()}
        />
      </div>
    </Box>
  );
};

export default LinkGenerator;

