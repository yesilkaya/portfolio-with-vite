import { db } from "./db.js";
export function insertContactToDB(data) {
    const { firstName, lastName, email, message } = data;
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO contact (first_name, last_name, email, message)
         VALUES (?, ?, ?, ?)`, [firstName, lastName, email, message], function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(this.lastID); // Eklenen satırın ID'si
            }
        });
    });
}
//# sourceMappingURL=sqliteUtils.js.map