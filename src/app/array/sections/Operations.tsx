import { EFFECT_SPEED, MAXVALUE } from '@/config/constant'
import React, { useEffect, useRef, useState } from 'react'

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
    { name: "traverse", label: "Traverse" },
    { name: "find", label: "Find" },
  ]

  const arrayListRef = useRef<number[]>([]);

  // Keep ref always in sync with state
  useEffect(() => {
    arrayListRef.current = arrayList;
  }, [arrayList]);


  const resetVisual = () => {
    if (animation.current) {
      clearTimeout(animation.current);
      animation.current = null;
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

  const traverseOneByOne = (start = 0, end = arrayList.length) => {
    let i = start;
    const n = end;
    const step = () => {
      setActiveIndex([i]);
      animation.current = setTimeout(() => {
        i = i + 1;
        if (i >= n) {
          return;
        }
        step();
      }, EFFECT_SPEED);
    };
    step();
  };

  const findSmallest = (array: number[], from:number = 0, to:number = array.length, speed = EFFECT_SPEED + 100): Promise<{ index: number; value: number }> => {
    return new Promise((resolve) => {
      let i = from;
      let j = from;
      const n = to;

      const step = () => {
        if (i < n) {
          setActiveIndex([i, j]);
          animation.current = setTimeout(() => {
            if (array[i] < array[j]) {
              j = i;
            }
            i++;
            step();
          }, speed);
        } else {
          setActiveIndex([j]);
          resolve({ index: j, value: array[j] });
        }
      };

      step();
    });
  };

  const findLargest = (array: number[], speed = EFFECT_SPEED + 100): Promise<{ index: number; value: number }> => {
    return new Promise((resolve) => {
      let i = 0;
      let j = 1;
      const n = arrayList.length;
      const step = () => {
        setActiveIndex([i, j]);
        animation.current = setTimeout(() => {
          if (arrayList[i] >= arrayList[j]) {
            j = i;
          }
          if (i < n) {
            step();
          } else {
            setActiveIndex([j]);
            resolve({ index: j, value: array[j] });
          }
          i++
        }, speed);
      }
      step();
    });
  };

  const move = (fromIndex:number, toIndex:number, speed = EFFECT_SPEED + 100): Promise<boolean> => {
    return new Promise((resolve) => {
      const step = (from:number, to:number) => {
        setActiveIndex([from, to]);
        animation.current = setTimeout(() => {
          if(Math.abs(from) === Math.abs(to)) {
            setActiveIndex([from]);
            resolve(true);
            return;
          }
          if (from > to) {
            setArrayList((prev: number[]) => {
              const newArr = [...prev];
              [newArr[from], newArr[from-1]] = [newArr[from-1], newArr[from]];
              return newArr;
            });
            step(from-1, to)
          }
          else {
            setArrayList((prev: number[]) => {
              const newArr = [...prev];
              [newArr[to], newArr[to-1]] = [newArr[to-1], newArr[to]];
              return newArr;
            });
            step(from, to - 1);
          }
        }, speed);
      }
      step(fromIndex, toIndex);
    });
  };

  const gotValue = (value: string) => {
    resetVisual();
    switch (operation) {
      case "push":
        setActiveIndex([arrayList.length])
        setArrayList((prev: number[]) => [...prev, parseInt(value)]);
        setTimeout(() => {
          setActiveIndex(null);
        }, EFFECT_SPEED + 100);
        break;
      case "pop":
        setActiveIndex([arrayList.length - 1])
        setTimeout(() => {
          setArrayList((prev: number[]) => prev.slice(0, -1));
        }, EFFECT_SPEED + 100);
        break;
      case "shift":
        setActiveIndex([0]);
        setTimeout(() => {
          setArrayList((prev: number[]) => prev.slice(1));
          setActiveIndex(null)
        }, EFFECT_SPEED + 100);
        break;
      case "unshift":
        setActiveIndex([0]);
        setArrayList((prev: number[]) => [parseInt(value), ...prev]);
        setTimeout(() => {
          setActiveIndex(null);
        }, EFFECT_SPEED + 100);
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
        switch (value) {
          case "bubble": {
            const bubbleSortOneByOne = () => {
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
                  if (!isSorted(arrayList) || i == 0) {
                    step();
                  }
                }, EFFECT_SPEED);
              };
              step();
            };
            bubbleSortOneByOne();
          }
            break;
            case "selection": {
              const selectionSortOneByOne = async (index: number) => {
                if (index >= arrayListRef.current.length || isSorted(arrayList)) {
                  traverseOneByOne();
                  return;
                }
                
                const res = await findSmallest([...arrayListRef.current], index, arrayListRef.current.length, 10);
                await move(res.index, index, EFFECT_SPEED);
                await selectionSortOneByOne(index + 1);
              };
            
              selectionSortOneByOne(0);
            }
            break;
          default:
            break;
        }

        break;
      case "traverse":
        traverseOneByOne();
        break;
      case "find":
        switch (value) {
          case "smallest":
            findSmallest(arrayList)
            break;
          case "largest":
            findLargest(arrayList)
            break;
          default:
            break;
        }
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
          <div className=' flex gap-10'>
            <Button
              label={<p>Pop Element - <span className='text-red-300 font-semibold bg-amber-50 p-2 rounded'>{arrayList[arrayList.length - 1]}</span></p>}
              errorLabel={"Push Some Number Please! 🙏"}
              arrayList={arrayList}
              onClick={() => arrayList.length > 0 ? gotValue("") : (document.querySelector("#push") as HTMLElement)?.click()}
            />
            <Button
              label={<p>Pop All <span className='text-red-300 font-semibold '>({arrayList.length})</span> of them!</p>}
              errorLabel={"You Already Removed All 🥹"}
              arrayList={arrayList}
              onClick={() => setArrayList([])}
            />
          </div>
        </div>,
        "shift": <div>
          <strong>Shift</strong>
          <p className="text-sm mb-4">This operation removes the first element from the array. Click &quot;Run&quot; to perform the operation.</p>
          <Button label={<p> Remove Element - <span className='text-red-300 font-semibold bg-amber-50 p-2 rounded'>{arrayList[0]}</span></p>} arrayList={arrayList} onClick={() => gotValue("")} />
        </div>,
        "unshift": <div>
          <strong>Unshift</strong>
          <p className="text-sm mb-4">This operation allows you to add an element to the beginning of the array. Enter a number below and click &quot;Run&quot; to perform the operation.</p>
          <InputField setValue={gotValue} />
        </div>,
        "reverse": <div>
          <strong>Reverse</strong>
          <p className="text-sm mb-4">This operation reverses the order of elements in the array. Click &quot;Run&quot; to perform the operation.</p>
          <Button label={"Reverse Array"} arrayList={arrayList} onClick={() => gotValue("")} />
        </div>,
        "sort": <div>
          <strong>Sort</strong>
          <p className="text-sm mb-4">This operation sorts the elements in the array in ascending order. Click &quot;Run&quot; to perform the operation.</p>
          <div className=' flex gap-10'>
            <Button label={"Bubble Sort"} arrayList={arrayList} onClick={() => gotValue("bubble")} />
            <Button label={"Selection Sort"} arrayList={arrayList} onClick={() => gotValue("selection")} />
          </div>
        </div>,
        "traverse": <div>
          <strong>Traverse</strong>
          <p className="text-sm mb-4">This operation traverses through the array and highlights each element one by one. Click &quot;Run&quot; to perform the operation.</p>
          <Button label={"Traverse"} arrayList={arrayList} onClick={() => gotValue("")} />
        </div>,
        "find": <div>
          <strong>Find</strong>
          <p className="text-sm mb-4">Find element in array using triversal of array.</p>
          <div className=' flex gap-10'>
            <Button label={"Smallest"} arrayList={arrayList} onClick={() => gotValue("smallest")} />
            <Button label={"Largest"} arrayList={arrayList} onClick={() => gotValue("largest")} />
          </div>
        </div>,
      }[operation]}
    </section>

  )
}

const Button = ({ label, errorLabel = "Found Empty Array", arrayList, onClick }: any) => {
  return <button
    onClick={onClick}
    className={` ${arrayList.length === 0 && " opacity-50 pointer-events-none"} cursor-pointer active:scale-95 p-2 pr-1 bg-green-800 text-white shadow-md rounded-md hover:bg-green-700 transition-all`}
  >
    {arrayList.length > 0 ? <div className=' px-4'>{label}</div>
      : <div className=' px-4' title='Action not allowed.'>{errorLabel}</div>
    }
  </button>
}

export default Operations