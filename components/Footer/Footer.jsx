import React from 'react';
import { Container, Grid, Box, IconButton } from '@mui/material';
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './Footer.module.css';

/**
 * Refactored Footer component with improved structure
 * - Better semantic HTML structure
 * - Improved responsive design with Grid system
 * - Enhanced accessibility
 * - Cleaner organization of footer sections
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Menu',
      items: [
        { label: 'Home', href: '#home' },
        { label: 'Sobre', href: '#about' },
        { label: 'Serviços', href: '#services' },
        { label: 'Suporte', href: '#support' }
      ]
    },
    {
      title: 'Atendimento',
      items: [
        { label: 'Ajuda', href: '#help' },
        { label: 'Perguntas frequentes', href: '#faq' },
        { label: 'Documentação', href: '#docs' }
      ]
    }
  ];

  const socialLinks = [
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      href: '#whatsapp',
      color: '#25D366'
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      href: '#instagram',
      color: '#E4405F'
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.mainFooter}>
        <Container maxWidth='lg'>
          <Grid container spacing={4} className={styles.footerContent}>
            {/* Logo Section */}
            <Grid item xs={12} md={3}>
              <div className={styles.logoSection}>
                <Image
                  alt='Hook Logo'
                  src='/assets/hook-logo.png'
                  width={80}
                  height={80}
                  className={styles.logo}
                />
                <p className={styles.logoDescription}>
                  A ferramenta perfeita para gerar links personalizados do WhatsApp.
                </p>
              </div>
            </Grid>

            {/* Menu Sections */}
            {footerSections.map((section, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <div className={styles.footerSection}>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                  <ul className={styles.linkList}>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a 
                          href={item.href} 
                          className={styles.footerLink}
                          onClick={(e) => e.preventDefault()}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Grid>
            ))}

            {/* Contact Section */}
            <Grid item xs={12} md={3}>
              <div className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>Contatos</h3>
                <Box className={styles.socialLinks}>
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <IconButton
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className={styles.socialButton}
                        sx={{ 
                          color: social.color,
                          '&:hover': { 
                            backgroundColor: `${social.color}20`,
                            transform: 'scale(1.1)'
                          }
                        }}
                        onClick={(e) => e.preventDefault()}
                      >
                        <IconComponent />
                      </IconButton>
                    );
                  })}
                </Box>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyright}>
        <Container maxWidth='lg'>
          <p className={styles.copyrightText}>
            Copyright © {currentYear} - Todos os direitos reservados
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

