'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { BiHome } from 'react-icons/bi'
import { MdDataArray } from 'react-icons/md'
import sideBarImage from './asset/side glow.png'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { PiPathFill } from 'react-icons/pi'
import DarkModeBtn from './DarkModeBtn'

const SideBar = () => {
  const [visible, setVisible ] = useState(false);
  const pathname = usePathname()
  const navLink = "group relative flex items-center tracking-wider gap-4 transition-all text-gray-800 hover:bg-gray-800 hover:text-white dark:text-gray-100 text-sm rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600";
  const navLinkIcon = "size-4 transition-transform duration-300 group-hover:scale-105 dark:text-gray-100";
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
    <aside ref={sideBar} className={` relative z-20 min-h-dvh h-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 py-4 pr-1 border-r border-gray-200 dark:border-gray-700 select-none
      transition-all ${visible ? " min-w-40": "w-12"}`} 
      >
      <Image className=' absolute left-0 top-0 h-full opacity-20 pointer-events-none ' src={sideBarImage} alt="" />
      <h2 className="font-bold text-center text-xs whitespace-nowrap">{visible ? "DS - ALGO" : "DSA"}</h2>
      <hr className=' opacity-40 my-4 ' />
      
      <div className=' mb-4 w-full bottom-22 flex flex-row flex-wrap gap-4 justify-center items-center'>
        <div className={ `${visible ? 'scale-100':'scale-75'} transition-all hover:scale-90` }>
          <DarkModeBtn />
        </div>
        <button
          onClick={() => setVisible(!visible)}
          className=" cursor-pointer bg-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900 text-white p-2 rounded-md shadow-md hover:bg-gray-700 transition-all"
        >
          {visible ? <LuArrowLeft/> : <LuArrowRight />}
        </button>
      </div>
      
      <nav className="space-y-2 sticky top-3">
        <Link href="/" className={`${navLink} ${pathname === "/" && navLinkActive} ${visible ? " py-2 pl-4 ": " py-4 pl-3"}`}>
          <BiHome className={navLinkIcon } />
          {visible && <span>Home</span>}
        </Link>
        <Link href="/array" className={`${navLink} ${pathname === "/array" && navLinkActive} ${visible ? " py-2 pl-4 ": " py-4 pl-3"}`}>
          <MdDataArray className={navLinkIcon} />
          {visible && <span>Array</span>}
        </Link>
        <Link href="/path" className={`${navLink} ${pathname === "/path" && navLinkActive} ${visible ? " py-2 pl-4 ": " py-4 pl-3"}`}>
          <PiPathFill className={navLinkIcon} />
          {visible && <span>Path Finding</span>}
        </Link>
      </nav>

    </aside>
  )
}

export default SideBar