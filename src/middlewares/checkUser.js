// src/middlewares/checkUser.js

import createHttpError from "http-errors";
import {ContactsCollection} from '../db/models/contacts.js';

export const checkUser = async (req, res, next) => {
    const { user } = req;

    if (!user) {
      return next(createHttpError(401, 'Authentication error'));
    }

    const { contactId } = req.params;

    if (contactId) {
      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
      });

      if (!contact) {
        return next(createHttpError(403, 'Forbidden'));
      }}

    next();
  };
