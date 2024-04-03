import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const putItemTick = Router();

putItemTick.delete("/putItemTick", async (req, res) => {
	const id = req.query.id;
	const index = req.query.index;
	const ticked = req.body.ticked;

	if (typeof id !== "string" || typeof index !== "string") {
		res.status(400).json({
			reason: "Invalid query parameters",
			success: false,
		} as ErrorResponse);
		return;
	}

	if (typeof ticked !== "boolean") {
		res.status(400).json({
			reason: "Invalid body parameters",
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
