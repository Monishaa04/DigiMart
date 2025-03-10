// src/components/Header.js
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>DigiMart</h1>
                <nav>
                    <ul className={styles.navList}>
                        <li><a href="/" className={styles.navItem}>Home</a></li>
                        <li><a href="/products" className={styles.navItem}>Products</a></li>
                        <li><a href="/cart" className={styles.navItem}>Cart</a></li>
                        <li><a href="/contact" className={styles.navItem}>Contact Us</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
