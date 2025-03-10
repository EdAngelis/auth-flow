"use client";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";

export default function GoogleSignIn() {
  return (
    <>
      <button className={styles.authButton} onClick={() => signIn("google")}>
        Sign in With Google
      </button>
    </>
  );
}
