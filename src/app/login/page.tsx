'use client';
import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import login from '@/lib/actions/login';
import Image from 'next/image';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import SubmitButton from './components/submit-button';
const initialState = {
    type: '',
    message: '',
}

const Login = ({searchParams}: {searchParams: { tenantId : string}}) => {
    const qs = new URLSearchParams(searchParams);
    const [state, formAction] = useFormState(login, initialState);
    if(state.type === 'success') {
        const returnTo = qs.get('returnTo');
        window.location.href = returnTo ? returnTo : '/';
    }
  return (
    // <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
    <div className='flex items-center justify-center'>
        <div className='w-1/2'>
            <div className='hidden bg-muted lg:block'>
                <Image
                    src='/login-image.webp'
                    alt='Image'
                    width={1920}
                    height={1080}
                    style={{ 
                        objectFit: 'cover', 
                        height: 'calc(100vh - calc(1.25rem + 60px))' 
                    }}
                />
            </div>
        </div>
        {/* <div className='flex items-center justify-center py-12'> */}
        <div className='w-1/2'>
            <div className='flex items-center justify-center py-12'>
                <div className='mx-auto grid w-[350px] gap-6'>
                    <div className='grid gap-2 text-center'>
                        <p aria-live='polite' className={`${state.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{state.message}</p>
                        <h1 className='text-3xl font-bold'>Login</h1>
                        <p>Login to your account!</p>
                    </div>
                    <form action={formAction}>
                        <div className='grid gap-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='e.g. john@example.com'
                                    name='email'
                                    required
                                />
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Link 
                                        href='/forgot-password'
                                        className='ml-auto inline-block text-sm underline'
                                    >
                                            Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id='password'
                                    type='password'
                                    name='password'
                                    placeholder='Your Password'
                                    required
                                />
                            </div>
                            <SubmitButton />
                        </div>
                    </form>
                    <div className='mt-4 text-center text-sm'>
                        Don&apos;t have an account? 
                        <Link href="/signup" className='ml-2 text-primary font-bold'>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Login;
