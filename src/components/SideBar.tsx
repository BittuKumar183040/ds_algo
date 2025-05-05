'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { BiHome } from 'react-icons/bi'
import { MdDataArray } from 'react-icons/md'
import sideBarImage from './asset/side glow.png'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

const SideBar = () => {
  const [visible, setVisible ] = useState(false);
  const pathname = usePathname()
  const navLink = "group relative flex items-center tracking-wider gap-4 transition-all text-gray-800 hover:bg-gray-800 hover:text-white text-sm rounded-r-md border border-l-0 border-gray-300";
  const navLinkIcon = "size-4 transition-transform duration-300 group-hover:scale-105";
  const navLinkActive = "bg-gradient-to-r z-10 from-gray-800 via-gray-800 to-black text-white font-medium shadow-md";
  const sideBar = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const asideElement = sideBar.current;
      if (asideElement && !asideElement.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <aside ref={sideBar} className={`fixed z-20 h-full bg-gray-100 text-gray-800 py-4 pr-1 border-r border-gray-300 select-none
    ${visible ? "w-fit": "w-12"}`} >
      <Image className=' absolute left-0 top-0 h-full opacity-20 pointer-events-none ' src={sideBarImage} alt="" />
      <h2 className="font-bold text-center text-xs">{visible ? "DS - ALGO" : "DSA"}</h2>
      <hr className=' opacity-40 my-4 ' />
      <nav className="space-y-2">
        <Link href="/" className={`${navLink} ${pathname === "/" && navLinkActive} ${visible ? " py-2 px-8 pr-12": " py-4 pl-3"}`}>
          <BiHome className={navLinkIcon } />
          {visible && <span>Home</span>}
        </Link>
        <Link href="/array" className={`${navLink} ${pathname === "/array" && navLinkActive} ${visible ? " py-2 px-8 pr-12": " py-4 pl-3"}`}>
          <MdDataArray className={navLinkIcon} />
          {visible && <span>Array</span>}
        </Link>
      </nav>

      <button
        onClick={() => setVisible(!visible)}
        className="absolute cursor-pointer bottom-2 left-2 bg-gray-800 text-white p-2 rounded-md shadow-md hover:bg-gray-700 transition-all"
      >
        {visible ? <LuArrowLeft/> : <LuArrowRight />}
      </button>

    </aside>
  )
}

export default SideBar