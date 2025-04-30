import React, {useState} from 'react'

const Tab = () => {
  
  const [selected, setSelected] = useState<number>(0);

  const tabs = ["One-dimensional Array", "Multi-dimensional Array"]

  return (
    <section className=" w-full flex gap-4 justify-start">
      {tabs.map((name, idx)=> <div key={name}>
        <button onClick={()=>setSelected(idx)}
          className={` relative cursor-pointer border-b border-transparent p-1 px-4 rounded-md shadow text-gray-600
          ${selected === idx && "border-black bg-gray-200 text-gray-800"}`}>
          <span>{name}</span>
        </button>
      </div>)}
    </section>
  )
}

export default Tab