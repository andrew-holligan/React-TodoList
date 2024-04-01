import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./views/HomePage.tsx";
import CreatePage from "./views/CreatePage.tsx";
import TodoListPage from "./views/TodoListPage.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePage />} />
				<Route path="/todolist/:id" element={<TodoListPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
