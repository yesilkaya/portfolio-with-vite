// src/controllers/contact.controller.ts
import { Request, Response, NextFunction } from "express";
import * as contactService from "../services/contact.service.js";
import { messages } from "../messages/Messages.js";

export async function getContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await contactService.getAllContacts();

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Vary", "Origin, Authorization");

    res.status(200).json(rows);
  } catch (err) {
    console.error("GET /contacts hatası:", err);
    next({ status: 500, message: messages.get.contacts_error });
  }
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await contactService.createContact(req.body);
    res.status(201).json({
      message: messages.post.create_success,
      id: result.id,
    });
  } catch (err) {
    console.error("POST /contacts hatası:", err);
    next({ status: 500, message: messages.post.create_error });
  }
}

export async function updateContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { first_name, last_name, email } = req.body;

    const affectedRows = await contactService.updateContact(id, first_name, last_name, email);

    if (affectedRows === 0) {
      return res.status(404).json({ error: messages.common.not_found });
    }

    return res.status(200).json({ message: messages.put.update_success });
  } catch (err: any) {
    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: messages.put.update_conflict });
    }
    console.error("Güncelleme hatası:", err);
    return res.status(500).json({ error: messages.put.update_error });
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    const affectedRows = await contactService.deleteContact(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: messages.common.not_found });
    }

    return res.status(200).json({ message: messages.delete.delete_success });
  } catch (err: any) {
    return res.status(500).json({ error: messages.delete.delete_error });
  }
}
