import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./views/Index.tsx";
import Create from "./views/Create.tsx";
import TodoList from "./views/TodoList.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="/create" element={<Create />} />
				<Route path="/todolist/:id" element={<TodoList />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
