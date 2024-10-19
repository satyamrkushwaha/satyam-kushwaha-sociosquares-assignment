"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetPokemonByNameQuery } from "@/redux/api";



interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  
}

export default function Register() {



  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

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
              {...register("firstName")}
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              placeholder="last name"
              {...register("lastName")}
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
        &copy; 2024 Your Company. All rights reserved.
      </footer>
    </div>
  );
}
