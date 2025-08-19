'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
        <div className="header flex items-center justify-center">
            <div className="header_nav flex items-center justify-between py-5 px-[50px] w-full">
                <div className="logo">
                    <Link href='/' prefetch={true} ><Image src='/image/logo-white.webp' alt='logo' width={200} height={50} priority /> </Link>
                </div>
                <nav className="header_menu flex items-center justify-center gap-4">
                    <Link href='/pages/About' prefetch={true} >About</Link>
                    <Link href='/pages/Products' prefetch={true} >Products</Link>
                    <Link href='/pages/Help' prefetch={true} >Help</Link>
                    <Link href='/pages/Category' prefetch={true} >Category</Link>
                    <Link href='/pages/Account' prefetch={true} >Account</Link>
                </nav>
            </div>
        </div>
    </header>
  )
}
