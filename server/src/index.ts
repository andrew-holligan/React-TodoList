import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT!;
const uri = process.env.MONGODB_URI!;
const collectionName = process.env.MONGODB_COLLECTION_NAME!;
const dbName = process.env.MONGODB_DB_NAME!;

import { Mongo_DB } from "./db/mongo-db";

export const db = new Mongo_DB({
	uri: uri,
	dbName: dbName,
	collectionName: collectionName,
});

import router from "./api/router";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
