import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const deleteItem = Router();

deleteItem.delete("/deleteItem", async (req, res) => {
	console.log("DELETE /api/deleteItem");

	const id = req.query.id;
	const index = req.query.index;

	if (typeof id !== "string" || typeof index !== "string") {
		console.error("Invalid query parameters");
		res.status(400).json(<ErrorResponse>{
			reason: "Invalid query parameters",
			success: false,
		});
		return;
	}

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
	const identifier = { _id: ObjectId.createFromHexString(id) };
	const collection = db.getCollection(client.client);
	await collection.updateOne(identifier, [
		{
			$set: {
				["items"]: {
					$concatArrays: [
						{
							$slice: [`$${"items"}`, parseInt(index, 10)],
						},
						{
							$slice: [
								`$${"items"}`,
								parseInt(index, 10) + 1,
								{
									$size: `$${"items"}`,
								},
							],
						},
					],
				},
			},
		},
	]);

	client.client.close();

	res.status(200).json(<SuccessResponse<boolean>>{
		data: true,
		success: true,
	});
});

export default deleteItem;
