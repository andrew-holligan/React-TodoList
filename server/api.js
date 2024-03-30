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

// 'delete' route
app
  // DELETE request
  // delete a specific todolist
  .delete("/todolist/:id", (req, res) => {
    console.log("DELETE /todolist/:id");

    const id = req.params.id;
    DB.deleteTodoList(COLLECTION_NAME, id).then(() => {
      res.sendStatus(200);
    });
  });

// 'delete' route
app
  // DELETE request
  // delete a specific item
  .delete("/todolist/:id/:itemIndex", (req, res) => {
    console.log("DELETE /todolist/:id/:index (ITEM)");

    const id = req.params.id;
    const itemIndex = req.params.itemIndex;
    DB.deleteItem(COLLECTION_NAME, id, itemIndex).then(() => {
      res.sendStatus(200);
    });
  });

// 'tick' route
app
  // POST request
  // set tick of specific item in a specific todolist
  .post("/todolist/:id/:itemIndex", (req, res) => {
    console.log("POST /todolist/:id/:itemIndex (TICK)");

    const id = req.params.id;
    const itemIndex = req.params.itemIndex;
    const { tick } = req.body;

    DB.setTick(COLLECTION_NAME, id, itemIndex, tick).then(() => {
      res.sendStatus(200);
    });
  });

export default app;
