"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { signIn as credencialSignIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Input from "@/components/elements/input/input";
import Label from "@/components/elements/label/label";
import Button from "@/components/elements/button/button";
import Link from "next/link";
import ErrorToast from "@/components/elements/toast/error";
import Loader  from "@/components/elements/loader/loader";
import Form from "@/components/elements/form/form";
import SuccessToast from "@/components/elements/toast/success";

const ResetPassword = () => {

  const router = useRouter();
  const [error, setError] = React.useState<string>('');
  const [success, setSuccess] = React.useState<string>('');
  const [isLoading, setisLoading] = React.useState<boolean>(false);

  const validationSchema = Yup.object().shape({   
    password: Yup.string().required("Password is required").min(6, 'Password has to be at least 6 characters long.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Confirm Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("data", data);

    setisLoading(true);

    setSuccess('Senha redefinida com sucesso!');
    setError('');

    setisLoading(false);

  };

  return (
    <>
    <main>
        <div className={styles.page}>      
        <Form onSubmit={handleSubmit(onSubmit)} >
            <h2 className={styles.title}>Redefinir senha</h2>

            <div className={styles.slot + ' ' + styles.info}>
                <p>A senha deve conter:</p>
                <ul>
                    <li>Pelo menos 6 caracteres</li>
                </ul>
            </div>

            <div className={styles.slot}>
                <Label text="Senha" />
                <Input register={register} name="password" type="password" />
                {errors.password && <ErrorToast message={errors.password?.message} />}
            </div>

            <div className={styles.slot}>
                <Label text="Confirme a senha" />
                <Input register={register} name="confirmPassword" type="password" />
                {errors.confirmPassword && <ErrorToast message={errors.confirmPassword?.message} />}
            </div>            

            <div style={{textAlign: 'center'}} className={styles.slot}>
                {error && <ErrorToast message={error} />}
                {success && <SuccessToast message={success} />}
                {isLoading && <Loader />}
            </div>

            <div className={styles.buttonList}>
            <Button type="submit" size="full">
                Redefinir
            </Button>          
            </div>            
          
        </Form>
        </div>
    </main>
    </>
  );
};

export default ResetPassword;
