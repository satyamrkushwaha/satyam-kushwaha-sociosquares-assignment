"use client";

import { useEffect, useLayoutEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "@/redux/userApi";



interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  
}

export default function Register() {
  const { register, handleSubmit } = useForm<FormData>();
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    try {
      const newUser = await registerUser(data).unwrap();
      localStorage.setItem('registered', 'true');
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  useLayoutEffect(() => {
    const registered = localStorage.getItem('registered');
    // If user is already registered, redirect them to the dashboard
    if (registered === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Please Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              placeholder="first name"
              {...register("name")}
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="lastName" className={styles.label}>
            username
            </label>
            <input
              placeholder="last name"
              {...register("username")}
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              placeholder="example@example.com"
              type="email"
              {...register("email")}
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              placeholder="********"
              type="password"
              {...register("password")}
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={styles.label}>
               Confirm Password
            </label>
            <input
              placeholder="********"
              type="password"
              {...register("confirmPassword")}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitButton}> Register </button>
        </form>
      </main>
      <footer className={styles.footer}>
        &copy; 2024 Satyam Kushwaha. All rights reserved.
      </footer>
    </div>
  );
}
