import * as React from 'react';
import styles from '../ShowLink/ShowLink.module.css';
import QRCodeGenerator from "../GeradorQrCode/QRCodeGenerator";

export default function ShowLink({ texto, numero }) {
  const [openLinkModal, setOpenLinkModal] = React.useState(false);
  const [openQrCodeModal, setOpenQrCodeModal] = React.useState(false);

  const handleOpenLink = () => {
    if (!numero || numero.length === 0) {
      alert('Digite o seu número');
    } else {
      setOpenLinkModal(true);
    }
  };

  const handleOpenQrCode = () => {
    if (!numero || numero.length === 0) {
      alert('Digite o seu número');
    } else {
      setOpenQrCodeModal(true);
    }
  };

  const handleClose = () => {
    setOpenLinkModal(false);
    setOpenQrCodeModal(false);
  };

  const numeroFormatado = numero?.replace(/\D/g, '');
  const link = `https://wa.me/55${numeroFormatado}?text=${encodeURIComponent(texto)}`;

  return (
    <>
      <div className={styles.modalLink}>
        <button className={styles.button} onClick={handleOpenLink}>Gerar Link</button>
        {openLinkModal && (
          <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.box}>
                <h2>O seu link está pronto!</h2>
                <div className={styles.linkGerado}>
                  <h1>{link}</h1>
                  <button 
                    className={styles.btnCopy}
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      alert("Link copiado!");
                    }}
                  >
                    Copiar Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.modalQrCode}>
        <button className={styles.button} onClick={handleOpenQrCode}>Gerar Qr Code (novo)</button>
        {openQrCodeModal && (
          <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.box}>
                <h2>O seu Qr Code está pronto!</h2>
                <div className={styles.QrCodeGerado}>
                  <QRCodeGenerator 
                    texto={texto}
                    numero={numero}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
