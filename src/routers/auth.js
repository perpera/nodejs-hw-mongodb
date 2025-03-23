// src/routers/auth.js

import express, { Router } from "express";
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import {validateBody} from '../middlewares/validateBody.js';
import {registerUserSchema, loginUserSchema} from '../validation/auth.js';
import {registerUserController, loginUserController, refreshUsersSessionController, logoutUserController} from '../controllers/auth.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
