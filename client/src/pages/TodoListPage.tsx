import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';

import {API} from '../util/api.ts';
import type {ItemType} from '../util/types.ts';

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import Item from '../components/Item.tsx';

function TodoListPage() {
    const {id} = useParams();
    const [name, setName] = useState<string>('');
    const [items, setItems] = useState<ItemType[]>([]);

    // PAGE LOAD

    useEffect(() => {
        API.getTodoList(id!).then((data) => {
            setName(data.name);
            setItems(data.items);
        });
    }, []);

    // HANDLERS

    function deleteItem(index: number){
        const newItems = items.filter((item, i) => i !== index);
        API.deleteItem(id!, index).then(() => {
            setItems(newItems);
        });
    }

    function tickItem(index: number){
        const newItems = items.map((item, i) => {
            if(i === index){
                return {
                    value: item.value,
                    ticked: !item.ticked,
                };
            }
            return item;
        });
        API.setItemTick(id!, index, newItems[index].ticked).then(() => {
            setItems(newItems);
        });
    }

    // RENDER

    const itemElts = items.map((item, index) => {
        return <Item value={item.value} onDelete={deleteItem} onTick={tickItem} index={index} tick={item.ticked} key={index} />;
    });

    return (
        <>
            <Header />

            <main className="flex flex-col items-center gap-8 w-full">

                <h1 className="text-center text-4xl text-color1 my-8">{name}</h1>

                <ol className="
                    flex flex-row justify-center flex-wrap 
                    w-full px-20 gap-8
                ">
                    {itemElts}
                </ol>

            </main>

            <Footer />
        </>
    )
  }
  
  export default TodoListPage