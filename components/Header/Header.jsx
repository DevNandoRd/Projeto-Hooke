import React, { useState } from "react";
import Image from "next/image";
import { Button, Container } from "@mui/material";
import styles from '../Header/Header.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function Header() {
    const [toggle, setToggle] = useState(false)

    const openToggle = () => {
        setToggle(!toggle)
    }

    const alerta = () => {
        alert('Está opção estará disponível em breve')
    }

    return (

        <>
            <div className={styles.container}>
                <Container maxWidth='lg'>
                <header className={styles.header}>
                    <div >
                        <Image
                            alt="Hook"
                            src='/assets/hook-logo.png'
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className={styles.menu}>
                        <nav>
                            <ul className="flex gap-4" onClick={alerta}>
                                <li >Home</li>
                                <li >Sobre</li>
                                <li >Serviços</li>
                                <li >Suporte</li>
                            </ul>
                        </nav>
                        <Button variant="contained">Seja Premium</Button>
                    </div>

                    <div className={styles.toggle} onClick={openToggle}>{toggle ? <MenuOpenIcon/> : <MenuIcon/>}</div>

                    <div className={toggle ? styles.menuBarOpen : styles.menuBarClose}>
                        <nav>
                            <ul className="flex gap-4" onClick={alerta}>
                                <li >Home</li>
                                <li >Sobre</li>
                                <li >Serviços</li>
                                <li >Suporte</li>
                            </ul>
                        </nav>
                    </div>
                </header>
                </Container>
            </div>
        </>

    )
}