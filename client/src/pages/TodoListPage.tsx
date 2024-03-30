import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';

import {API} from '../util/api.ts';
import type {TodoListType} from '../util/types.ts';

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import Item from '../components/Item.tsx';

function TodoListPage() {
    const {id} = useParams();
    const [todoList, setTodoList] = useState<TodoListType>();

    useEffect(() => {
        API.getTodoList(id!).then((data) => {
            setTodoList(data);
        });
    }, []);

    // TODO
    function deleteItem(index: number){
    }

    const itemElts = todoList?.items.map((item, index) => {
        return <Item value={item} onDelete={deleteItem} index={index} key={index} />;
    });

    return (
        <>
            <Header />

            <main className="flex flex-col items-center gap-8 w-full">

                <h1 className="text-center text-4xl text-color1 my-8">{todoList?.name}</h1>

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