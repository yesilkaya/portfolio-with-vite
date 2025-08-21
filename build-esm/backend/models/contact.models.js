import { db } from "../config/db.js";
export async function getAllContacts() {
    const [rows] = await db.query(`
    SELECT 
      c.id,
      c.first_name,
      c.last_name,
      c.email,
      IFNULL(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', m.id,
            'content', m.content,
            'created_at', m.created_at
          )
        ), JSON_ARRAY()
      ) AS messages
    FROM contact c
    LEFT JOIN messages m ON c.id = m.contact_id
    GROUP BY c.id
    ORDER BY c.id DESC
    `);
    return rows;
}
export async function createContact(data) {
    let txStarted = false;
    try {
        const { first_name, last_name, email, message } = data;
        const [rows] = await db.execute("SELECT id FROM contact WHERE email = ?", [email]);
        const existing = rows[0];
        let contactId;
        if (existing) {
            contactId = existing.id;
        }
        else {
            await db.beginTransaction();
            txStarted = true;
            const result = (await db.execute(`INSERT INTO contact (first_name, last_name, email) VALUES (?, ?, ?)`, [first_name, last_name, email]));
            contactId = result[0].insertId;
        }
        await db.execute("INSERT INTO messages (contact_id, content) VALUES (?, ?)", [contactId, message]);
        if (!existing)
            await db.commit();
        txStarted = false;
        return { id: contactId };
    }
    catch (err) {
        if (txStarted) {
            try {
                await db.rollback();
            }
            catch { }
        }
        throw err;
    }
}
export async function updateContact(id, contact) {
    const [result] = await db.query("UPDATE contact SET first_name=?, last_name=?, email=? WHERE id=?", [
        contact.first_name,
        contact.last_name,
        contact.email,
        id,
    ]);
    return result.affectedRows > 0;
}
export async function deleteContact(id) {
    const [result] = await db.query("DELETE FROM contact WHERE id=?", [id]);
    return result.affectedRows > 0;
}
//# sourceMappingURL=contact.models.js.map