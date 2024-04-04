import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const putItemTick = Router();

putItemTick.put("/putItemTick", async (req, res) => {
	console.log("PUT /api/putItemTick");

	const id = req.query.id;
	const index = req.query.index;
	const ticked = req.body.ticked;

	if (typeof id !== "string" || typeof index !== "string") {
		console.error("Invalid query parameters");
		res.status(400).json({
			reason: "Invalid query parameters",
			success: false,
		} as ErrorResponse);
		return;
	}

	if (typeof ticked !== "boolean") {
		console.error("Invalid body parameters");
		res.status(400).json({
			reason: "Invalid body parameters",
			success: false,
		} as ErrorResponse);
		return;
	}

	const client = await db.getClient();

	if (!client.connected) {
		console.error("Database client failed to connect");
		res.status(500).json({
			reason: "Database client failed to connect",
			success: false,
		} as ErrorResponse);
		return;
	}

	// DB CODE
	const identifier = { _id: ObjectId.createFromHexString(id) };
	const collection = db.getCollection(client.client);
	await collection.updateOne(identifier, {
		$set: { [`items.${index}.ticked`]: ticked },
	});

	client.client.close();

	res.status(200).json({
		data: true,
		success: true,
	} as SuccessResponse<boolean>);
});

export default putItemTick;
