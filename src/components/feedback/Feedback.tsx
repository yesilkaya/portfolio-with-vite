// frontend/ContactList.tsx

import React, { useState, useEffect } from "react";
import { ContactUser } from "../../types/user";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { message as antdMessage } from "antd";

export function FeedbackScreen() {
  const [contacts, setContacts] = useState<ContactUser[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactUser>({
    first_name: "",
    last_name: "",
    email: "",
    messages: [],
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:4000/api/feedback");
    const data = await res.json();
    setContacts(data);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:4000/api/feedback/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchContacts();
      antdMessage.success("🗑️ Başarıyla silindi");
    } else {
      antdMessage.error("🗑️ Silme Hatası");
    }
  };

  const handleUpdateClick = (user: ContactUser) => {
    setEditId(user.id!);
    setFormData({ ...user });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async () => {
    const res = await fetch(`http://localhost:4000/api/feedback/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setEditId(null);
      fetchContacts();
      alert("✅ Güncelleme başarılı");
    } else {
      alert(`❌ Güncelleme hatası: ${data.error}`);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        margin: "4rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "white" }}>Sizden Gelenler</h2>

      <ul
        style={{ listStyle: "none", padding: 0, maxWidth: 600, margin: "auto" }}
      >
        <Divider style={{ backgroundColor: "white" }} />

        {contacts.map((c) => (
          <li
            key={c.id}
            style={{
              backgroundColor: "white",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            {editId === c.id ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="İsim"
                />
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Soyisim"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-posta"
                />
                <button
                  onClick={handleSubmitUpdate}
                  style={{
                    marginTop: "0.5rem",
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    border: "none",
                    padding: "0.5rem",
                    borderRadius: "4px",
                  }}
                >
                  Gönder
                </button>
              </div>
            ) : (
              <>
                <strong>
                  {c.first_name} {c.last_name}
                </strong>{" "}
                — <span>{c.email}</span>
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <button onClick={() => handleUpdateClick(c)}>📝</button>
                  <button onClick={() => handleDelete(c.id!)}>🗑️</button>
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  {(c.messages || []).length > 0 ? (
                    (c.messages || []).map((msg) => (
                      <p
                        key={msg.id}
                        style={{
                          marginBottom: "0.5rem",
                          backgroundColor: "#f5f5f5",
                          padding: "0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.95rem",
                        }}
                      >
                        📩 {msg.content}
                        <br />
                        <span style={{ fontSize: "0.75rem", color: "#888" }}>
                          {new Date(msg.created_at).toLocaleString("tr-TR")}
                        </span>
                      </p>
                    ))
                  ) : (
                    <p style={{ color: "#888" }}>Henüz mesaj yok.</p>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
        <Divider style={{ backgroundColor: "white" }} />
        <Link
          to={`/#${"contact"}`}
          style={{
            marginTop: "0.5rem",
            backgroundColor: "var(--primary-color)",
            color: "white",
            border: "none",
            padding: "0.5rem",
            borderRadius: "4px",
            marginLeft: "14rem",
          }}
        >
          {"Yeni Mesaj Gönder"}
        </Link>
      </ul>
    </div>
  );
}
