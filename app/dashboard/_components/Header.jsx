"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

    const path = usePathname();


  return (


    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
        <Image src='/logo.svg' width={36} height={36} alt='logo' />
        <ul className='flex gap-6'>
            <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Dashboard</li>
            <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Questions</li>
            <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Upgrade</li>
            <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>How it works</li>
        </ul>
       <UserButton />
    </div>
  )
}

export default Header
