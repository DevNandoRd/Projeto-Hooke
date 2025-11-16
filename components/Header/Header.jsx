import React, { useState } from "react";
import Image from "next/image";
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
        <div className={styles.containerWrapper}>
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
              <button 
                className={styles.premiumButton}
                onClick={showComingSoonMessage}
              >
                Seja Premium
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className={styles.menuToggle} 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="currentColor"/>
                </svg>
              )}
            </button>

            {/* Mobile Navigation */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClose}`}>
              <Navigation onMenuClick={handleMenuItemClick} />
              <button 
                className={styles.premiumButton}
                onClick={showComingSoonMessage}
              >
                Seja Premium
              </button>
            </div>
          </header>
        </div>
      </div>
      
      <NotificationProvider 
        notification={notification} 
        onClose={hideNotification} 
      />
    </>
  );
};

export default Header;

