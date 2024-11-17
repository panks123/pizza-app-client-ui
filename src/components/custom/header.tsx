import React from 'react'
import Link from 'next/link';
import { Phone, Pizza } from 'lucide-react';
import { Button } from '../ui/button';
import dynamic from 'next/dynamic';
import TenantSelect from './tenant-select';
import StoreLogo from './store-logo';
import { getSession } from '@/lib/session';
import Logout from './logout';
import LoginBtn from './login-btn';
const CartCounter = dynamic(() => import('./cart-counter'), {ssr: false});

const Header = async () => {
    const session = await getSession();
    const tenantsResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/tenants?perPage=100`, {
        next: {
            revalidate: 3600 // refresh the cache in 1 hour (fetch data after 1 hour)
        }
    });
    if(!tenantsResponse.ok) {
        // throw new Error("Failed to fetch tenants")
        return <p>Failed to fetch tenants</p>
    }
    const tenants = await tenantsResponse.json();
    return (
    <header className='bg-white'>
        <nav className='container py-5 flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
                <StoreLogo/>
                <TenantSelect tenants={tenants}/>
            </div>
            <div className='flex items-center gap-4'>
                <ul className='flex items-center font-medium space-x-4'>
                    <li className='hover:text-primary'><Link href={"/"}>Menu</Link></li>
                    <li className='hover:text-primary'><Link href={"/orders"}>Orders</Link></li>
                </ul>
                <CartCounter/>
                <div className='flex items-center gap-x-1 ml-12'>
                    <Phone size={18}/>
                    <span className='hover:text-primary'>+91-9123446084</span>
                </div>
                {
                    session ? 
                    <Logout /> : 
                    <LoginBtn />
                }
            </div>
        </nav>
    </header>
  )
}

export default Header;
