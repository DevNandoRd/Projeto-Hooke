import { useEffect, useState, useCallback } from 'react';
import QRCode from 'qrcode.react';
import styles from "../GeradorQrCode/QRCode.module.css";

export default function QRCodeGenerator({ texto, numero }) {
  const [qrcodePngLink, setQrcodePngLink] = useState('');

  const generateWhatsAppLink = useCallback(() => {
    const cleanPhoneNumber = numero?.replace(/\D/g, '');
    return `https://wa.me/+55${cleanPhoneNumber}?text=${encodeURIComponent(texto)}`;
  }, [texto, numero]);

  const handleGeneratePng = useCallback(() => {
    const qrCodeComponent = document.getElementById('qrcode-svg');
    if (qrCodeComponent) {
      import('html-to-image').then(htmlToImage => {
        htmlToImage.toPng(qrCodeComponent)
          .then(function (dataUrl) {
            setQrcodePngLink(dataUrl);
          })
          .catch(function (error) {
            console.error('Erro ao gerar o QR Code PNG:', error);
          });
      });
    }
  }, []);

  const handleDownloadSvg = useCallback(() => {
    const svgElement = document.getElementById('qrcode-svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `qrcode-${numero}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  }, [numero]);

  useEffect(() => {
    if (typeof window !== 'undefined' && numero) {
      handleGeneratePng();
    }
  }, [numero, texto, handleGeneratePng]);

  const whatsappLink = generateWhatsAppLink();

  return (
    <>
      <div className={styles.QrCode}>
        <QRCode
          id="qrcode-svg"
          value={whatsappLink}
          renderAs='svg'
          size={500}
          includeMargin={true}
          className={styles.imgQrCode}
        />
        <div className={styles.downloadButtons}>
          {qrcodePngLink && <a href={qrcodePngLink} download={`qrcode-${numero}.png`}><button>Download PNG</button></a>}
          <button onClick={handleDownloadSvg}>Download SVG</button>
        </div>
      </div>
    </>
  );
}


