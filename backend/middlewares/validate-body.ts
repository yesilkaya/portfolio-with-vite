// src/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";
import { postBodySchema, putBodySchema } from "../utils/form-validation.js";

// POST /contacts -> sadece body
export function validatePost(req: Request, res: Response, next: NextFunction) {
  const { error } = postBodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// PUT /contacts/:id -> body + params.id (şema id’yi bekliyor)
export function validatePut(req: Request, res: Response, next: NextFunction) {
  const payload = { ...req.body, id: Number(req.params.id) };
  const { error } = putBodySchema.validate(payload, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// DELETE /contacts/:id -> sadece params.id
export function validateDelete(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Geçersiz ID" });
  }
  next();
}
