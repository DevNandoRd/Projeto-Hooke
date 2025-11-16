import React, { useEffect } from 'react';
import styles from './NotificationProvider.module.css';

/**
 * Notification component to replace alert() calls
 * Provides a more elegant user experience
 */
const NotificationProvider = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification.open) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.open, onClose]);

  if (!notification.open) return null;

  const severityClass = notification.severity || 'info';

  return (
    <div className={`${styles.snackbar} ${styles[severityClass]}`}>
      <div className={styles.alert}>
        <span className={styles.message}>{notification.message}</span>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationProvider;

