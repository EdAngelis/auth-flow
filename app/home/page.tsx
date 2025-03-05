"use client";
import React, { useRef } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Header from "../../components/sessions/header/header";
import style from "./page.module.css";
import { NextAuthUser } from "@/models";

const Page: NextPage = () => {
  const userEmail = useRef<string>("");
  const level = useRef<number>(0);
  const { data: session } = useSession();

  if (session) {
    const user: NextAuthUser = session.user as NextAuthUser;
    userEmail.current = (user?.email as string) || "";
    level.current = user?.level || 0;
  }

  return (
    <>
      <div className={style.container}>
        <Header />
      </div>
    </>
  );
};

export default Page;
