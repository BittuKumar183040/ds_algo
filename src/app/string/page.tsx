'use client'

import { useState } from "react";
import StringOperations from "./sections/StringOperations";
import HBar from "@/components/HBar";

export default function StringPage() {
  const [inputString, setInputString] = useState<string>("Hello World");
  const [activeIndices, setActiveIndices] = useState<number[] | null>(null);
  const [pattern, setPattern] = useState<string>("lo");

  const indexClass = "size-8 text-gray-400 rounded flex items-center justify-center text-center text-xs";

  return (
    <section className="flex-1 p-6 w-full">
      <h1 className="text-4xl font-bold mb-4">String Manipulation</h1>
      <p className="mb-4">
        A string is a sequence of characters that can be manipulated using various algorithms.
        String operations are fundamental in computer science and include searching, pattern matching, and text processing.
      </p>
      <ul className="mb-6 space-y-1">
        <li>• Strings are sequences of characters stored in memory</li>
        <li>• Characters can be accessed by their index position</li>
        <li>• Common operations include search, replace, substring, and pattern matching</li>
        <li>• String algorithms are used in text editors, search engines, and data processing</li>
      </ul>
      
      <HBar />
      
      <div className="w-full flex justify-center mt-6">
        <div className="flex justify-center gap-1 text-sm select-none w-fit pl-5 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow">
          <div className="pr-8">
            <div className={indexClass + " relative"}>
              <strong>Index</strong>
              <p className="absolute w-8 h-px left-10 bg-gray-400"></p>
            </div>
            <div className={indexClass + " relative"}>
              <strong>Char</strong>
              <p className="absolute w-6 h-px left-12 bg-gray-400"></p>
            </div>
          </div>
          <div className="flex gap-1 w-fit max-w-4xl pb-2 overflow-x-scroll">
            {inputString.split('').map((char, index) => (
              <div key={index}>
                <div className={indexClass}>
                  {index}
                </div>
                <div
                  style={
                    activeIndices && activeIndices.includes(index)
                      ? { backgroundColor: "#3b82f6aa", color: "white" }
                      : undefined
                  }
                  className="border border-gray-800 dark:border-gray-100 shadow-md min-w-8 h-8 rounded flex items-center justify-center text-center px-1"
                >
                  {char === ' ' ? '·' : char}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center my-4">
        <div className="flex gap-6 items-center px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="opacity-80">
            <span>String Length: </span>
            <span className="font-semibold">{inputString.length}</span>
          </p>
          <p className="opacity-80">
            <span>Pattern: "</span>
            <span className="font-semibold text-blue-600">{pattern}</span>
            <span>"</span>
          </p>
        </div>
      </div>

      <HBar />
      
      <StringOperations 
        inputString={inputString} 
        setInputString={setInputString}
        setActiveIndices={setActiveIndices}
        pattern={pattern}
        setPattern={setPattern}
      />
    </section>
  );
}