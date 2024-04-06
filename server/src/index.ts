import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT!;
const clientOrigins = process.env.CLIENT_ORIGIN!.split(",");
const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME!;

import { Mongo_DB } from "./db/mongo-db";

export const db = new Mongo_DB({
	uri: uri,
	dbName: dbName,
});

import routerApi from "./routing/routerApi";
import routerAuth from "./routing/routerAuth";

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
	cors({
		origin: clientOrigins,
		credentials: true,
	})
);

app.use("/api", routerApi);
app.use("/auth", routerAuth);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
