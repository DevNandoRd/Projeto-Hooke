import { Container } from "@mui/material";
import GeradorLink from "../GeradorLink/GeradorLink";
import styles from '../Main/Main.module.css'
import Image from "next/image";
export default function Main() {
    return (

        <>
            <div className={styles.container}>
                <h1>Crie seu link personalizado aqui</h1>
                <Container>
                    <main className={styles.main}>
                        <div className="flex">
                            <GeradorLink />
                        </div>
                        <div className={styles.boxList}>
                            <div className={styles.box}>
                                <Image 
                            alt="comunicação"
                            src='/assets/comunicacao.png'
                            width={52}
                            height={52}
                            className={styles.icon}
                                />
                                <div className={styles.titulo}>
                                <h2>Facilidade de Comunicação</h2>
                                <p>
                                Um link personalizado simplifica o processo de comunicação, permitindo que os usuários iniciem uma conversa no WhatsApp com apenas um clique.
                                </p>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <Image 
                            alt="Mensagem Personalizada"
                            src='/assets/personalizado.png'
                            width={52}
                            height={52}
                            className={styles.icon}
                                />
                                <div className={styles.titulo}>
                                <h2>Customização da Mensagem</h2>
                                <p>
                                Com um link personalizado, você pode pré-definir uma mensagem que será exibida na conversa do WhatsApp, facilitando o início da interação.
                                </p>
                                </div>
                            </div>
                            <div className={styles.box}>
                                <Image 
                            alt="Economia de tempo"
                            src='/assets/tempo.png'
                            width={52}
                            height={52}
                            className={styles.icon}
                                />
                                <div className={styles.titulo}>
                                <h2>Economia de Tempo</h2>
                                <p>
                                Link direto para o WhatsApp, você economiza tempo para os clientes, evitando procurar manualmente um número de telefone e iniciar uma conversa.
                                </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </Container>
            </div>
        </>

    )
}