import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./views/Index.tsx";
import Create from "./views/Create.tsx";
import TodoList from "./views/TodoList.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";
import Logout from "./views/Logout.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				{/* API */}
				<Route path="/" element={<Index />} />
				<Route path="/create" element={<Create />} />
				<Route path="/todolist/:id" element={<TodoList />} />
				{/* AUTH */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
