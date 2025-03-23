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
import {checkUser} from '../middlewares/checkUser.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.use(authenticate);
router.use(checkUser);

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
