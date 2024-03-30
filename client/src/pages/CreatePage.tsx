import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {API} from '../util/api.js';
import type {ItemType} from '../util/types.ts';

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import Item from '../components/Item.tsx';

function CreatePage() {
    const navigate = useNavigate();
    const [items, setItems] = useState<ItemType[]>([]);

    function addItem() {
        const item = (document.getElementById('item') as HTMLInputElement).value.trim();

        // check for empty input
        if (!item) return;

        // check for duplicate item
        if (items.some(itemO => itemO.value === item)) {
            alert("Error - Item already exists!");
            return;
        }

        setItems([...items, {value: item, ticked: false}]);
        (document.getElementById('item') as HTMLInputElement).value = '';
    }

    function deleteItem(index: number){
        const newItems = items.filter((item, i) => i !== index);
        setItems(newItems);
    }

    function tickItem(index: number){
        const newItems = items.map((item, i) => {
            if (i === index) {
                item.ticked = !item.ticked;
            }
            return item;
        });
        setItems(newItems);
    }

    async function create() {
        const name = (document.getElementById('name') as HTMLInputElement).value.trim();

        // validation
        if (!name) {
            alert("Error - Name is required!")
            return;
        }
        if (items.length === 0) {
            alert("Error - Items are required!")
            return;
        }

        API.createTodoList(name, items).then(() => {
            navigate("/");
        });
    }

    const itemElts = items.map((item, index) => {
        return <Item value={item.value} onDelete={deleteItem} onTick={tickItem} index={index} tick={item.ticked} key={index} />;
    });

    console.log(items);

    return (
        <>
            <Header />

            <main className="flex flex-col items-center gap-8 w-full">

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

                <ol className="
                    flex flex-row justify-center flex-wrap 
                    w-full px-20 gap-8
                ">
                    {itemElts}
                </ol>
  
                <button id="btn-create" onClick={create}
                    className="
                        flex justify-center items-center
                        w-80 h-12
                        bg-color1 hover:bg-color2
                        text-color4"
                >
                    Create
                </button>

            </main>

            <Footer />
        </>
    )
  }
  
  export default CreatePage