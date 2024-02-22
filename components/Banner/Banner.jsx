import { Button, Container } from "@mui/material"
import styles from '../Banner/Banner.module.css'

export default function Banner() {
    const alerta = () => {
        alert('Está opção estará disponível em breve')
    }
    return (
        <>

            <div className={styles.container}>
                <Container maxWidth='lg'>
                <section className={styles.section}>
                    <div className={styles.titulo}>
                        <h1>Gere links personalizados
                            em segundos
                        </h1>
                        <h2>O Hook é a ferramenta perfeita para aumentar
                            suas vendas e engajamento.
                        </h2>
                        <Button variant="contained" color="primary">Seja Premium</Button>
                    </div>
                </section>
                </Container>
            </div>

        </>
    )
}