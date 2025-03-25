// src/validation/contacts.js

import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Please enter a valid phone number (e. g. +38 (098) 123-4567)',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string()
    .email()
    .messages({ 'string.email': 'Please enter a valid email address' }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': "Choose one type for the contact: 'work', 'home', 'personal'",
      'any.required': 'Contact type is required',
    }),
    userId: Joi.string().required().custom((value, helper) => {if (value && !isValidObjectId(value)){
      return helper.message('User id should be a valid mongo id');
    }
  return value;}),
  isFavourite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(
    /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
  ),
  email: Joi.string().email().max(50),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  isFavourite: Joi.boolean(),
})
  .or('name', 'phoneNumber', 'email', 'contactType', 'isFavourite')
  .messages({
    'object.missing': 'Please change at least one field for the update',
  });
