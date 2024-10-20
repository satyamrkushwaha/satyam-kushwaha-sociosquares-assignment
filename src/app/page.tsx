"use client";
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, watch, formState: { errors }, clearErrors, setError } = useForm<FormData>();
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Watch the password field for validation purposes
  const password = watch('password');

  // Form submission handler
  const onSubmit = useCallback(async (data: FormData) => {
    const existingUsers = JSON.parse(sessionStorage.getItem('registeredUsers') || '[]');
    
    // Check if the email or username already exists
    const userExists = existingUsers.some(
      (user: FormData) => user.email === data.email || user.username === data.username
    );
    
    if (userExists) {
      setError("email", { type: "manual", message: "User with this email already exists" });
      setError("username", { type: "manual", message: "User with this username already exists" });
      return; // Stop the registration process if user exists
    }

    try {
      const newUser = await registerUser(data).unwrap();
      alert('Registration successful. Please login to continue.');

      dispatch(addUser(newUser));

      // Add the new user to the session storage
      const updatedUsers = [...existingUsers, newUser];
      sessionStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  }, [dispatch, registerUser, router]);

  // Clear form errors after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      clearErrors();
    }, 3000);
    return () => clearTimeout(timer);
  }, [errors, clearErrors]);

  return (
    <div className='page'>
      <main className='main'>
        <h1 className='title'>Please Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <div>
            <label htmlFor="name" className='label'>Full Name</label>
            <input
              placeholder="Full name"
              {...register("name", { required: 'Name is required' })}
              className='input'
            />
            {errors.name && <p className='error'>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="username" className='label'>Username</label>
            <input
              placeholder="Username"
              {...register("username", { required: 'Username is required' })}
              className='input'
            />
            {errors.username && <p className='error'>{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className='label'>Email</label>
            <input
              placeholder="example@example.com"
              type="email"
              {...register("email", { required: 'Email is required' })}
              className='input'
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className='label'>Password</label>
            <input
              placeholder="********"
              type="password"
              {...register("password", {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must include uppercase, lowercase, number, and special character',
                },
              })}
              className='input'
            />
            <p className='error'>{errors.password?.message}</p>
            <p className='instruction'>
              (Password must include uppercase, lowercase, number, and special character)
            </p>
          </div>
          <div>
            <label htmlFor="confirmPassword" className='label'>Confirm Password</label>
            <input
              placeholder="********"
              type="password"
              {...register("confirmPassword", {
                required: 'Confirm Password is required',
                validate: value => value === password || 'Passwords do not match',
              })}
              className='input'
            />
            <p className='error'>{errors.confirmPassword?.message}</p>
          </div>
          <div className='buttonContainer'>
            <button type="submit" className='submitButton'> Register </button>
            <span className='register' onClick={() => router.push('/login')}>
              Login <ArrowForwardIcon />
            </span>
          </div>
        </form>
      </main>
    </div>
  );
}
