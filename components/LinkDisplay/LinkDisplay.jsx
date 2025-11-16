import React, { useState } from 'react';
import QRCodeGenerator from "../QRCodeGenerator/QRCodeGenerator";
import NotificationProvider from '../NotificationProvider/NotificationProvider';
import { useNotification } from '../../hooks/useNotification';
import styles from './LinkDisplay.module.css';

/**
 * Refactored LinkDisplay component (formerly ShowLink)
 * - Improved naming convention (English)
 * - Better user experience with copy functionality
 * - Enhanced validation and error handling
 * - More accessible modal implementation
 */
const LinkDisplay = ({ message, phoneNumber, isPhoneValid }) => {
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const { notification, showNotification, hideNotification } = useNotification();

  const generateWhatsAppLink = () => {
    const cleanPhoneNumber = phoneNumber?.replace(/\D/g, '');
    return `https://wa.me/55${cleanPhoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleShowLink = () => {
    if (!isPhoneValid) {
      showNotification('Por favor, digite um número válido', 'error');
      return;
    }
    setOpenLinkModal(true);
  };

  const handleShowQrCode = () => {
    if (!isPhoneValid) {
      showNotification('Por favor, digite um número válido', 'error');
      return;
    }
    setOpenQrCodeModal(true);
  };

  const handleCloseModals = () => {
    setOpenLinkModal(false);
    setOpenQrCodeModal(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Link copiado para a área de transferência!', 'success');
    } catch (err) {
      showNotification('Erro ao copiar o link', 'error');
    }
  };

  const whatsappLink = generateWhatsAppLink();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <button
            onClick={handleShowLink}
            disabled={!isPhoneValid}
            className={styles.actionButton}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
            </svg>
            Gerar Link
          </button>
          
          <button
            onClick={handleShowQrCode}
            disabled={!isPhoneValid}
            className={`${styles.actionButton} ${styles.outlinedButton}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM16 13h2v2h-2zM18 15h2v2h-2zM16 17h2v2h-2zM18 19h2v2h-2zM20 13h2v2h-2zM20 17h2v2h-2z" fill="currentColor"/>
            </svg>
            Gerar QR Code
          </button>
        </div>
      </div>

      {/* Link Modal */}
      {openLinkModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModals}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Seu Link do WhatsApp</h2>
            
            <div className={styles.linkContainer}>
              <textarea
                value={whatsappLink}
                readOnly
                rows={3}
                className={styles.linkInput}
              />
              
              <button
                onClick={() => copyToClipboard(whatsappLink)}
                className={styles.copyButton}
                title="Copiar link"
                aria-label="Copiar link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.modalActions}>
              <button
                onClick={() => window.open(whatsappLink, '_blank')}
                className={styles.testButton}
              >
                Testar Link
              </button>
              
              <button
                onClick={handleCloseModals}
                className={styles.closeButton}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {openQrCodeModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModals}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>QR Code do WhatsApp</h2>
            
            <QRCodeGenerator message={message} phoneNumber={phoneNumber} />
            
            <div className={styles.modalActions}>
              <button
                onClick={handleCloseModals}
                className={styles.closeButton}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <NotificationProvider 
        notification={notification} 
        onClose={hideNotification} 
      />
    </>
  );
};

export default LinkDisplay;
