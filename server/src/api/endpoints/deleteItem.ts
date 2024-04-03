import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const deleteItem = Router();

deleteItem.delete("/deleteItem", async (req, res) => {
	const id = req.query.id;
	const index = req.query.index;

	if (typeof id !== "string" || typeof index !== "string") {
		res.status(400).json({
			reason: "Invalid query parameters",
			success: false,
		} as ErrorResponse);
		return;
	}

	const client = await db.getClient();

	if (!client.connected) {
		res.status(500).json({
			reason: "Database client failed to connect",
			success: false,
		} as ErrorResponse);
		return;
	}

	// DB CODE
	const identifier = { _id: ObjectId.createFromHexString(id) };
	const collection = db.getCollection(client.client);
	// taken from https://stackoverflow.com/questions/72512842/removing-an-element-in-a-mongodb-array-based-on-the-position-of-element-with-dyn
	collection.updateOne(identifier, [
		{
			$set: {
				["items"]: {
					$concatArrays: [
						{
							$slice: [`$${"items"}`, index],
						},
						{
							$slice: [
								`$${"items"}`,
								index + 1,
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

	res.status(200).json({
		data: true,
		success: true,
	} as SuccessResponse<boolean>);
});

export default deleteItem;
