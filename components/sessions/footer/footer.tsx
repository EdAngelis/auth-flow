import React from "react";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          &copy; {new Date().getFullYear()} ed4ngelis@hotmail.com (11) 9
          4858-9951
        </p>
        <a href="https://wa.me/5511948589951" className={styles.whatsappLink}>
          Contact me on WhatsApp
        </a>
      </div>
    </footer>
  );
};

export default Footer;
