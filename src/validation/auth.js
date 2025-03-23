// src/validation/auth.js

import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Username should have at most {#limit} characters',
        'any.required': 'Username is required'}),
    email: Joi.string().email().required().messages({ 'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
     }),
    password: Joi.string().required().messages({'any.required': 'Password is required'}),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({ 'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
     }),
  password: Joi.string().required().messages({'any.required': 'Password is required'}),
});
