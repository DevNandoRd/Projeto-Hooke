import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import styles from "../GeradorQrCode/QRCode.module.css";

export default function QRCodeGenerator({ texto, numero }) {
  const [qrcodeLink, setQrcodeLink] = useState('');

  const handleGenerate = () => {
    const qrCodeComponent = document.getElementById('qrcode');
    if (qrCodeComponent) {
      import('html-to-image').then(htmlToImage => {
        htmlToImage.toPng(qrCodeComponent)
          .then(function (dataUrl) {
            setQrcodeLink(dataUrl);
          })
          .catch(function (error) {
            console.error('Erro ao gerar o QR Code:', error);
          });
      });
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleGenerate();
    }
  }, []);

  return (
    <>
      <div className={styles.QrCode}>
        <QRCode
          id="qrcode"
          value={`https://wa.me/+55${numero}?text=${encodeURIComponent(texto)}`}
          renderAs='svg'
          size={500}
          includeMargin={true}
          className={styles.imgQrCode}
        />
        {qrcodeLink && <a href={qrcodeLink} download={`qrcode.png`}><button>Download PNG</button></a>}
      </div>
    </>
  )
}
