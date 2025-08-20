import React, { useState, useEffect } from "react";
import { ContactUser } from "../../types/user";
import { Divider, Modal, Input } from "antd";
import { CONTACTS_URL } from "../../types/urls";
import { messages } from "../../messages/Messages";
import { getAuthHeader, clearAuthHeader } from "../../auth/credentials";
import { doLoginRequest } from "../../api/db-login";
import {
  ScreenWrapper,
  Title,
  LoginCard,
  LoginButton,
  LoadingText,
  ContactList,
  ContactItem,
  EditForm,
  ActionButtons,
  MessageBox,
  NoMessage,
  NewMessageLink,
  LogoutButton,
} from "./Feedback.styles";

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

  // 🔹 Modal kontrolü ve giriş formu state'leri
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const doLogin = async () => {
    setLoginLoading(true);
    const result = await doLoginRequest(username, password);

    if (result.success) {
      setAdminMode(true); // Önce adminMode aç
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
        messages: typeof c.messages === "string" ? JSON.parse(c.messages) : Array.isArray(c.messages) ? c.messages : [],
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
      email: user.email,
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
      alert(messages.feedback.update_error(data?.error || ""));
    }
  };

  return (
    <ScreenWrapper>
      <Title>{messages.feedback.title}</Title>
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

      {!adminMode && (
        <div style={{ maxWidth: 400, margin: "0 auto 1rem auto" }}>
          <LoginCard>
            <p style={{ marginBottom: 0 }}>📩 Mesajları görmek için giriş yapınız.</p>
            <LoginButton onClick={handleAdminLogin}>Giriş Yap</LoginButton>
          </LoginCard>
        </div>
      )}

      {loading && <LoadingText>Yükleniyor…</LoadingText>}

      <ContactList>
        {adminMode && (
          <>
            <Divider style={{ backgroundColor: "white" }} />
            {contacts.map((c) => (
              <ContactItem key={c.id}>
                {editId === c.id ? (
                  <EditForm>
                    <input name="first_name" value={formData.first_name} onChange={handleInputChange} />
                    <input name="last_name" value={formData.last_name} onChange={handleInputChange} />
                    <input name="email" value={formData.email} onChange={handleInputChange} />
                    <button onClick={handleSubmitUpdate}>{messages.feedback.send_button}</button>
                  </EditForm>
                ) : (
                  <>
                    <strong>
                      {c.first_name} {c.last_name}
                    </strong>{" "}
                    — <span>{c.email}</span>
                    <ActionButtons>
                      <button onClick={() => handleUpdateClick(c)}>📝</button>
                      <button onClick={() => handleDelete(c.id!)}>🗑️</button>
                    </ActionButtons>
                    <div style={{ marginTop: "0.5rem" }}>
                      {c.messages?.length ? (
                        c.messages.map((msg) => (
                          <MessageBox key={msg.id}>
                            📩 {msg.content}
                            <br />
                            <span>{new Date(msg.created_at).toLocaleString("tr-TR")}</span>
                          </MessageBox>
                        ))
                      ) : (
                        <NoMessage>{messages.feedback.no_messages}</NoMessage>
                      )}
                    </div>
                  </>
                )}
              </ContactItem>
            ))}
            <Divider style={{ backgroundColor: "white" }} />
          </>
        )}
      </ContactList>
      {!adminMode && <NewMessageLink to="/#contact">{messages.feedback.new_message_button}</NewMessageLink>}
      {adminMode && <LogoutButton onClick={handleLogout}>Çıkış Yap </LogoutButton>}
    </ScreenWrapper>
  );
}
