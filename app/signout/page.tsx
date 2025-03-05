"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createUser } from "../../service/user.service";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Register() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters") // Add minimum length validation
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await createUser({
        email: data.email,
        password: data.password,
        name: data.email.split("@")[0],
      });

      if (!result) {
        alert("Registration failed");
        console.error("Registration failed");
      } else {
        console.log("Registration successful", result);
        router.push("/verify-email");
      }
    } catch (error) {
      alert("Registration failed");
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.page}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          <h2 className={styles.title}>Register</h2>

          {successMessage && <p className={styles.success}>{successMessage}</p>}
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <div className={styles.slot}>
            <label>Email:</label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className={styles.slot}>
            <label>Senha:</label>
            <input type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className={styles.slot}>
            <label>Confirmar senha:</label>
            <input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <div className={styles.buttonList}>
            <button type="submit" className={styles.button}>
              Register
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className={styles.button}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
