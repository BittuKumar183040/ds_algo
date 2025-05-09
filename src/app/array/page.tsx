'use client'

import { useEffect, useState } from "react";
import Operations from "./sections/Operations";
import HBar from "@/components/HBar";
import CreateBar from "@/components/CreateBar";
import { MAXVALUE, INITIAL_ARRAY_SIZE } from "@/config/constant";

export default function Page() {

  const [arrayList, setArrayList] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number[] | null>(null);
  const indexClass = " size-8 text-gray-400 rounded flex items-center justify-center text-center"

  useEffect(() => {
    const randomArray = Array.from({ length: INITIAL_ARRAY_SIZE }, () => Math.floor(Math.random() * MAXVALUE) + 1);
    setArrayList(randomArray);
  }, [])

  return (<section className="flex-1 p-6 w-full ">
    <h1 className="text-4xl font-bold mb-4">Array</h1>
    <p>An array is a data structure that can hold a collection of items, typically of the same type, in a contiguous memory location.</p>
    <ul>
      <li>Arrays are zero-indexed.</li>
      <li>They allow random access to elements using indices.</li>
      <li>Common operations include traversal, insertion, deletion, and searching.</li>
    </ul>
    <HBar />
    <div className=" w-full flex justify-center mt-6 ">
      <div className="flex justify-center gap-1 text-sm select-none w-fit pl-5 bg-gray-100 p-2 rounded-md shadow ">
        <div className=" pr-10">
          <div className={indexClass + " relative "}>
            <strong>Index</strong>
            <p className=" absolute w-8 h-px left-10 bg-gray-400"></p>
          </div>
          <div className={indexClass + " relative "}>
            <strong className={indexClass}>Element</strong>
            <p className=" absolute w-6 h-px left-12 bg-gray-400"></p>
          </div>
        </div>
        <div className=" flex gap-2 w-60 md:w-96 lg:w-lg pb-2 overflow-x-scroll">
          {arrayList.map((value, index) => (<div key={index} >
            <div className={indexClass} >
              {index}
            </div>
            <div
              style={activeIndex && activeIndex[0] === index ? { backgroundColor: "#f00a" }
                  : activeIndex && activeIndex[1] === index ? { backgroundColor: "#0f0a" }
                  : undefined
              }
              className={`border border-gray-800 text-black shadow-md size-8 rounded flex items-center justify-center text-center
                `}
            >
              {value}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
    <div className=" w-full flex justify-center my-2">
      <p className=" px-4 py-1 bg-gray-100 opacity-80 rounded-sm">
        <span>array.length = </span>
        <span>{arrayList.length}</span>
      </p>
    </div>
    <div className=" flex justify-center mt-4">
      <div className=" flex items-end relative">
        {arrayList.map((val, idx) => <CreateBar key={idx} index={idx} active={activeIndex} value={val} />)}
      </div>
    </div>
    <HBar />
    <Operations arrayList={arrayList} setActiveIndex={setActiveIndex} setArrayList={setArrayList} />
  </section>
  )
}