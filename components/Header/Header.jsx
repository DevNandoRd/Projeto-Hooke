import React, { useState } from "react";
import Image from "next/image";
import { Button, Container } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Navigation from '../Navigation/Navigation';
import NotificationProvider from '../NotificationProvider/NotificationProvider';
import { useNotification } from '../../hooks/useNotification';
import styles from './Header.module.css';

/**
 * Refactored Header component with improved structure and functionality
 * - Separated navigation logic into its own component
 * - Replaced alert() with elegant notification system
 * - Improved accessibility and mobile responsiveness
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { notification, showComingSoonMessage, hideNotification } = useNotification();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    showComingSoonMessage();
    setIsMenuOpen(false); // Close mobile menu after click
  };

  return (
    <>
      <div className={styles.container}>
        <Container maxWidth='lg'>
          <header className={styles.header}>
            <div className={styles.logo}>
              <Image
                alt="Hook Logo"
                src='/assets/hook-logo.png'
                width={50}
                height={50}
                priority
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className={styles.desktopMenu}>
              <Navigation onMenuClick={handleMenuItemClick} />
              <Button 
                variant="contained" 
                color="primary"
                className={styles.premiumButton}
                onClick={showComingSoonMessage}
              >
                Seja Premium
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className={styles.menuToggle} 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </button>

            {/* Mobile Navigation */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClose}`}>
              <Navigation onMenuClick={handleMenuItemClick} />
              <Button 
                variant="contained" 
                color="primary"
                className={styles.premiumButton}
                onClick={showComingSoonMessage}
              >
                Seja Premium
              </Button>
            </div>
          </header>
        </Container>
      </div>
      
      <NotificationProvider 
        notification={notification} 
        onClose={hideNotification} 
      />
    </>
  );
};

export default Header;

