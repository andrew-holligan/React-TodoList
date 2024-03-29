import {useState} from 'react';

import Header from '../components/Header.tsx';
import Item from '../components/Item.tsx';

function Create() {
    const [items, setItems] = useState<string[]>([]);

    function addItem() {
        const item = (document.getElementById('item') as HTMLInputElement).value;
        setItems([...items, item]);
        (document.getElementById('item') as HTMLInputElement).value = '';
    }

    const itemsList = items.map((item, index) => {
        return <Item value={item} key={index} />;
    });

    return (
        <>
            <Header />

            <main className="flex flex-col gap-8 w-full">

                <div className="
                    flex flex-col items-center 
                    gap-2
                ">
                    <h3 className="text-xl text-color4">
                        Give it a Name!
                    </h3>
                    <input type="text" id="name" placeholder="name"
                        className="
                            w-80 h-12 
                            border-2 border-solid border-color1 
                            text-color1 px-4
                    "/>
                </div>

                <div className="
                    flex flex-col items-center 
                    gap-2 w-full
                ">
                    <h3 className="text-xl text-color4">
                        Add your Items!
                    </h3>
                    <div className="flex justify-between w-80">
                        <input type="text" id="item" placeholder="item"
                            className="
                                w-50 h-12 
                                border-2 border-solid border-color1 
                                text-color1 px-4
                        "/>
                        <button id="btn-add" onClick={() => addItem()}
                            className="
                                flex 
                                w-20 h-12 
                                bg-add bg-no-repeat bg-center bg-8 bg-color1 
                                hover:bg-color2
                        ">
                        </button>
                    </div>
                </div>

                <ol>
                    {itemsList}
                </ol>
  
                <button id="btn-save">Save</button>

            </main>
        </>
    )
  }
  
  export default Create