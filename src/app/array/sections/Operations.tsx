import { EFFECT_SPEED, MAXVALUE } from '@/config/constant'
import React, { useRef, useState } from 'react'

const InputField = ({ setValue }: { setValue: any }) => {
  const input = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    let val = input.current?.value || "";
    val = val.replace(/^0+/, '');

    const num = Number(val);
    if (num >= 1 && num <= MAXVALUE) {
      setValue(num);
      if (input.current) {
        input.current.value = "";
      }
    } else {
      alert(`Please enter a number between 1 and ${MAXVALUE}`);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    val = val.replace(/[^0-9]/g, '');
    val = val.replace(/^0+/, '');
    if (Number(val) > MAXVALUE) {
      val = String(MAXVALUE);
    }
    e.currentTarget.value = val;
  }

  return (
    <div className='flex gap-4'>
      <input
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        ref={input}
        type="text"
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter a number (1-${MAXVALUE})`}
      />
      <button
        onClick={handleConfirm}
        className='cursor-pointer active:scale-95 p-2 px-5 bg-green-800 text-white shadow-md rounded-md'
      >
        Run
      </button>
    </div>
  )
}


const Operations = ({ arrayList, setActiveIndex, setArrayList }: { arrayList: number[], setActiveIndex: any, setArrayList: any }) => {

  const [operation, setOperation] = useState<string>("push")
  const animation = useRef<ReturnType<typeof setTimeout> | null>(null)
  const operations = [
    { name: "push", label: "Push" },
    { name: "pop", label: "Pop" },
    { name: "shift", label: "Shift" },
    { name: "unshift", label: "Unshift" },
    { name: "reverse", label: "Reverse" },
    { name: "sort", label: "Sort" },
  ]

  const resetVisual = () => {
    if (animation.current) {
      clearTimeout(animation.current);
      animation.current=null;
      return true;
    }
    return false;
  }

  const isSorted = (arr: number[]) => {
    for (let k = 0; k < arr.length - 1; k++) {
      if (arr[k] > arr[k + 1]) {
        return false;
      }
    }
    return true;
  };

  const gotValue = (val: string) => {
    const value = parseInt(val)
    resetVisual();
    switch (operation) {
      case "push":
        setActiveIndex([arrayList.length])
        setArrayList((prev: number[]) => [...prev, value]);
        setTimeout(() => {
          setActiveIndex(null);
        }, EFFECT_SPEED);
        break;
      case "pop":
        setActiveIndex([arrayList.length - 1])
        setTimeout(() => {
          setArrayList((prev: number[]) => prev.slice(0, -1));
        }, EFFECT_SPEED);
        break;
      case "shift":
        setActiveIndex([0]);
        setTimeout(() => {
          setArrayList((prev: number[]) => prev.slice(1));
          setActiveIndex(null)
        }, EFFECT_SPEED);
        break;
      case "unshift":
        setActiveIndex([0]);
        setArrayList((prev: number[]) => [value, ...prev]);
        setTimeout(() => {
          setActiveIndex(null);
        }, EFFECT_SPEED);
        break;
        case "reverse":
          const reverseOneByOne = () => {
            let stepCount = 0;
            const n = arrayList.length;
        
            const step = () => {
              const i = stepCount;
              const j = n - 1 - stepCount;
              if (i >= j) {
                setActiveIndex(null);
                return;
              }
              setActiveIndex([i, j]);
              setArrayList((prev: number[]) => {
                const newArr = [...prev];
                [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                return newArr;
              });
        
              animation.current = setTimeout(() => {
                stepCount++;
                step();
              }, EFFECT_SPEED);
            };
            step();
          };
        
          reverseOneByOne();
          break;
        
        case "sort":
          const sortOneByOne = () => {
            let i = 0;
            let j = 0;
            const n = arrayList.length;
            const step = () => {
              if (i >= n - 1) {
                setActiveIndex(null);
                return;
              }
              setActiveIndex([j, j + 1]);
              setArrayList((prev: number[]) => {
                const newArr = [...prev];
                if (newArr[j] > newArr[j + 1]) {
                  [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                }
                return newArr;
              });
              animation.current = setTimeout(() => {
                j++;
                if (j >= n - i - 1) {
                  j = 0;
                  i++;
                }
                if(!isSorted(arrayList) || i == 0){
                  step();
                }
              }, EFFECT_SPEED);
            };
            step();
          };
          sortOneByOne();
        break;
      default:
        break;
    }
  }

  return (
    <section className="mt-8">
      <p className="font-bold text-lg mb-2">Operations</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {operations.map((item, key) =>
          <button key={item.name + "_" + key}
            onClick={() => setOperation(item.name)}
            id={item.name}
            style={item.name === operation ? { backgroundColor: 'red' } : {}}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm cursor-pointer">
            {item.label}
          </button>
        )}
      </div>

      {{
        "push": <div>
          <strong>Push</strong>
          <p className="text-sm mb-4">This operation allows you to add an element to the end of the array. Enter a number below and click &quot;Run&quot; to perform the operation.</p>
          <InputField setValue={gotValue} />
        </div>,
        "pop": <div>
          <strong>Pop</strong>
          <p className="text-sm mb-4">This operation removes the last element from the array. Click &quot;Run&quot; to perform the operation.</p>
          <button
            onClick={() => arrayList.length > 0 ? gotValue("") : (document.querySelector("#push") as HTMLElement)?.click()}
            className={` ${arrayList.length === 0 && " opacity-50"} cursor-pointer active:scale-95 p-2 pr-1 bg-green-800 text-white shadow-md rounded-md hover:bg-green-700 transition-all`}
          >
            {arrayList.length > 0 ? <p>Pop Element - <span className='text-red-300 font-semibold bg-amber-50 p-2 rounded'>{arrayList[arrayList.length - 1]}</span></p>
              : <p className=' px-4' title='Nothing to remove'>Push Some Number Please! 🙏 </p>
            }
          </button>

          <button
            onClick={() => setArrayList([])}
            className={` ${arrayList.length === 0 && " opacity-50 pointer-events-none"} ml-8 cursor-pointer active:scale-95 p-2 px-5 bg-orange-800 text-white shadow-md rounded-md hover:bg-orange-700 transition-all`}
          >
            {arrayList.length > 0 ? <p>Pop All <span className='text-red-300 font-semibold '>({arrayList.length})</span> of them!</p>
              : <p className=' px-4' title='Nothing to remove'>You Already Did! 🥹</p>
            }
          </button>
          

        </div>,
        "shift": <div>
          <strong>Shift</strong>
          <p className="text-sm mb-4">This operation removes the first element from the array. Click &quot;Run&quot; to perform the operation.</p>
          <button
            onClick={() => gotValue("")}
            className={` ${arrayList.length === 0 && " opacity-50 pointer-events-none"} cursor-pointer active:scale-95 p-2 pr-1 bg-green-800 text-white shadow-md rounded-md hover:bg-green-700 transition-all`}
          >
            {arrayList.length > 0 ? <p> Remove Element - <span className='text-red-300 font-semibold bg-amber-50 p-2 rounded'>{arrayList[0]}</span></p>
              : <p className=' px-4' title='Nothing to remove'>Found Emply Array</p>
            }
          </button>
        </div>,
        "unshift": <div>
          <strong>Unshift</strong>
          <p className="text-sm mb-4">This operation allows you to add an element to the beginning of the array. Enter a number below and click &quot;Run&quot; to perform the operation.</p>
          <InputField setValue={gotValue} />
        </div>,
        "reverse": <div>
          <strong>Reverse</strong>
          <p className="text-sm mb-4">This operation reverses the order of elements in the array. Click &quot;Run&quot; to perform the operation.</p>
          <button
            onClick={() => gotValue("")}
            className={` ${arrayList.length === 0 && " opacity-50 pointer-events-none"} cursor-pointer active:scale-95 p-2 pr-1 bg-green-800 text-white shadow-md rounded-md hover:bg-green-700 transition-all`}
          >
            {arrayList.length > 0 ? <p className=' px-4'>Reverse Array</p>
              : <p className=' px-4' title='Nothing to reverse'>Found Empty Array</p>
            }
          </button>
        </div>,
        "sort": <div>
          <strong>Sort</strong>
          <p className="text-sm mb-4">This operation sorts the elements in the array in ascending order. Click &quot;Run&quot; to perform the operation.</p>
          <button
            onClick={() => gotValue("")}
            className={` ${arrayList.length === 0 && " opacity-50 pointer-events-none"} cursor-pointer active:scale-95 p-2 pr-1 bg-green-800 text-white shadow-md rounded-md hover:bg-green-700 transition-all`}
          >
            {arrayList.length > 0 ? <p className=' px-4'>Sort Array</p>
              : <p className=' px-4' title='Nothing to reverse'>Found Empty Array</p>
            }
          </button>
        </div>,
      }[operation]}


    </section>

  )
}

export default Operations