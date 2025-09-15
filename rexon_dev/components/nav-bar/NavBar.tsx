'use client';

import styles from "./navbar.module.scss";
import Image from "next/image";
import {motion} from "motion/react"
import Link from "next/link";
import BlackButton from "../ui/BlackButton";
import { useState, useEffect } from 'react';

const barVariant = {
    visible: { opacity: 1, y:0 },
    hidden: { opacity: 0, y: -100}
}

export default function NavBar () {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return(
        <motion.div className={styles.nav} variants={barVariant} animate={isVisible ? "visible" : "hidden"} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className={styles.nav__container}>
                <div className={styles.nav__links}>
                        <ul>
                            <Link href={'/about-us'}><li>About us</li></Link>
                            <Link href={'/projects'}><li>Projects</li></Link>
                            <Link href={'/pricing'}><li>Pricing</li></Link>
                            
                        </ul>
                </div>
                <Link href={'/'}>
                    <motion.div className={styles.nav__logo} layoutId="logo">
                        <Image src="/logo.svg" alt="rexon logo" className={styles.logo}
                            width={80}
                            height={50}
                        />
                        <motion.span
                            className={styles.nav__category}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.8, delay: 4 }}
                        >
                            <h4>Dev.</h4>
                        </motion.span>
                    </motion.div>
                </Link>
                <div className={styles.nav__button}>
                    <BlackButton
                        text="Start your dream" 
                        onClick={() => window.location.href = "mailto:"}
                    />
                </div>
            </div>
        </motion.div>
    )
}
