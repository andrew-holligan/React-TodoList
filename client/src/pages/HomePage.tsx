import {useState,useEffect} from 'react';

import {API} from '../util/api.ts';
import type {TodoListType} from '../util/types.ts';

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

function HomePage() {
    const [todoLists, setTodoLists] = useState<TodoListType[]>([]);

    // PAGE LOAD

    useEffect(() => {
        API.getTodoLists().then((data) => {
            setTodoLists(data);
        });
    }, []);

    // RENDER

    const todoListElts = todoLists.map((todoList) => {
        return (
            <li key={todoList._id}>
                <a href={"/todolist/" + todoList._id}
                    className="
                    flex justify-center items-center
                    w-80 h-20 
                    bg-color1 hover:bg-color2
                    text-color4 text-xl
                ">
                    {todoList.name}
                </a>
            </li>
        );
    });

    return (
        <>
            <Header />

            <main className="w-full">
                
                <ul className="
                    flex flex-row justify-center flex-wrap 
                    w-full px-16 gap-8
                ">

                    <li className="list-none">
                        <a id="btn-create" href="/create" 
                            className="
                                flex 
                                w-80 h-20 
                                bg-create-todolist bg-no-repeat bg-center bg-16 bg-color1 
                                hover:bg-color2
                            ">
                        </a>
                    </li>

                    {todoListElts}

                </ul>

            </main>

            <Footer />
        </>
    )
  }
  
  export default HomePage