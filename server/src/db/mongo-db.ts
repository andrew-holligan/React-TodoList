import { MongoClient } from "mongodb";

interface ClientConnection {
	client: MongoClient;
	connected: boolean;
}

export class MONGO_DB {
	uri: string;
	collectionName: string;

	constructor({
		uri,
		collectionName,
	}: {
		uri: string;
		collectionName: string;
	}) {
		this.uri = uri;
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
}
