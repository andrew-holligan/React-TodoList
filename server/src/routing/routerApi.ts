import { Router } from "express";

import deleteItem from "./api/deleteItem";
import deleteTodoList from "./api/deleteTodoList";
import getTodoList from "./api/getTodoList";
import getTodoLists from "./api/getTodoLists";
import postTodoList from "./api/postTodoList";
import putItemTick from "./api/putItemTick";
import putTodoListName from "./api/putTodoListName";

const routerApi = Router();

routerApi.use(deleteItem);
routerApi.use(deleteTodoList);
routerApi.use(getTodoList);
routerApi.use(getTodoLists);
routerApi.use(postTodoList);
routerApi.use(putItemTick);
routerApi.use(putTodoListName);

export default routerApi;
