/*import { ContactData } from "../types/contact.js"; 
import { db} from "./db.js";

export function insertContactToDB(data: ContactData): Promise<number> {
    const { firstName, lastName, email, message } = data;
  
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO contact (first_name, last_name, email, message)
         VALUES (?, ?, ?, ?)`,
        [firstName, lastName, email, message],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID); 
          }
        }
      );
    });
  }
  */
  /*
  export function getAllContacts(): Promise<ContactData[]> {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM contact`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as ContactData[]); 
      });
    });
  }
  */

  import { ContactData } from "../types/contact.js";

  export const postNewFeedback = async (data: ContactData) => {
    const { firstName, lastName, email, message } = data;
  
    try {
      const response = await fetch("http://localhost:4000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          message,
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("Hata:", result.message || "Bilinmeyen hata");
        alert("❌ Kayıt eklenemedi!");
        return;
      }
  
      console.log("✅ Yeni kullanıcı eklendi, ID:", result.id);
      alert("✅ Geri bildirim başarıyla eklendi!");
    } catch (error) {
      console.error("Sunucu hatası:", error);
      alert("❌ Sunucuya ulaşılamıyor.");
    }
  };
  
  