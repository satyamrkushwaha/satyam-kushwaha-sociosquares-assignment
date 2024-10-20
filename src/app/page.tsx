"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "@/redux/userApi";
import { useDispatch } from 'react-redux';
import { addUser } from '@/redux/userSlice';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  const dispatch = useDispatch();
  const onSubmit = async (data: FormData) => {
    try {
      const newUser = await registerUser(data).unwrap();
      alert('Registration successful:');
      sessionStorage.setItem('registered', 'true');
      dispatch(addUser(newUser));
      const existingUsers = JSON.parse(sessionStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = [...existingUsers, newUser];
      sessionStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Please Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <label htmlFor="firstName" className={styles.label}>
              Full Name
            </label>
            <input
              placeholder="first name"
              {...register("name")}
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="lastName" className={styles.label}>
              Username
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
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}> Register </button>
            <span className={styles.register} onClick={() => router.push('/login')}>Login <ArrowForwardIcon /></span>
          </div>
        </form>
      </main>
      <footer className={styles.footer}>
        &copy; 2024 Satyam Kushwaha. All rights reserved.
      </footer>
    </div>
  );
}
