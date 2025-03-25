// src/routers/contacts.js

import express, { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {authenticate} from '../middlewares/authenticate.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  jsonParser,
  (req, res, next) => {
    req.body.userId = req.user.id.toString();
    next();
  },
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
