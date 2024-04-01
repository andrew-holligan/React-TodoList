import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { API } from "../util/api.ts";
import type { ItemType } from "../util/types.ts";

import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Item from "../components/Item.tsx";
import Icon from "../components/Icon.tsx";

function TodoListPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [name, setName] = useState<string>("");
	const [items, setItems] = useState<ItemType[]>([]);

	// PAGE LOAD

	useEffect(() => {
		API.getTodoList(id!).then((data) => {
			setName(data.name);
			setItems(data.items);
		});
	}, []);

	// HANDLERS

	function deleteTodoList() {
		API.deleteTodoList(id!).then((success) => {
			if (!success) {
				alert("Error - Failed to delete todo list!");
				return;
			}
			navigate("/");
		});
	}

	function deleteItem(index: number) {
		const newItems = items.filter((item, i) => i !== index);
		API.deleteItem(id!, index).then((success) => {
			if (!success) {
				alert("Error - Failed to delete item!");
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
		API.setItemTick(id!, index, newItems[index].ticked).then((success) => {
			if (!success) {
				alert("Error - Failed to update item tick status!");
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

export default TodoListPage;
