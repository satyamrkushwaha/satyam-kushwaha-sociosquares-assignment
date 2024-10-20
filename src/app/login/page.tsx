"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// Interface for form inputs
interface IFormInput {
    username: string;
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<IFormInput>();
    
    // Get registered users from Redux store
    const registeredUsers = useSelector((state: RootState) => state.user.users);
    
    // Handle form submission
    const onSubmit: SubmitHandler<IFormInput> = useCallback((data) => {
        // Fallback to sessionStorage if no Redux users available
        const registeredUsersDetails = JSON.parse(sessionStorage.getItem('registeredUsers') || '[]');
        const authUsers = registeredUsers?.length ? registeredUsers : registeredUsersDetails;

        // Check if the user exists in the registered users
        const userExists = authUsers.some((user: IFormInput) =>
            user.username === data.username &&
            user.email === data.email &&
            user.password === data.password
        );

        if (userExists) {
            // Set sessionStorage and redirect to the dashboard
            sessionStorage.setItem('registered', 'true');
            router.push('/dashboard');
        } else {
            alert("Invalid credentials. Please try again.");
        }
    }, [registeredUsers, router]);

    // Redirect to registration page
    const handleRegister = useCallback(() => {
        router.push('/');
    }, [router]);

    // Auto clear form errors after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            clearErrors();
        }, 3000);
        return () => clearTimeout(timer);
    }, [errors, clearErrors]);

    return (
        <div className='page'>
            <main className='main'>
                <h1 className='title'>Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                    <div>
                        <label htmlFor="username" className='label'>
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register("username", { required: 'Username is required' })}
                            className='input'
                        />
                        <p className='error'>{errors?.username?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="email" className='label'>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="example@example.com"
                            {...register("email", { required: 'Email is required' })}
                            className='input'
                        />
                        <p className='error'>{errors?.email?.message}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className='label'>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            {...register("password", { required: 'Password is required' })}
                            className='input'
                        />
                        <p className='error'>{errors?.password?.message}</p>
                    </div>
                    <div className='buttonContainer'>
                        <button type="submit" className='submitButton'> Login </button>
                        <span className='register' onClick={handleRegister}>
                            Register New Users <ArrowForwardIcon />
                        </span>
                    </div>
                </form>
            </main>
        </div>
    );
}
