// src/middlewares/isValidId.js

import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (isValidObjectId(contactId) !== true) {
    return next(new createHttpError.BadRequest('ID is not valid'));
  }

  next();
};
