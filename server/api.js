import { express } from "express";

import { DB } from "./db.js";

const COLLECTION_NAME = "todolists";

const app = express();

// 'home' route
app
  .route("/")
  // GET request
  // get all todolists
  .get((req, res) => {
    const todolists = DB.getDocuments(COLLECTION_NAME);
    res.json(todolists);
  });

// 'create' route
app
  .route("/create")
  // POST request
  // create a new todolist
  .post((req, res) => {
    const todolist = req.body;
    DB.addDocument(COLLECTION_NAME, todolist);
    res.json(todolist);
  });
