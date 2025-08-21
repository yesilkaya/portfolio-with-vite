import * as ContactModel from "../models/contact.models.js";
export async function getContacts(req, res) {
    const contacts = await ContactModel.getAllContacts();
    res.json(contacts);
}
export async function createContact(req, res) {
    const id = await ContactModel.createContact(req.body);
    res.status(201).json({ id });
}
export async function updateContact(req, res) {
    const success = await ContactModel.updateContact(Number(req.params.id), req.body);
    if (!success)
        return res.status(404).json({ error: "Contact not found" });
    res.json({ success: true });
}
export async function deleteContact(req, res) {
    const success = await ContactModel.deleteContact(Number(req.params.id));
    if (!success)
        return res.status(404).json({ error: "Contact not found" });
    res.json({ success: true });
}
//# sourceMappingURL=contact.controller.js.map