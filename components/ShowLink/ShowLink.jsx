import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../ShowLink/ShowLink.module.css'
import QRCodeGenerator from "../GeradorQrCode/QRCodeGenerator"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowLink({ texto, numero }) {
  const [openLinkModal, setOpenLinkModal] = React.useState(false);
  const [openQrCodeModal, setOpenQrCodeModal] = React.useState(false);

  const handleOpenLink = () => {
    if (numero.length === 0) {
      alert('Digite o seu número')
    } else {
      setOpenLinkModal(true)
    }
  };

  const handleOpenQrCode = () => {
    if (numero.length === 0) {
      alert('Digite o seu número')
    } else {
      setOpenQrCodeModal(true)
    }
  };

  const handleClose = () => {
    setOpenLinkModal(false);
    setOpenQrCodeModal(false);
  };

  return (
    <>
      <div className={styles.modalLink}>
        <Button onClick={handleOpenLink}>Gerar Link</Button>
        <Modal
          open={openLinkModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.box}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h2>O seu link está pronto!</h2>
              </Typography>
              <div className={styles.linkGerado}>
                <h1>https://wa.me/+55{numero}?text={encodeURIComponent(texto)}</h1>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      <div className={styles.modalQrCode}>
        <Button onClick={handleOpenQrCode}>Gerar Qr Code (novo)</Button>
        <Modal
          open={openQrCodeModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.box}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h2>O seu Qr Code está pronto!</h2>
              </Typography>
              <div className={styles.QrCodeGerado}>
                <QRCodeGenerator 
                texto={texto}
                numero={numero}
                />
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
