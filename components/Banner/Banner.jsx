import React from 'react';
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
        <div className={styles.gradientOverlay}></div>
        <div className={styles.animatedBackground}></div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✨</span>
                <span>Ferramenta Premium</span>
              </div>
              <h1 className={styles.title}>
                <span className={styles.titleHighlight}>Gere links</span> personalizados
                <br />
                <span className={styles.titleGradient}>em segundos</span>
              </h1>
              <p className={styles.subtitle}>
                O Hook é a ferramenta perfeita para aumentar suas vendas e engajamento.
                Transforme conversas em resultados com links personalizados do WhatsApp.
              </p>
              <div className={styles.ctaContainer}>
                <button 
                  className={styles.ctaButton}
                  onClick={showComingSoonMessage}
                >
                  <span>Seja Premium</span>
                  <svg className={styles.buttonIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>10k+</span>
                    <span className={styles.statLabel}>Links gerados</span>
                  </div>
                  <div className={styles.statDivider}></div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>98%</span>
                    <span className={styles.statLabel}>Satisfação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.floatingElements}>
          <div className={styles.floatingCircle}></div>
          <div className={styles.floatingCircle}></div>
          <div className={styles.floatingCircle}></div>
        </div>
      </section>
      
      <NotificationProvider 
        notification={notification} 
        onClose={hideNotification} 
      />
    </>
  );
};

export default Banner;

