import { useState, useEffect } from "react";

import { useGetTodoLists } from "../api/endpoints/useGetTodoLists.ts";
import { TodoList as TodoListType } from "../../../shared/types/general.ts";

import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Icon from "../components/Icon.tsx";

function Index() {
	const [todoLists, setTodoLists] = useState<TodoListType[]>([]);

	// PAGE LOAD

	useEffect(() => {
		useGetTodoLists().then((data) => {
			setTodoLists(data);
		});
	}, []);

	// RENDER

	const todoListElts = todoLists.map((todoList) => {
		return (
			<li key={todoList._id}>
				<a
					href={"/todolist/" + todoList._id}
					className="
                    flex justify-center items-center
                    w-80 h-20 
                    bg-color1 hover:bg-color2
                    text-color4 text-xl
                "
				>
					{todoList.name}
				</a>
			</li>
		);
	});

	return (
		<>
			<Header />

			<main className="w-full">
				<ul
					className="
                    flex flex-row justify-center flex-wrap 
                    w-full px-16 gap-8
                "
				>
					<li className="list-none">
						<a
							id="btn-create"
							href="/create"
							className="
                                flex justify-center items-center
                                w-80 h-20 
                                bg-color2
                            "
						>
							<h2 className="text-color4 text-xl mr-4">Create</h2>
							<Icon name="create" width={32} height={32} />
						</a>
					</li>

					{todoListElts}
				</ul>
			</main>

			<Footer />
		</>
	);
}

export default Index;
