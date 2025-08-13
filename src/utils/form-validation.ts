import Joi from "joi";

const commonMessages = {
  "string.empty": "Bu alan boş olamaz",
  "any.required": "Bu alan zorunlu",
};

export const postBodySchema = Joi.object({
  first_name: Joi.string().trim().min(1).required().messages({
    ...commonMessages,
    "string.min": "Ad gerekli",
  }),
  last_name: Joi.string().trim().allow("").optional(),
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.email": "Geçersiz e-posta",
    "any.required": "E-posta gerekli",
  }),
  message: Joi.string().trim().min(1).required().messages({
    ...commonMessages,
  }),
})
  .unknown(false); // fazladan alanları reddet

export const putBodySchema = Joi.object({
  first_name: Joi.string().trim().min(1).required().messages({
    ...commonMessages,
    "string.min": "Ad gerekli",
  }),
  last_name: Joi.string().trim().allow("").optional(),
  email: Joi.string().trim().email().lowercase().required().messages({
    "string.email": "Geçersiz e-posta",
    "any.required": "E-posta gerekli",
  }),
  id: Joi.number().integer().positive().required().messages({
    "any.required": "ID gerekli",
    "number.base": "Geçerli bir ID girilmeli",
    "number.integer": "ID tam sayı olmalı",
    "number.positive": "ID pozitif olmalı",
  }),
})
  .unknown(false);

export const idSchema = Joi.number()
  .integer()
  .positive()
  .required()
  .messages({
    "any.required": "ID gerekli",
    "number.base": "Geçerli bir ID girilmeli",
    "number.integer": "ID tam sayı olmalı",
    "number.positive": "ID pozitif olmalı",
  });
