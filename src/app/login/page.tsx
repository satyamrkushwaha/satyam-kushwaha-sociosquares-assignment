"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from "./page.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
interface IFormInput {
    username: string;
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } , clearErrors } = useForm<IFormInput>();
    const registeredUsers = useSelector((state: RootState) => state.user.users);
 

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        // Get registered users from sessionStorage
        const registeredUsersDetails = JSON.parse(sessionStorage.getItem('registeredUsers') || '[]');
    
        // Check if 'registeredUsers' exists, otherwise fallback to 'registeredUsersDetails'
        const authUser = (registeredUsers && registeredUsers.length > 0) ? registeredUsers : registeredUsersDetails;
        
        // Check if the user exists in the registered users
        const userExists = authUser.some((user: IFormInput) =>
            user.username === data.username &&
            user.email === data.email &&
            user.password === data.password
        );

        if (userExists) {
            // Redirect to the Dashboard if user is found
            sessionStorage.setItem('registered', 'true');
            router.push('/dashboard');
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };
    

    const handleRegister = () => {
        // sessionStorage.clear();
        router.push('/');
    }
    useEffect(() => {
        const timer = setTimeout(() => {
          clearErrors();
        }, 3000);
        return () => clearTimeout(timer);
    }, [errors]);

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className={styles.title}>Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div>
                        <label htmlFor="username" className={styles.label}>
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register("username", { required: 'Username is required' })}
                            className={styles.input}
                        />
                        <p className={styles.error}>{errors?.username?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            placeholder="example@example.com"
                            type="email"
                            {...register("email", { required: 'Email is required' })}
                            className={styles.input}
                        />
                         <p className={styles.error}>{errors?.email?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            placeholder="********"
                            type="password"
                            {...register("password", { required: 'Password is required' })}
                            className={styles.input}
                        />
                         <p className={styles.error}>{errors?.password?.message}</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.submitButton}> Login </button>
                        <span className={styles.register} onClick={handleRegister}>Register New Users <ArrowForwardIcon /></span>
                    </div>
                </form>
            </main>
        </div>
    );
}
