import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;
const collectionName = process.env.MONGODB_COLLECTION_NAME;
