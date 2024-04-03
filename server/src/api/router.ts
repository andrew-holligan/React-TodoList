import { Router } from "express";

import deleteItem from "./endpoints/deleteItem";
import deleteTodoList from "./endpoints/deleteTodoList";
import getTodoList from "./endpoints/getTodoList";
import getTodoLists from "./endpoints/getTodoLists";
import postTodoList from "./endpoints/postTodoList";
import putItemTick from "./endpoints/putItemTick";

const router = Router();

router.use(deleteItem);
router.use(deleteTodoList);
router.use(getTodoList);
router.use(getTodoLists);
router.use(postTodoList);
router.use(putItemTick);

export default router;
