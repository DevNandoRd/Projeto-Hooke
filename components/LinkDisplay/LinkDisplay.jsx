import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  QrCode as QrCodeIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import QRCodeGenerator from "../QRCodeGenerator/QRCodeGenerator";
import NotificationProvider from '../NotificationProvider/NotificationProvider';
import { useNotification } from '../../hooks/useNotification';
import styles from './LinkDisplay.module.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

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
      <Box className={styles.container}>
        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LinkIcon />}
            onClick={handleShowLink}
            disabled={!isPhoneValid}
            className={styles.actionButton}
          >
            Gerar Link
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            startIcon={<QrCodeIcon />}
            onClick={handleShowQrCode}
            disabled={!isPhoneValid}
            className={styles.actionButton}
          >
            Gerar QR Code
          </Button>
        </div>
      </Box>

      {/* Link Modal */}
      <Modal
        open={openLinkModal}
        onClose={handleCloseModals}
        aria-labelledby="link-modal-title"
        aria-describedby="link-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="link-modal-title" variant="h6" component="h2" gutterBottom>
            Seu Link do WhatsApp
          </Typography>
          
          <Box className={styles.linkContainer}>
            <TextField
              id="link-modal-description"
              value={whatsappLink}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            
            <Tooltip title="Copiar link">
              <IconButton
                onClick={() => copyToClipboard(whatsappLink)}
                color="primary"
                className={styles.copyButton}
              >
                <CopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Box className={styles.modalActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open(whatsappLink, '_blank')}
              className={styles.testButton}
            >
              Testar Link
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleCloseModals}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        open={openQrCodeModal}
        onClose={handleCloseModals}
        aria-labelledby="qr-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="qr-modal-title" variant="h6" component="h2" gutterBottom>
            QR Code do WhatsApp
          </Typography>
          
          <QRCodeGenerator message={message} phoneNumber={phoneNumber} />
          
          <Box className={styles.modalActions}>
            <Button
              variant="outlined"
              onClick={handleCloseModals}
              fullWidth
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>

      <NotificationProvider 
        notification={notification} 
        onClose={hideNotification} 
      />
    </>
  );
};

export default LinkDisplay;

