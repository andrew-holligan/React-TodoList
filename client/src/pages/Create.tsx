import {useState} from 'react';
import {json, useNavigate} from 'react-router-dom';

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import Item from '../components/Item.tsx';

function Create() {
    const navigate = useNavigate();
    const [items, setItems] = useState<string[]>([]);

    function addItem() {
        const item = (document.getElementById('item') as HTMLInputElement).value.trim();

        // check for empty input
        if (!item) return;

        setItems([...items, item]);
        (document.getElementById('item') as HTMLInputElement).value = '';
    }

    function deleteItem(index: number){
        const newItems = items.filter((item, i) => i !== index);
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

        await fetch('http://localhost:5000/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                items
            })
        })
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const itemsList = items.map((item, index) => {
        return <Item value={item} onDelete={deleteItem} index={index} key={index} />;
    });

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
                    {itemsList}
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
  
  export default Create