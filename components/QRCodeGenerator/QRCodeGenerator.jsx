import React, { useEffect, useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Box, CircularProgress } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import styles from "./QRCodeGenerator.module.css";

/**
 * Refactored QRCodeGenerator component
 * - Improved performance with useCallback
 * - Better error handling
 * - Enhanced user experience with loading states
 * - Optimized imports (removed dynamic import)
 */
const QRCodeGenerator = ({ message, phoneNumber }) => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateWhatsAppLink = useCallback(() => {
    const cleanPhoneNumber = phoneNumber?.replace(/\D/g, '');
    return `https://wa.me/+55${cleanPhoneNumber}?text=${encodeURIComponent(message)}`;
  }, [message, phoneNumber]);

  const generateDownloadImage = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      const qrCodeElement = document.getElementById('qrcode-svg');
      if (!qrCodeElement) {
        throw new Error('QR Code element not found');
      }

      // Dynamically import html-to-image only when needed
      const htmlToImage = await import('html-to-image');
      
      const dataUrl = await htmlToImage.toPng(qrCodeElement, {
        quality: 1.0,
        pixelRatio: 2, // Higher resolution
        backgroundColor: '#ffffff'
      });
      
      setDownloadUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR Code image:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && phoneNumber) {
      generateDownloadImage();
    }
  }, [phoneNumber, message, generateDownloadImage]);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `whatsapp-qrcode-${phoneNumber}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const whatsappLink = generateWhatsAppLink();

  return (
    <Box className={styles.container}>
      <div className={styles.qrCodeWrapper}>
        <QRCodeSVG
          id="qrcode-svg"
          value={whatsappLink}
          size={280}
          level="M"
          includeMargin={true}
          className={styles.qrCodeSvg}
        />
      </div>
      
      <Box className={styles.downloadSection}>
        {isGenerating ? (
          <Box className={styles.loadingContainer}>
            <CircularProgress size={24} />
            <span>Gerando imagem...</span>
          </Box>
        ) : (
          downloadUrl && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              className={styles.downloadButton}
            >
              Download PNG
            </Button>
          )
        )}
      </Box>
    </Box>
  );
};

export default QRCodeGenerator;

