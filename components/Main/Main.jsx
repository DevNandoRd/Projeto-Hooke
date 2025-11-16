import React from 'react';
import Image from "next/image";
import LinkGenerator from "../LinkGenerator/LinkGenerator";
import styles from './Main.module.css';

/**
 * Refactored Main component with improved structure
 * - Better semantic HTML structure
 * - Improved responsive design with Grid system
 * - Enhanced accessibility with proper alt texts
 * - Cleaner component organization
 */
const Main = () => {
  const features = [
    {
      icon: '/assets/comunicacao.png',
      title: 'Facilidade',
      description: 'Um link personalizado simplifica o processo de comunicação, permitindo que os usuários iniciem uma conversa no WhatsApp com apenas um clique.'
    },
    {
      icon: '/assets/personalizado.png',
      title: 'Customização',
      description: 'Com um link personalizado, você pode pré-definir uma mensagem que será exibida na conversa do WhatsApp, facilitando o início da interação.'
    },
    {
      icon: '/assets/tempo.png',
      title: 'Economia de Tempo',
      description: 'Elimine a necessidade de digitar números e mensagens repetidamente. Com um clique, seus clientes podem entrar em contato diretamente.'
    }
  ];

  return (
    <main className={styles.container}>
      <div className={styles.containerWrapper}>
        <section className={styles.generatorSection}>
          <h1 className={styles.mainTitle}>
            Crie seu link personalizado aqui
          </h1>
          
          <div className={styles.generatorWrapper}>
            <LinkGenerator />
          </div>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>
            Por que usar links personalizados?
          </h2>
          
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <article key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Image 
                    alt={feature.title}
                    src={feature.icon}
                    width={52}
                    height={52}
                  />
                </div>
                
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>
                    {feature.title}
                  </h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;

