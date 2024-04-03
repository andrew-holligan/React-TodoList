import { MongoClient } from "mongodb";

export interface ClientConnection {
	client: MongoClient;
	connected: boolean;
}

export class Mongo_DB {
	uri: string;
	dbName: string;
	collectionName: string;

	constructor({
		uri,
		dbName,
		collectionName,
	}: {
		uri: string;
		dbName: string;
		collectionName: string;
	}) {
		this.uri = uri;
		this.dbName = dbName;
		this.collectionName = collectionName;
	}

	async getClient(): Promise<ClientConnection> {
		const client = new MongoClient(this.uri);

		try {
			await client.connect();

			return <ClientConnection>{
				client: client,
				connected: true,
			};
		} catch (error: any) {
			console.error(error);

			return <ClientConnection>{
				client: client,
				connected: false,
			};
		}
	}

	getCollection(client: MongoClient) {
		return client.db(this.dbName).collection(this.collectionName);
	}
}
