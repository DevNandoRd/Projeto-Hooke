import React from 'react';
import { Button, Container } from "@mui/material";
import NotificationProvider from '../NotificationProvider/NotificationProvider';
import { useNotification } from '../../hooks/useNotification';
import styles from './Banner.module.css';

/**
 * Refactored Banner component with improved structure
 * - Replaced alert() with elegant notification system
 * - Improved semantic HTML structure
 * - Better accessibility with proper heading hierarchy
 */
const Banner = () => {
  const { notification, showComingSoonMessage, hideNotification } = useNotification();

  return (
    <>
      <section className={styles.container}>
        <Container maxWidth='lg'>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <h1 className={styles.title}>
                Gere links personalizados em segundos
              </h1>
              <p className={styles.subtitle}>
                O Hook é a ferramenta perfeita para aumentar suas vendas e engajamento.
              </p>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                className={styles.ctaButton}
                onClick={showComingSoonMessage}
              >
                Seja Premium
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      <NotificationProvider 
        notification={notification} 
        onClose={hideNotification} 
      />
    </>
  );
};

export default Banner;

