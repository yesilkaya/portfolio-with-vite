import "dotenv/config";
import { createConnection } from "mysql2/promise";
import { messages } from "../../shared/messages/Messages.js";

export const db = await (async () => {
  try {
    const serverConn = await createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    await serverConn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await serverConn.end();
    console.log(messages.db.created(process.env.DB_NAME ?? ""));

    const conn = await createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: process.env.DB_NAME,
    });

    await conn.beginTransaction();

    await conn.execute(`
        CREATE TABLE IF NOT EXISTS contact (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100),
          email VARCHAR(255) NOT NULL UNIQUE
        );
      `);

    await conn.execute(`
        CREATE TABLE IF NOT EXISTS messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          contact_id INT NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE CASCADE
        );
      `);

    await conn.commit();
    console.log(messages.db.tables_created);
    return conn;
  } catch (err) {
    console.error(messages.db.error, err);
    process.exit(1);
  }
})();
