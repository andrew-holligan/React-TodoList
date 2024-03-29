import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://***REMOVED***:***REMOVED***@cluster0.vmsxqbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

export class DB {
  static async getDocuments(collectionName) {
    try {
      await client.connect();
      const db = client.db("react-todolist");
      const collection = db.collection(collectionName);
      const result = collection.find({});
      return result;
    } finally {
      await client.close();
    }
  }

  static async getDocument(collectionName, query) {
    try {
      await client.connect();
      const db = client.db("react-todolist");
      const collection = db.collection(collectionName);
      const result = collection.find(query);
      return result;
    } finally {
      await client.close();
    }
  }

  static async addDocument(collectionName, document) {
    try {
      await client.connect();
      const db = client.db("react-todolist");
      const collection = db.collection(collectionName);
      collection.insertOne(document);
    } finally {
      await client.close();
    }
  }
}
