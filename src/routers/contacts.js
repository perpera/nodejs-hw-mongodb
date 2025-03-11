// src/routers/contacts.js

import { express, Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(patchContactController),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
