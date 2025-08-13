import React, { useState, useEffect } from "react";
import { ContactUser } from "../../types/user";
import { Link } from "react-router-dom";
import { Divider, Modal, Input,  Card } from "antd";
import { CONTACTS_URL } from "../../types/urls";
import { messages } from "../../messages/Messages";
import { getAuthHeader, clearAuthHeader } from "../../auth/credentials";
import { doLoginRequest } from "../../api/db-login";


export function FeedbackScreen() {
  const [contacts, setContacts] = useState<ContactUser[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactUser>({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [adminMode, setAdminMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  
  const doLogin = async () => {
    setLoginLoading(true);
    const result = await doLoginRequest(username, password);
  
    if (result.success) {
      setAdminMode(true); // ✅ Önce adminMode aç
      setLoginOpen(false);
      setUsername("");
      setPassword("");
      await fetchContacts();
    } else {
      alert(result.message);
    }
  
    setLoginLoading(false);
  };
  

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdminLogin = () => {
    setLoginOpen(true);
  };

  const handleLogout = async () => {
    try {
      clearAuthHeader();
      setAdminMode(false);
      setContacts([]);
      window.location.replace("/feedback");
    } catch {}
  };

    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(CONTACTS_URL, {
          headers: { ...getAuthHeader() },
          credentials: "omit",
          cache: "no-store",
        });
    
        if (res.status === 401) {
          setAdminMode(false);
          setContacts([]);
          return;
        }
    
        if (!res.ok) {
          throw new Error("List fetch failed");
        }
    
        const raw = await res.json();
        const list = Array.isArray(raw) ? raw : [];
        const normalized = list.map((c) => ({
          ...c,
          messages: typeof c.messages === "string"
            ? JSON.parse(c.messages)
            : Array.isArray(c.messages)
            ? c.messages
            : [],
        }));
    
        setContacts(normalized);
        setAdminMode(true); // ✅ Burada da aç
      } catch {
        setAdminMode(false);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };
    
  const handleDelete = async (id: number) => {
    const res = await fetch(`${CONTACTS_URL}/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeader() },
      credentials: "omit",
      cache: "no-store",
    });
    if (res.status === 401) {
      alert("Admin girişi gerekli");
      return;
    }
    if (res.ok) {
      fetchContacts();
      alert(messages.feedback.delete_success);
    } else {
      alert(messages.feedback.delete_error);
    }
  };

  const handleUpdateClick = (user: ContactUser) => {
    setEditId(user.id!);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async () => {
    if (editId == null) return;

    const res = await fetch(`${CONTACTS_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(formData),
      credentials: "omit",
      cache: "no-store",
    });

    if (res.status === 401) {
      alert("Admin girişi gerekli");
      return;
    }

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setEditId(null);
      fetchContacts();
      alert(messages.feedback.update_success);
    } else {
      alert(messages.feedback.  update_error(data?.error || ""));
    }
  };

  return (
    <div style={{ padding: "2rem", margin: "4rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>{messages.feedback.title}</h2>
      <Modal
        title="Admin Girişi"
        open={loginOpen}
        onOk={doLogin}
        confirmLoading={loginLoading}
        onCancel={() => {
          setLoginOpen(false);
          setUsername("");
          setPassword("");
        }}
        okText="Giriş Yap"
        cancelText="İptal"
      >
        <div style={{ display: "grid", gap: 8 }}>
          <Input placeholder="Kullanıcı adı" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input.Password placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </Modal>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        {!adminMode && (
          <div style={{ maxWidth: 400, margin: "0 auto 1rem auto" }}>
            <Card style={{ textAlign: "center", borderRadius: 8 }}>
              <p style={{ marginBottom: 0 }}>📩 Mesajları görmek için giriş yapınız.</p>
              <button
                onClick={handleAdminLogin}
                style={{
                  marginTop: "2rem",
                  padding: "0.5rem 1rem",
                  borderRadius: 6,
                  cursor: "pointer",
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                Giriş Yap
              </button>{" "}
            </Card>
          </div>
        )}
      </div>
      {loading && <p style={{ textAlign: "center", color: "white" }}>Yükleniyor…</p>}

      <ul style={{ listStyle: "none", padding: 0, maxWidth: 600, margin: "auto" }}>
        {adminMode && (
          <>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder={messages.feedback.placeholder_first_name}
                    />
                    <input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder={messages.feedback.placeholder_last_name}
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={messages.feedback.placeholder_email}
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
                      {messages.feedback.send_button}
                    </button>
                  </div>
                ) : (
                  <>
                    <strong>
                      {c.first_name} {c.last_name}
                    </strong>{" "}
                    — <span>{c.email}</span>
                    <div style={{ position: "absolute", right: 10, top: 10, display: "flex", gap: "0.5rem" }}>
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
                            <span style={{ fontSize: "0.75rem", color: "#888" }}>{new Date(msg.created_at).toLocaleString("tr-TR")}</span>
                          </p>
                        ))
                      ) : (
                        <p style={{ color: "#888" }}>{messages.feedback.no_messages}</p>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
            <Divider style={{ backgroundColor: "white" }} />
          </>
        )}
        {!adminMode && (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Link
              to={`/#${"contact"}`}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                border: "none",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            >
              {messages.feedback.new_message_button}
            </Link>
          </div>
        )}
        {adminMode && (
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                backgroundColor: "var(--primary-color)",
                color: "white",
              }}
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}
