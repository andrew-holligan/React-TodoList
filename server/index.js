import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://***REMOVED***:***REMOVED***@cluster0.vmsxqbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
