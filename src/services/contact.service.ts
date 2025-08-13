// src/services/contact.service.ts
import { db } from "../api/db.js";
import { ResultSetHeader } from "mysql2/promise";
import { FormData } from "../types/user.js";

export async function getAllContacts() {
  const [rows] = await db.query(`
    SELECT c.*, 
           IFNULL(
             JSON_ARRAYAGG(
               JSON_OBJECT('id', m.id, 'content', m.content, 'created_at', m.created_at)
             ),
             JSON_ARRAY()
           ) AS messages
    FROM contact c
    LEFT JOIN messages m ON c.id = m.contact_id
    GROUP BY c.id
    ORDER BY c.id DESC
  `);
  return rows;
}

export async function createContact(data: FormData) {
  let txStarted = false;
  try {
    const { first_name, last_name, email, message } = data;

    const [rows] = await db.execute("SELECT id FROM contact WHERE email = ?", [email]);
    const existing = (rows as any[])[0];

    let contactId: number;
    if (existing) {
      contactId = existing.id;
    } else {
      await db.beginTransaction();
      txStarted = true;

      const result = (await db.execute(
        `INSERT INTO contact (first_name, last_name, email) VALUES (?, ?, ?)`,
        [first_name, last_name, email]
      )) as [ResultSetHeader, any];

      contactId = result[0].insertId;
    }

    await db.execute("INSERT INTO messages (contact_id, content) VALUES (?, ?)", [contactId, message]);

    if (!existing) await db.commit();
    txStarted = false;

    return { id: contactId };
  } catch (err) {
    if (txStarted) {
      try {
        await db.rollback();
      } catch {}
    }
    throw err;
  }
}


export async function updateContact(id: number, first_name: string, last_name: string, email: string) {
    const [result] = (await db.execute(
      `UPDATE contact SET first_name = ?, last_name = ?, email = ? WHERE id = ?`,
      [first_name, last_name, email, id]
    )) as [ResultSetHeader, any];
  
    return result.affectedRows;
  }

  export async function deleteContact(id: number) {
    const [result] = (await db.execute(
      `DELETE FROM contact WHERE id = ?`,
      [id]
    )) as [ResultSetHeader, any];
  
    return result.affectedRows;
  }