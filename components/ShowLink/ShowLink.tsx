import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../ShowLink/ShowLink.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowLink({ texto, numero, pegarTexto, pegarEspaco }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (numero.length == 0) {
      alert('Digite o seu número')
      setOpen(false)
    } else {
      setOpen(true)
    }
  };
  const handleClose = () => setOpen(false);

  const chamarFuncoes = () => {
    handleOpen()
    pegarTexto()
    pegarEspaco()
  }

  return (
    <div className={styles.modal}>
      <Button onClick={chamarFuncoes}>Gerar Link</Button>
      <Modal
        open={open}
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
              <h1>https://wa.me/+55{numero}?text={texto}</h1>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
