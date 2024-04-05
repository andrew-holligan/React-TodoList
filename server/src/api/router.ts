import { Router } from "express";

import deleteItem from "./endpoints/deleteItem";
import deleteTodoList from "./endpoints/deleteTodoList";
import getTodoList from "./endpoints/getTodoList";
import getTodoLists from "./endpoints/getTodoLists";
import postTodoList from "./endpoints/postTodoList";
import putItemTick from "./endpoints/putItemTick";
import putTodoListName from "./endpoints/putTodoListName";

const router = Router();

router.use(deleteItem);
router.use(deleteTodoList);
router.use(getTodoList);
router.use(getTodoLists);
router.use(postTodoList);
router.use(putItemTick);
router.use(putTodoListName);

export default router;
