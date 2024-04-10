import { MongoClient } from "mongodb";

export class mongoDB {
	uri: string;
	dbName: string;

	constructor(uri: string, dbName: string) {
		this.uri = uri;
		this.dbName = dbName;
	}

	async getClient(): Promise<MongoClient | null> {
		const client = new MongoClient(this.uri);

		try {
			await client.connect();
			return client;
		} catch (error: any) {
			console.error(error);
			return null;
		}
	}

	getCollection(client: MongoClient, collectionName: string) {
		return client.db(this.dbName).collection(collectionName);
	}
}
