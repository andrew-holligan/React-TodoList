import {useEffect} from 'react';

function Item({value, onDelete, onTick, index, tick}: {value: string, onDelete: (index: number) => void, onTick: (index: number) => void, index: number, tick: boolean}) {
    useEffect(() => {
        (document.getElementById("btn-delete-" + index) as HTMLButtonElement).style.backgroundColor = tick ? '#00FF00' : 'transparent';
    }, []);

    return (
        <li className="
            flex flex-row justify-between items-center 
            w-80 h-12 
            bg-color1
            text-color4 px-4
        ">
            <p className="w-full overflow-hidden">{value}</p>
            <div className="flex item-center">
                <button id={"btn-delete-" + index} onClick={() => onTick(index)}
                    className="
                        w-8 h-8 mx-4
                        bg-tick bg-no-repeat bg-center bg-contain
                        border-2 border-solid border-color4"
                >
                </button>
                <button onClick={() => onDelete(index)}
                    className="
                        w-8 h-8 
                        bg-delete bg-no-repeat bg-center bg-contain bg-[#FF0000]"
                >  
                </button>
            </div>
        </li>
    )
  }
  
  export default Item