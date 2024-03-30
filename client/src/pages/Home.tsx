import {useState,useEffect} from 'react';

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

interface TodoList {
    _id: string;
    name: string;
    items: string[];
}

async function getTodoLists() {
    return await fetch('http://localhost:5000/', {
        method: 'GET',
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    }); 
}

function Home() {
    const [todoLists, setTodoLists] = useState<TodoList[]>([]);

    useEffect(() => {
        getTodoLists().then((data) => {
            setTodoLists(data);
        });
    }, []);

    const todoListsElts = todoLists.map((todoList) => {
        return (
            <li key={todoList._id}>
                <a href=""
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

                    {todoListsElts}

                </ul>

            </main>

            <Footer />
        </>
    )
  }
  
  export default Home