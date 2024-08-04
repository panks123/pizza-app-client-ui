import React from 'react'
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';

const SubmitButton = () => {
    const {pending} = useFormStatus();
  return (
    <Button disabled={pending}>
        {pending && <LoaderCircle size={16} className='animate-spin mr-2'/>} 
        <span>{pending  ? 'Please wait...' : 'Login'}</span>
    </Button>
  )
}

export default SubmitButton;
