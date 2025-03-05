"use client";
import React, { useState } from "react";
import { verifyEmail } from "@/service/auth.service";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = async () => {
    if (code.length === 6) {
      try {
        const response = await verifyEmail(code);
        console.log(response);
        if (
          response.message &&
          response.message === "Email validated successfully"
        ) {
          alert("Email verified!");
          router.push("/");
        } else {
          alert("Failed to verify email.");
        }
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    } else {
      alert("Please enter a 6-digit code.");
    }
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      <input
        type="text"
        value={code}
        onChange={handleChange}
        maxLength={6}
        placeholder="Enter 6-digit code"
      />
      <button onClick={handleSubmit}>Verify</button>
    </div>
  );
}
