'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
        <div className="footer flex items-center justify-between py-7 px-[50px] w-full">
            <div className="flex flex-col w-[400px]">
                <h1>About</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae esse nulla ab. Itaque, sint deleniti totam accusantium vero minima nostrum consequuntur, iusto, error molestias modi officiis id sit in iste.</p>
            </div>
            <div className="flex flex-col w-[200px] items-center justify-center">
                <div className="logo">
                    <Link href='/' prefetch={true} ><Image src='/image/logo-white.webp' alt='logo' width={200} height={50} priority /></Link>
                </div>
                <ul className='flex gap-4'>
                    <li>f</li>
                    <li>i</li>
                    <li>l</li>
                    <li>y</li>
                    <li>x</li>
                </ul>
            </div>
        </div>
    </footer>
  )
}
