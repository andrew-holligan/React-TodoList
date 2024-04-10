import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePostTodoList } from "../routing/api/usePostTodoList.ts";
import { useAuth } from "../routing/auth/useAuth.ts";
import { Item as ItemType } from "../../../shared/types/todolist.ts";

import Header from "../components/Header.tsx";
import Loading from "../components/Loading.tsx";
import UserHeader from "../components/UserHeader.tsx";
import Footer from "../components/Footer.tsx";
import Item from "../components/Item.tsx";
import Icon from "../components/Icon.tsx";

function Create() {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [items, setItems] = useState<ItemType[]>([]);

	// PAGE LOAD

	useEffect(() => {
		useAuth().then((res) => {
			if (!res.success) {
				navigate("/login");
				return;
			}

			setUsername(res.data);
		});
	}, []);

	useAuth().then((res) => {
		if (!res.success) {
			navigate("/login");
		}
	});

	// HANDLERS

	function addItem() {
		const item = (
			document.getElementById("item") as HTMLInputElement
		).value.trim();

		// check for empty input
		if (!item) return;

		// check for duplicate item
		if (items.some((itemO) => itemO.value === item)) {
			alert("Item already exists!");
			return;
		}

		(document.getElementById("item") as HTMLInputElement).value = "";

		setItems([...items, { value: item, ticked: false }]);
	}

	function deleteItem(index: number) {
		const newItems = items.splice(index, 1);

		setItems(newItems);
	}

	function tickItem(index: number) {
		const newItems = items.map((item, i) => {
			if (i === index) {
				item.ticked = !item.ticked;
			}
			return item;
		});

		setItems(newItems);
	}

	function create() {
		const name = (
			document.getElementById("name") as HTMLInputElement
		).value.trim();

		// validation
		if (!name) {
			alert("Name is required!");
			return;
		}
		if (items.length === 0) {
			alert("Items are required!");
			return;
		}

		usePostTodoList(name, items).then((res) => {
			if (!res.success) {
				alert(res.reason);
				return;
			}
			navigate("/");
		});
	}

	// RENDER

	if (!username) {
		return <Loading />;
	}

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

			<UserHeader username={username} />

			<main className="flex flex-col items-center gap-8 w-full">
				<div
					className="
                    flex flex-col items-center 
                    gap-2
                "
				>
					<h3 className="text-xl text-color4">Give it a Name!</h3>

					<input
						type="text"
						id="name"
						placeholder="name"
						className="
                            w-80 h-12 
                            border-2 border-solid border-color1 
                            text-color1 px-4
                    "
					/>
				</div>

				<div
					className="
                    flex flex-col items-center 
                    gap-2 w-full
                "
				>
					<h3 className="text-xl text-color4">Add your Items!</h3>

					<div className="flex justify-between w-80">
						<input
							type="text"
							id="item"
							placeholder="item"
							className="
                                w-50 h-12 
                                border-2 border-solid border-color1 
                                text-color1 px-4
                        "
						/>

						<button
							id="btn-add"
							onClick={() => addItem()}
							className="
                                flex justify-center items-center
                                w-20 h-12 
                                bg-color1 hover:bg-color2
                        "
						>
							<Icon name="add" width={24} height={24} />
						</button>
					</div>
				</div>

				<ol
					className="
                    flex flex-row justify-center flex-wrap 
                    w-full px-20 gap-8
                "
				>
					{itemElts}
				</ol>

				<button
					id="btn-create"
					onClick={create}
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
	);
}

export default Create;
