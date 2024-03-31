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
  .get("/", cors(), (req, res) => {
    console.log("GET /" + " (GET TODOLISTS)");

    DB.getDocuments(COLLECTION_NAME).then((result) => {
      res.json(result);
    });
  });

// 'create' route
app
  // POST request
  // create a new todolist
  .post("/create", cors(), (req, res) => {
    const todolist = req.body;

    console.log("POST /create " + todolist.name + " (CREATE TODOLIST)");

    DB.addDocument(COLLECTION_NAME, todolist).then((success) => {
      if (success) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  });

// 'todolist' route
app
  // GET request
  // get a specific todolist
  .get("/todolist/:id", cors(), (req, res) => {
    const id = req.params.id;

    console.log("GET /todolist/" + id + " (GET TODOLIST)");

    DB.getDocument(COLLECTION_NAME, id).then((result) => {
      res.json(result);
    });
  });

// 'delete' route
app
  // DELETE request
  // delete a specific todolist
  .delete("/todolist/:id", cors(), (req, res) => {
    const id = req.params.id;

    console.log("DELETE /todolist/" + id + " (DELETE TODOLIST)");

    DB.deleteTodoList(COLLECTION_NAME, id).then((success) => {
      if (success) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  });

// 'delete' route
app
  // DELETE request
  // delete a specific item
  .delete("/todolist/:id/:itemIndex", cors(), (req, res) => {
    const id = req.params.id;
    const itemIndex = req.params.itemIndex;

    console.log("DELETE /todolist/" + id + "/" + itemIndex + " (DELETE ITEM)");

    DB.deleteItem(COLLECTION_NAME, id, itemIndex).then((success) => {
      if (success) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  });

// 'tick' route
app
  // POST request
  // set tick of specific item in a specific todolist
  .post("/todolist/:id/:itemIndex", cors(), (req, res) => {
    const id = req.params.id;
    const itemIndex = req.params.itemIndex;
    const { tick } = req.body;

    console.log("POST /todolist/" + id + "/" + itemIndex + " (TICK)");

    DB.setTick(COLLECTION_NAME, id, itemIndex, tick).then((success) => {
      if (success) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  });

export default app;
