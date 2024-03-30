import express from "express";
import cors from "cors";

import { DB } from "./db.js";

const COLLECTION_NAME = "todolists";

const app = express();
app.use(cors());
app.use(express.json());
app.options("*", cors());

// 'home' route
app
  // GET request
  // get all todolists
  .get("/", (req, res) => {
    console.log("GET /");

    DB.getDocuments(COLLECTION_NAME).then((result) => {
      res.json(result);
    });
  });

// 'create' route
app
  // POST request
  // create a new todolist
  .post("/create", (req, res) => {
    console.log("POST /create");

    const todolist = req.body;
    DB.addDocument(COLLECTION_NAME, todolist).then(() => {
      res.sendStatus(200);
    });
  });

// 'todolist' route
app
  // GET request
  // get a specific todolist
  .get("/todolist/:id", (req, res) => {
    console.log("GET /todolist/:id");

    const id = req.params.id;
    DB.getDocument(COLLECTION_NAME, id).then((result) => {
      console.log(result);
      res.json(result);
    });
  });

export default app;
