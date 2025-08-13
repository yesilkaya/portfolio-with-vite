import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Divider, Modal, Input, Card } from "antd";
import { CONTACTS_URL } from "../../types/urls";
import { messages } from "../../messages/Messages";
import { getAuthHeader, clearAuthHeader } from "../../auth/credentials";
import { doLoginRequest } from "../../api/db-login";
export function FeedbackScreen() {
    const [contacts, setContacts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
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
        }
        else {
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
        }
        catch { }
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
        }
        catch {
            setAdminMode(false);
            setContacts([]);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
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
        }
        else {
            alert(messages.feedback.delete_error);
        }
    };
    const handleUpdateClick = (user) => {
        setEditId(user.id);
        setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmitUpdate = async () => {
        if (editId == null)
            return;
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
        }
        else {
            alert(messages.feedback.update_error(data?.error || ""));
        }
    };
    return (_jsxs("div", { style: { padding: "2rem", margin: "4rem", fontFamily: "Arial, sans-serif" }, children: [_jsx("h2", { style: { textAlign: "center", color: "white" }, children: messages.feedback.title }), _jsx(Modal, { title: "Admin Giri\u015Fi", open: loginOpen, onOk: doLogin, confirmLoading: loginLoading, onCancel: () => {
                    setLoginOpen(false);
                    setUsername("");
                    setPassword("");
                }, okText: "Giri\u015F Yap", cancelText: "\u0130ptal", children: _jsxs("div", { style: { display: "grid", gap: 8 }, children: [_jsx(Input, { placeholder: "Kullan\u0131c\u0131 ad\u0131", value: username, onChange: (e) => setUsername(e.target.value) }), _jsx(Input.Password, { placeholder: "\u015Eifre", value: password, onChange: (e) => setPassword(e.target.value) })] }) }), _jsx("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: !adminMode && (_jsx("div", { style: { maxWidth: 400, margin: "0 auto 1rem auto" }, children: _jsxs(Card, { style: { textAlign: "center", borderRadius: 8 }, children: [_jsx("p", { style: { marginBottom: 0 }, children: "\uD83D\uDCE9 Mesajlar\u0131 g\u00F6rmek i\u00E7in giri\u015F yap\u0131n\u0131z." }), _jsx("button", { onClick: handleAdminLogin, style: {
                                    marginTop: "2rem",
                                    padding: "0.5rem 1rem",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                }, children: "Giri\u015F Yap" }), " "] }) })) }), loading && _jsx("p", { style: { textAlign: "center", color: "white" }, children: "Y\u00FCkleniyor\u2026" }), _jsxs("ul", { style: { listStyle: "none", padding: 0, maxWidth: 600, margin: "auto" }, children: [adminMode && (_jsxs(_Fragment, { children: [_jsx(Divider, { style: { backgroundColor: "white" } }), contacts.map((c) => (_jsx("li", { style: {
                                    backgroundColor: "white",
                                    padding: "1rem",
                                    marginBottom: "1rem",
                                    borderRadius: "6px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                    position: "relative",
                                }, children: editId === c.id ? (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" }, children: [_jsx("input", { name: "first_name", value: formData.first_name, onChange: handleInputChange, placeholder: messages.feedback.placeholder_first_name }), _jsx("input", { name: "last_name", value: formData.last_name, onChange: handleInputChange, placeholder: messages.feedback.placeholder_last_name }), _jsx("input", { name: "email", value: formData.email, onChange: handleInputChange, placeholder: messages.feedback.placeholder_email }), _jsx("button", { onClick: handleSubmitUpdate, style: {
                                                marginTop: "0.5rem",
                                                backgroundColor: "var(--primary-color)",
                                                color: "white",
                                                border: "none",
                                                padding: "0.5rem",
                                                borderRadius: "4px",
                                            }, children: messages.feedback.send_button })] })) : (_jsxs(_Fragment, { children: [_jsxs("strong", { children: [c.first_name, " ", c.last_name] }), " ", "\u2014 ", _jsx("span", { children: c.email }), _jsxs("div", { style: { position: "absolute", right: 10, top: 10, display: "flex", gap: "0.5rem" }, children: [_jsx("button", { onClick: () => handleUpdateClick(c), children: "\uD83D\uDCDD" }), _jsx("button", { onClick: () => handleDelete(c.id), children: "\uD83D\uDDD1\uFE0F" })] }), _jsx("div", { style: { marginTop: "0.5rem" }, children: (c.messages || []).length > 0 ? ((c.messages || []).map((msg) => (_jsxs("p", { style: {
                                                    marginBottom: "0.5rem",
                                                    backgroundColor: "#f5f5f5",
                                                    padding: "0.5rem",
                                                    borderRadius: "4px",
                                                    fontSize: "0.95rem",
                                                }, children: ["\uD83D\uDCE9 ", msg.content, _jsx("br", {}), _jsx("span", { style: { fontSize: "0.75rem", color: "#888" }, children: new Date(msg.created_at).toLocaleString("tr-TR") })] }, msg.id)))) : (_jsx("p", { style: { color: "#888" }, children: messages.feedback.no_messages })) })] })) }, c.id))), _jsx(Divider, { style: { backgroundColor: "white" } })] })), !adminMode && (_jsx("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: _jsx(Link, { to: `/#${"contact"}`, style: {
                                backgroundColor: "var(--primary-color)",
                                color: "white",
                                border: "none",
                                padding: "0.5rem",
                                borderRadius: "4px",
                            }, children: messages.feedback.new_message_button }) })), adminMode && (_jsx("div", { style: { textAlign: "center", marginBottom: 8 }, children: _jsx("button", { onClick: handleLogout, style: {
                                padding: "6px 12px",
                                borderRadius: 6,
                                cursor: "pointer",
                                backgroundColor: "var(--primary-color)",
                                color: "white",
                            }, children: "\u00C7\u0131k\u0131\u015F Yap" }) }))] })] }));
}
//# sourceMappingURL=Feedback.js.map