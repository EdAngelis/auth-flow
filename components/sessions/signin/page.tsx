"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleSignIn from "../../elements/google-signin-button/page";
import * as Yup from "yup";
import { signIn as credencialSignIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const SignIn = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
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
    },
  });

  const onSubmit = async (data: any) => {
    console.log("data", data);
    try {
      const result = await credencialSignIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error("Sign In failed", result.error);
        alert(`Credenciais Invalidas ${result.error}`);
      } else {
        console.log("Sign In successful");
      }
    } catch (error) {
      console.error("Sign In failed", error);
    }
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <h2 className={styles.title}>Conectar</h2>
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
        <div className={styles.buttonList}>
          <button className={styles.button} type="submit">
            Conectar
          </button>
          <GoogleSignIn />
          <button
            className={styles.button}
            onClick={() => router.push("/signout")}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
