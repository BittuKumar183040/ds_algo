import { useState } from "react"

const CreateBar = ({index, active, value}: {index:number, active:number[]|null, value: number}) => {
  const [isVisible, setIsVisible] = useState(false)
  return (<>
    <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}
      className={`w-1 relative hover:bg-red-400 border border-gray-800 dark:border-gray-200
        ${active && active[0] === index  ? "bg-red-400" : "bg-black dark:bg-white"}
        ${active && active[1] === index  ? "bg-green-400" : "bg-black dark:bg-white"}
      `} 
      style={{ height: value }}>
      {isVisible && (
        <div className={`absolute w-fit h-fit p-2 px-3 bg-orange-800/20 backdrop-blur-sm font-bold text-red-800 text-xs rounded shadow-lg z-10
          -top-10 left-0 pointer-events-none`}>
          {value}
        </div>
      )}

    </div>
  </>
  )
}

export default CreateBar;
