import { Router, Response } from "express";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { TodoList } from "../../../../shared/types/general";
import { auth, RequestWithJWT } from "../auth/auth";
import { db } from "../../index";

const getTodoLists = Router();

getTodoLists.get(
	"/getTodoLists",
	auth,
	async (req: RequestWithJWT, res: Response) => {
		console.log("GET /api/getTodoLists");

		const client = await db.getClient();

		if (!client.connected) {
			console.error("Database client failed to connect");
			res.status(500).json(<ErrorResponse>{
				reason: "Database client failed to connect",
				success: false,
			});
			return;
		}

		// DB CODE
		const collection = db.getCollection(
			client.client,
			process.env.MONGODB_TODOLIST_COLLECTION_NAME!
		);
		const result = await collection.find({ uid: req.userId }).toArray();

		client.client.close();

		res.status(200).json(<SuccessResponse<TodoList[]>>{
			data: <TodoList[]>(<unknown>result),
			success: true,
		});
	}
);

export default getTodoLists;
