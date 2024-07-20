import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Link from 'next/link';
import { Phone, Pizza, ShoppingBasket } from 'lucide-react';
import { Button } from '../ui/button';
import { Tenant } from '@/types';

const Header = async () => {
    const tenantsResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/tenants?perPage=100`, {
        next: {
            revalidate: 3600 // refresh the cache in 1 hour (fetch data after 1 hour)
        }
    });
    const tenants = await tenantsResponse.json();
    console.log({tenants})
    return (
    <header className='bg-white'>
        <nav className='container py-5 flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
                <div className='flex items-center gap-2 bg-[#3b2323fc] p-0 pr-2 rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]'>
                    <div className='border-primary border-2 p-1.5 rounded-full'>
                        <Pizza className='text-primary'/>
                    </div>
                    <span className='font-black text-primary'>PizzoMoto</span>
                </div>
                <Select>
                    <SelectTrigger className="w-[180px] focus:ring-0">
                        <SelectValue placeholder="Select Restaurant" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            tenants.data.map((tenant: Tenant) => {
                                return <SelectItem key={tenant.id} value={String(tenant.id)}>{tenant.name}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className='flex items-center gap-4'>
                <ul className='flex items-center font-medium space-x-4'>
                    <li className='hover:text-primary'><Link href={"/"}>Menu</Link></li>
                    <li className='hover:text-primary'><Link href={"/"}>Orders</Link></li>
                </ul>
                <div className='relative'>
                    <Link href="/cart">
                        <ShoppingBasket className='hover:text-primary'/>
                    </Link>
                    <span className='absolute -top-2 -right-4 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-white font-light font-mono'>
                        6
                    </span>
                </div>
                <div className='flex items-center gap-x-1 ml-12'>
                    <Phone size={18}/>
                    <span className='hover:text-primary'>+91-9123446084</span>
                </div>
                <Button size={'sm'}>Logout</Button>
            </div>
        </nav>
    </header>
  )
}

export default Header;
