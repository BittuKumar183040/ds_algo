'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiHome } from 'react-icons/bi'
import { MdDataArray } from 'react-icons/md'

const SideBar = () => {
  const pathname = usePathname()
  const navLink = "group flex items-center tracking-wider gap-4 text-gray-800 hover:bg-gray-300 p-2 px-8 pr-10 text-sm rounded-md";
  const navLinkIcon = "size-4 transition-transform duration-300 group-hover:scale-105";
  const navLinkActive = "bg-gray-300 font-medium";

  return (
    <aside className=" h-dvh w-fit bg-gray-100 text-gray-800 py-4 px-1 ">
      <h2 className="text-xl font-bold text-center">Navigation</h2>
      <hr className=' opacity-40 my-4 ' />
      <nav className="space-y-2">
        <Link href="/" className={`${navLink} ${pathname === "/" && navLinkActive}`}>
          <BiHome className={navLinkIcon } />
          <span>Home</span>
        </Link>
        <Link href="/array" className={`${navLink} ${pathname === "/array" && navLinkActive}`}>
          <MdDataArray className={navLinkIcon} />
          <span>Array</span>
        </Link>
      </nav>
    </aside>
  )
}

export default SideBar