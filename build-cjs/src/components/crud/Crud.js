"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudScreen = CrudScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @module CrudScreen
 * This module provides a CRUD interface for managing users.
 */
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const antd_1 = require("antd");
const { Title, Text } = antd_1.Typography;
const API_URL = 'http://localhost:4000/users';
const Container = styled_components_1.default.div `
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
`;
/**
 * `CrudScreen` bileşeni, kullanıcı CRUD işlemlerini gerçekleştiren bir arayüz sağlar.
 * Kullanıcılar ekleyebilir, güncelleyebilir ve silebilir.
 *
 * Özellikler:
 * - GET: Tüm kullanıcıları listeleme.
 * - POST: Yeni kullanıcı ekleme.
 * - PUT: Mevcut kullanıcıyı güncelleme.
 * - DELETE: Kullanıcı silme.
 *
 * @returns {JSX.Element} CRUD arayüzünü içeren React bileşeni.
 */
function CrudScreen() {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [form] = antd_1.Form.useForm();
    const [editId, setEditId] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        handleGet();
    }, []);
    const handleGet = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setUsers(data);
            antd_1.message.success(`GET başarılı (${response.status})`);
        }
        catch (error) {
            antd_1.message.error('GET hatası: ' + error.message);
        }
    };
    const handlePost = async (values) => {
        if (!values.name || !values.email) {
            return antd_1.message.warning('İsim ve e-posta boş olamaz');
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: values.name, email: values.email }),
            });
            antd_1.message.success(`POST başarılı (${response.status})`);
            form.resetFields();
            handleGet();
        }
        catch (error) {
            antd_1.message.error('POST hatası: ' + error.message);
        }
    };
    const handlePut = async (values) => {
        if (!editId || !values.name || !values.email) {
            return antd_1.message.warning('PUT için ID, isim ve e-posta gerekli');
        }
        try {
            const response = await fetch(`${API_URL}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: values.name, email: values.email }),
            });
            antd_1.message.success(`PUT başarılı (${response.status})`);
            setEditId('');
            form.resetFields();
            handleGet();
        }
        catch (error) {
            antd_1.message.error('PUT hatası: ' + error.message);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            antd_1.message.success(`DELETE başarılı (${response.status})`);
            handleGet();
        }
        catch (error) {
            antd_1.message.error('DELETE hatası: ' + error.message);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Card, { bordered: true, children: [(0, jsx_runtime_1.jsx)(Title, { level: 3, children: "\uD83E\uDDFE CRUD Kullan\u0131c\u0131 Formu" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, layout: "vertical", onFinish: (values) => {
                            if (editId)
                                handlePut(values);
                            else
                                handlePost(values);
                        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u0130sim", name: "name", rules: [{ required: true }], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u0130sim girin" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "E-posta", name: "email", rules: [{ required: true }], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "E-posta girin" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "G\u00FCncellenecek ID", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "PUT i\u00E7in ID", value: editId, onChange: (e) => setEditId(e.target.value) }) }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", htmlType: "submit", children: editId ? 'PUT Güncelle' : 'POST Ekle' }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: handleGet, children: "GET Kullan\u0131c\u0131lar" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { danger: true, onClick: () => {
                                            form.resetFields();
                                            setEditId('');
                                        }, children: "Temizle" })] })] })] }), (0, jsx_runtime_1.jsx)(antd_1.Divider, {}), (0, jsx_runtime_1.jsx)(Title, { level: 4, style: { color: 'white' }, children: "\uD83D\uDC65 Kullan\u0131c\u0131 Listesi" }), (0, jsx_runtime_1.jsx)(antd_1.List, { style: { backgroundColor: '#F0F0F0', color: 'white' }, bordered: true, dataSource: users, renderItem: (user) => ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { actions: [
                        (0, jsx_runtime_1.jsx)(antd_1.Button, { danger: true, size: "small", onClick: () => handleDelete(user.id), children: "Sil" }, "delete"),
                        (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: () => {
                                setEditId(user.id);
                                form.setFieldsValue({ name: user.name, email: user.email });
                            }, children: "D\u00FCzenle" }, "edit"),
                    ], children: (0, jsx_runtime_1.jsxs)(Text, { children: ["#", user.id, " - ", user.name, " (", user.email, ")"] }) }, user.id)) })] }));
}
//# sourceMappingURL=Crud.js.map