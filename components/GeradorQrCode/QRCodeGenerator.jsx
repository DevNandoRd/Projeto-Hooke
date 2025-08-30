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


  const handleDownloadSVG = () => {
    const svgEl = document.getElementById('qrcode');
    if (!svgEl) return;
    try {
      // Ensure XML namespace for standalone SVG files
      if (!svgEl.getAttribute('xmlns')) {
        svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgEl);

      // Add XML declaration for better compatibility
      if (!source.startsWith('<?xml')) {
        source = '<?xml version="1.0" encoding="UTF-8"?>\n' + source;
      }

      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.svg';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to download SVG:', e);
    }
  };
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
        {qrcodeLink && <a href={qrcodeLink} download={`qrcode.png`}><button>Download PNG</button></a>}<button onClick={handleDownloadSVG}>Download SVG</button>
      </div>
    </>
  )
}
