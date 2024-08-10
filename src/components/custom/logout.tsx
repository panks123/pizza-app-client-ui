'use client';
import React from 'react'
import { Button } from '../ui/button';
import { logout } from '@/lib/actions/logout';

const Logout = () => {
    const handleLogout = async () => {
        await logout();
    }
  return (
    <Button size={'sm'}
        onClick={handleLogout}
        >
            Logout
    </Button>
  )
}

export default Logout
