import Joi from "joi";
export const postBodySchema = Joi.object({
    first_name: Joi.string().min(1).required().messages({
        "string.empty": "Ad gerekli",
        "any.required": "Ad gerekli",
    }),
    last_name: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        "string.email": "Geçersiz e-posta",
        "any.required": "E-posta gerekli",
    }),
    message: Joi.string().min(1).required().messages({
        "string.empty": "Mesaj boş olamaz",
        "any.required": "Mesaj boş olamaz",
    }),
});
export const putBodySchema = Joi.object({
    first_name: Joi.string().min(1).required().messages({
        "string.empty": "Ad gerekli",
        "any.required": "Ad gerekli",
    }),
    last_name: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        "string.email": "Geçersiz e-posta",
        "any.required": "E-posta gerekli",
    }),
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
        "any.required": "ID gerekli",
        "number.base": "Geçerli bir ID girilmeli",
        "number.integer": "ID tam sayı olmalı",
        "number.positive": "ID pozitif olmalı",
    }),
});
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
//# sourceMappingURL=form-validation.js.map