import { useState, useCallback } from 'react';

/**
 * Custom hook for managing notifications
 * Replaces the alert() function with a more elegant notification system
 */
export const useNotification = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info' // 'success', 'error', 'warning', 'info'
  });

  const showNotification = useCallback((message, severity = 'info') => {
    setNotification({
      open: true,
      message,
      severity
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  }, []);

  const showComingSoonMessage = useCallback(() => {
    showNotification('Esta opção estará disponível em breve', 'info');
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showComingSoonMessage
  };
};

