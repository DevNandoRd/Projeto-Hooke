import { Container } from '@mui/material'
import styles from '../Footer/Footer.module.css'
import Image from 'next/image'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer () {
    return (
        <>
        <div className={styles.container}>
            <Container maxWidth='lg'>
            <footer className={styles.footer}>
            <div className={styles.logo}>
                <Image
                alt='Hook'
                src='/assets/hook-logo.png'
                width={80}
                height={80}
                />
            </div>
            <div>
                <h3>Menu</h3>
                <ul>
                    <li>Home</li>
                    <li>Sobre</li>
                    <li>Serviços</li>
                    <li>Suporte</li>
                </ul>
            </div>
            <div>
                <h3>Atendimento</h3>
                <ul>
                    <li>Ajuda</li>
                    <li>Perguntas frequentes</li>
                    <li></li>
                </ul>
            </div>
            <div>
                <h3>Contatos</h3>
                <div className={styles.redesSociais}>
                <WhatsAppIcon className={styles.icons}/>
                <InstagramIcon className={styles.icons}/>
                </div>
            </div>
            </footer>
            </Container>
        </div>
        <div className={styles.copy}>
            <h5>Copyright © 2024 - Todos os direitos reservados</h5>
        </div>
        </>
    )
}