"use client";
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { verifyEmail } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import styles from "./page.module.css";
import ErrorToast from "@/components/elements/toast/error";
import Loader from "@/components/elements/loader/loader";
import { setLocale, object, string } from "yup";
import Link from "next/link";
import Input from "@/components/elements/input/input";
import Form from "@/components/elements/form/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SuccessToast from "@/components/elements/toast/success";

export default function VerifyEmail() {  

  const [error, setError] = React.useState<string>('');
  const [success, setSuccess] = React.useState<string>('');
  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const validationSchema = object().shape({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        email: "",
      },
    });

  const onSubmit = async () => {

    setisLoading(true);
    setError("");    
    setSuccess("E-mail enviado com sucesso!");

    setisLoading(false);

  };

  return (
    <main className={styles.main}>
      <div className={styles.page}>
        
        <Form onSubmit={handleSubmit(onSubmit)}>

            <h1>Esqueceu a senha?</h1>

            <div className={styles.instructions}>
                <p>Insira o seu e-mail cadastrado abaixo.</p>
                <p>Você receberá um link para redefinir a senha.</p>
            </div>

            <div className={styles.slot}>
                <Input register={register} name={"email"} type={"email"} />
                {errors.email && <ErrorToast message={errors.email?.message} />}
                {error && <ErrorToast message={error} />}
                {success && <SuccessToast message={success} />}
                {isLoading && <Loader />}
            </div>
           
            
            <Button type="submit" size="full">Enviar e-mail</Button>            

        </Form>        
        
        
      </div>
    </main>
  );
}
