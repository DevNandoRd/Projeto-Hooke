import React, { useEffect, useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
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
    <div className={styles.container}>
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
      
      <div className={styles.downloadSection}>
        {isGenerating ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <span>Gerando imagem...</span>
          </div>
        ) : (
          downloadUrl && (
            <button
              onClick={handleDownload}
              className={styles.downloadButton}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
              </svg>
              Download PNG
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;

