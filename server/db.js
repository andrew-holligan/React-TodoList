import dotenv from "dotenv";
dotenv.config();

import { MongoClient, ObjectId } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vmsxqbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export class DB {
  static async getDocuments(collectionName, query = {}) {
    const client = new MongoClient(uri);

    try {
      await client.connect();

      const result = await client
        .db("react-todolist")
        .collection(collectionName)
        .find(query)
        .toArray();

      return result;
      
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  static async getDocument(collectionName, id) {
    return await this.getDocuments(collectionName, {
      _id: ObjectId.createFromHexString(id),
    }).then((result) => {
      return result[0];
    });
  }

  static async addDocument(collectionName, document) {
    const client = new MongoClient(uri);

    try {
      await client.connect();

      await client
        .db("react-todolist")
        .collection(collectionName)
        .insertOne(document);

    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  static async deleteTodoList(collectionName, id) {
    const client = new MongoClient(uri);

    const query = {
      _id: ObjectId.createFromHexString(id),
    };

    try {
      await client.connect();

      await client
        .db("react-todolist")
        .collection(collectionName)
        .deleteOne(query);

    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  static async deleteItem(collectionName, id, itemIndex) {
    const client = new MongoClient(uri);

    const query = {
      _id: ObjectId.createFromHexString(id),
    };

    try {
      await client.connect();

      await client
        .db("react-todolist")
        .collection(collectionName)
        .updateOne(query, { $unset: { [`items.${itemIndex}`]: 1 } });

      await client
        .db("react-todolist")
        .collection(collectionName)
        .updateOne(query, { $pull: { items: null } });

    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  static async setTick(collectionName, id, itemIndex, tick) {
    const client = new MongoClient(uri);

    const query = {
      _id: ObjectId.createFromHexString(id),
    };

    try {
      await client.connect();

      await client
        .db("react-todolist")
        .collection(collectionName)
        .updateOne(query, { $set: { [`items.${itemIndex}.ticked`]: tick } });

    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}
