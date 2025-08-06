import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// frontend/ContactList.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { message as antdMessage } from "antd";
export function FeedbackScreen() {
    const [contacts, setContacts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });
    useEffect(() => {
        fetchContacts();
    }, []);
    const fetchContacts = async () => {
        const res = await fetch("http://localhost:4000/api/feedback");
        const data = await res.json();
        setContacts(data);
    };
    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:4000/api/feedback/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            fetchContacts();
            antdMessage.success("🗑️ Başarıyla silindi");
        }
        else {
            antdMessage.error("🗑️ Silme Hatası");
        }
    };
    const handleUpdateClick = (user) => {
        setEditId(user.id);
        setFormData({ ...user });
    };
    const handleInputChange = (e) => {
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
        }
        else {
            alert(`❌ Güncelleme hatası: ${data.error}`);
        }
    };
    return (_jsxs("div", { style: {
            padding: "2rem",
            margin: "4rem",
            fontFamily: "Arial, sans-serif",
        }, children: [_jsx("h2", { style: { textAlign: "center", color: "white" }, children: "Sizden Gelenler" }), _jsxs("ul", { style: { listStyle: "none", padding: 0, maxWidth: 600, margin: "auto" }, children: [_jsx(Divider, { style: { backgroundColor: "white" } }), contacts.map((c) => (_jsx("li", { style: {
                            backgroundColor: "white",
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "6px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            position: "relative",
                        }, children: editId === c.id ? (_jsxs("div", { style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }, children: [_jsx("input", { name: "first_name", value: formData.first_name, onChange: handleInputChange, placeholder: "\u0130sim" }), _jsx("input", { name: "last_name", value: formData.last_name, onChange: handleInputChange, placeholder: "Soyisim" }), _jsx("input", { name: "email", value: formData.email, onChange: handleInputChange, placeholder: "E-posta" }), _jsx("button", { onClick: handleSubmitUpdate, style: {
                                        marginTop: "0.5rem",
                                        backgroundColor: "var(--primary-color)",
                                        color: "white",
                                        border: "none",
                                        padding: "0.5rem",
                                        borderRadius: "4px",
                                    }, children: "G\u00F6nder" })] })) : (_jsxs(_Fragment, { children: [_jsxs("strong", { children: [c.first_name, " ", c.last_name] }), " ", "\u2014 ", _jsx("span", { children: c.email }), _jsxs("div", { style: {
                                        position: "absolute",
                                        right: 10,
                                        top: 10,
                                        display: "flex",
                                        gap: "0.5rem",
                                    }, children: [_jsx("button", { onClick: () => handleUpdateClick(c), children: "\uD83D\uDCDD" }), _jsx("button", { onClick: () => handleDelete(c.id), children: "\uD83D\uDDD1\uFE0F" })] }), _jsx("div", { style: { marginTop: "0.5rem" }, children: (c.messages || []).length > 0 ? ((c.messages || []).map((msg) => (_jsxs("p", { style: {
                                            marginBottom: "0.5rem",
                                            backgroundColor: "#f5f5f5",
                                            padding: "0.5rem",
                                            borderRadius: "4px",
                                            fontSize: "0.95rem",
                                        }, children: ["\uD83D\uDCE9 ", msg.content, _jsx("br", {}), _jsx("span", { style: { fontSize: "0.75rem", color: "#888" }, children: new Date(msg.created_at).toLocaleString("tr-TR") })] }, msg.id)))) : (_jsx("p", { style: { color: "#888" }, children: "Hen\u00FCz mesaj yok." })) })] })) }, c.id))), _jsx(Divider, { style: { backgroundColor: "white" } }), _jsx(Link, { to: `/#${"contact"}`, style: {
                            marginTop: "0.5rem",
                            backgroundColor: "var(--primary-color)",
                            color: "white",
                            border: "none",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            marginLeft: "14rem",
                        }, children: "Yeni Mesaj Gönder" })] })] }));
}
//# sourceMappingURL=Feedback.js.map