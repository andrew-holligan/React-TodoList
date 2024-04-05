import { Router } from "express";

import postLogin from "./auth/postLogin";
import postRegister from "./auth/postRegister";
import getLogout from "./auth/getLogout";

const routerAuth = Router();

routerAuth.use(postLogin);
routerAuth.use(postRegister);
routerAuth.use(getLogout);

export default routerAuth;
