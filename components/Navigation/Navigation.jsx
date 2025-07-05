import React from 'react';
import styles from './Navigation.module.css';

/**
 * Navigation component extracted from Header
 * Handles menu items and navigation logic
 */
const Navigation = ({ onMenuClick, className = '' }) => {
  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Serviços', href: '#services' },
    { label: 'Suporte', href: '#support' }
  ];

  return (
    <nav className={className}>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            <a 
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onMenuClick();
              }}
              className={styles.menuLink}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

