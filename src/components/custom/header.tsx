import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Link from 'next/link';
import { Phone, ShoppingBasket } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className='bg-white'>
        <nav className='container py-5 flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
                <span>Logo</span>
                <Select>
                    <SelectTrigger className="w-[180px] focus:ring-0">
                        <SelectValue placeholder="Select Restaurant" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Checnnai Outlet</SelectItem>
                        <SelectItem value="dark">Bandra Outlet</SelectItem>
                        <SelectItem value="system">Noida Outlet</SelectItem>
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
