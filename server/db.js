import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://***REMOVED***:***REMOVED***@cluster0.vmsxqbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export class DB {
  static async getDocuments(collectionName) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const result = await client
        .db("react-todolist")
        .collection(collectionName)
        .find({})
        .toArray();
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  static async getDocument(collectionName, query) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db("react-todolist");
      const collection = db.collection(collectionName);
      const result = collection.find(query);
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  static async addDocument(collectionName, document) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db("react-todolist");
      const collection = db.collection(collectionName);
      await collection.insertOne(document);
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}
