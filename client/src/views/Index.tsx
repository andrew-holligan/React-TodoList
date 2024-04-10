import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetTodoLists } from "../routing/api/useGetTodoLists.ts";
import { useAuth } from "../routing/auth/useAuth.ts";
import { TodoList as TodoListType } from "../../../shared/types/todolist.ts";

import Header from "../components/Header.tsx";
import Loading from "../components/Loading.tsx";
import UserHeader from "../components/UserHeader.tsx";
import Footer from "../components/Footer.tsx";
import Icon from "../components/Icon.tsx";

function Index() {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [todoLists, setTodoLists] = useState<TodoListType[]>([]);

	// PAGE LOAD

	useEffect(() => {
		useAuth().then((res) => {
			if (!res.success) {
				navigate("/login");
				return;
			}

			setUsername(res.data);

			useGetTodoLists().then((res) => {
				if (!res.success) {
					alert(res.reason);
					return;
				}
				setTodoLists(res.data);
			});
		});
	}, []);

	// RENDER

	if (!username) {
		return <Loading />;
	}

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

			<UserHeader username={username} />

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
