import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useGetTodoList } from "../api/endpoints/useGetTodoList.ts";
import { useDeleteTodoList } from "../api/endpoints/useDeleteTodoList.ts";
import { useDeleteItem } from "../api/endpoints/useDeleteItem.ts";
import { usePutItemTick } from "../api/endpoints/usePutItemTick.ts";
import { usePutTodoListName } from "../api/endpoints/usePutTodoListName.ts";
import { Item as ItemType } from "../../../shared/types/general.ts";

import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Item from "../components/Item.tsx";
import Icon from "../components/Icon.tsx";

function TodoList() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [name, setName] = useState<string>("");
	const [items, setItems] = useState<ItemType[]>([]);

	// PAGE LOAD

	useEffect(() => {
		useGetTodoList(id!).then((res) => {
			if (!res.success) {
				alert(res.reason);
				return;
			}
			setName(res.data.name);
			setItems(res.data.items);
		});
	}, []);

	// HANDLERS

	// TODO
	function editTodoListName() {
		const newName = prompt("Enter new name:")?.trim();

		// validation
		if (!newName) {
			alert("Name cannot be empty!");
			return;
		}

		usePutTodoListName(id!, newName).then((res) => {
			if (!res.success) {
				alert(res.reason);
				return;
			}
			setName(newName);
		});
	}

	function deleteTodoList() {
		useDeleteTodoList(id!).then((res) => {
			if (!res.success) {
				alert(res.reason);
				return;
			}
			navigate("/");
		});
	}

	function deleteItem(index: number) {
		const newItems = items.splice(index, 1);

		useDeleteItem(id!, index).then((res) => {
			if (!res.success) {
				alert(res.reason);
				return;
			}
			setItems(newItems);
		});
	}

	function tickItem(index: number) {
		const newItems = items.map((item, i) => {
			if (i === index) {
				return {
					value: item.value,
					ticked: !item.ticked,
				};
			}
			return item;
		});

		usePutItemTick(id!, index, newItems[index].ticked).then((res) => {
			if (!res.success) {
				alert(res.reason);
				return;
			}
			setItems(newItems);
		});
	}

	// RENDER

	const itemElts = items.map((item, index) => {
		return (
			<Item
				value={item.value}
				onDelete={deleteItem}
				onTick={tickItem}
				index={index}
				tick={item.ticked}
				key={index}
			/>
		);
	});

	return (
		<>
			<Header />

			<main className="flex flex-col items-center gap-8 w-full">
				<header className="flex items-center justify-center my-8">
					<h1 className="text-4xl text-color1 mr-4">{name}</h1>

					<button
						onClick={editTodoListName}
						className="
							flex items-center justify-center
							w-8 h-8 
							bg-[#FFD700] mr-4
					"
					>
						<Icon name="edit" width={24} height={24} />
					</button>

					<button
						onClick={deleteTodoList}
						className="
							flex items-center justify-center
                            w-8 h-8 
                            bg-[#FF0000]
                    "
					>
						<Icon name="delete" width={24} height={24} />
					</button>
				</header>

				<ol
					className="
                    flex flex-row justify-center flex-wrap 
                    w-full px-20 gap-8
                "
				>
					{itemElts}
				</ol>
			</main>

			<Footer />
		</>
	);
}

export default TodoList;
