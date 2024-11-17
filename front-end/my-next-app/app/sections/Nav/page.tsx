"use client"
import React from 'react'
import './Nav.css'
import Link from 'next/link';

function Nav() {
    return (
        <nav id="nav" className="bg-[#7997C1]">
            <Link href="/">
                <img className="logo h-14 w-auto" 
                     src={"/static/images/goldman.png"}
                     alt="wehack logo" />
            </Link>

            <input type="checkbox" id="checkbox_toggle"/>
            <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>

            <ul className="collapse-menu">
                <div>
                    <li><Link className='text-lg lg:text-base text-black' href="/dashboard">Dashboard</Link></li>
                    <li><Link className='text-lg lg:text-base text-black' href="/onboarding">Onboarding</Link></li>
                    <li><Link className='text-lg lg:text-base text-black' href="/login">Login</Link></li>
                    <li><Link className='text-lg lg:text-base text-black' href="/help">Help</Link></li>
                    <li><Link className='text-lg lg:text-base text-black' href="/terms">Terms</Link></li>
                    <li><Link className='text-lg lg:text-base text-black' href="/privacy">Privacy</Link></li>
                </div>
            </ul>
        </nav>
    )
}

export default Nav