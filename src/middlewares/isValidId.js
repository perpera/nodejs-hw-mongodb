// src/middlewares/isValidId.js

import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { studentId } = req.params;
  if (!isValidObjectId(studentId)) {
    return next(createHttpError(400, 'Bad Request'));
  }
  next();
};
