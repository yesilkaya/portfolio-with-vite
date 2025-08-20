// src/controllers/contact.controller.ts
import { Request, Response, NextFunction } from "express";
import * as contactService from "../services/contact.service.js";
import { messages } from "../messages/Messages.js";

export async function getContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await contactService.getAllContacts();

    res.status(200).json(rows);
  } catch (err) {
    next({ status: 500, message: messages.get.contacts_error, details: err });
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
    next({ status: 500, message: messages.post.create_error , details: err });
  }
}

export async function updateContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { first_name, last_name, email } = req.body;

    const affectedRows = await contactService.updateContact(id, first_name, last_name, email);

    if (affectedRows === 0) {
      return next({ status: 404, message: messages.common.not_found });
    }

    res.status(200).json({ message: messages.put.update_success });
  } catch (err: any) {
    if (err?.code === "ER_DUP_ENTRY") {
      return next({ status: 409, message: messages.put.update_conflict });
    }
    next({ status: 500, message: messages.put.update_error });
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    const affectedRows = await contactService.deleteContact(id);

    if (affectedRows === 0) {
      return next({ status: 404, message: messages.common.not_found });
    }

    res.status(200).json({ message: messages.delete.delete_success });
  } catch (err) {
    next({ status: 500, message: messages.delete.delete_error });
  }
}
