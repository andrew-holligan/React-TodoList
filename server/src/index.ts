// DEPENDENCIES

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

// ENV variables

const port = process.env.PORT;
const clientOriginsStr = process.env.CLIENT_ORIGIN;
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!port || !clientOriginsStr || !uri || !dbName) {
	throw new Error("Missing environment variables");
}

const clientOrigins = clientOriginsStr.split(",");

// DB

import { mongoDB } from "./db/mongo-db";

export const db = new mongoDB(uri, dbName);

// EXPRESS

import routerApi from "./routing/routerApi";
import routerAuth from "./routing/routerAuth";

const app = express();

app.use(express.json());
app.use(cookieParser());
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
