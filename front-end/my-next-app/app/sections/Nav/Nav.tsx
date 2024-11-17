"use client"
import React from 'react'
import './Nav.css'
 
function Nav() {
    return (
        <nav id="nav" className="bg-[#7997C1]">
            <img className="logo h-14 w-auto " src={"/static/images/goldman.png"}
                 alt="wehack logo"></img>

            <input type="checkbox" id="checkbox_toggle"/>
            <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>

                <ul className="collapse-menu">
                    <div>
                        <li><a className='text-lg lg:text-base text-black' href="/onboarding">Onboarding</a></li>
                        <li><a className='text-lg lg:text-base text-black' href="/login">Login</a></li>
                    </div>
                </ul>

        
        </nav>
    )
}

export default Nav