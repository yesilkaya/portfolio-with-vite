import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, List, Typography, message, Space, Divider, Card, } from 'antd';
const { Title, Text } = Typography;
const API_URL = 'http://localhost:4000/users';
const Container = styled.div `
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
export function CrudScreen() {
    const [users, setUsers] = useState([]);
    const [form] = Form.useForm();
    const [editId, setEditId] = useState('');
    useEffect(() => {
        handleGet();
    }, []);
    const handleGet = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setUsers(data);
            message.success(`GET başarılı (${response.status})`);
        }
        catch (error) {
            message.error('GET hatası: ' + error.message);
        }
    };
    const handlePost = async (values) => {
        if (!values.name || !values.email) {
            return message.warning('İsim ve e-posta boş olamaz');
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: values.name, email: values.email }),
            });
            message.success(`POST başarılı (${response.status})`);
            form.resetFields();
            handleGet();
        }
        catch (error) {
            message.error('POST hatası: ' + error.message);
        }
    };
    const handlePut = async (values) => {
        if (!editId || !values.name || !values.email) {
            return message.warning('PUT için ID, isim ve e-posta gerekli');
        }
        try {
            const response = await fetch(`${API_URL}/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: values.name, email: values.email }),
            });
            message.success(`PUT başarılı (${response.status})`);
            setEditId('');
            form.resetFields();
            handleGet();
        }
        catch (error) {
            message.error('PUT hatası: ' + error.message);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            message.success(`DELETE başarılı (${response.status})`);
            handleGet();
        }
        catch (error) {
            message.error('DELETE hatası: ' + error.message);
        }
    };
    return (_jsxs(Container, { children: [_jsxs(Card, { bordered: true, children: [_jsx(Title, { level: 3, children: "\uD83E\uDDFE CRUD Kullan\u0131c\u0131 Formu" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: (values) => {
                            if (editId)
                                handlePut(values);
                            else
                                handlePost(values);
                        }, children: [_jsx(Form.Item, { label: "\u0130sim", name: "name", rules: [{ required: true }], children: _jsx(Input, { placeholder: "\u0130sim girin" }) }), _jsx(Form.Item, { label: "E-posta", name: "email", rules: [{ required: true }], children: _jsx(Input, { placeholder: "E-posta girin" }) }), _jsx(Form.Item, { label: "G\u00FCncellenecek ID", children: _jsx(Input, { placeholder: "PUT i\u00E7in ID", value: editId, onChange: (e) => setEditId(e.target.value) }) }), _jsxs(Space, { children: [_jsx(Button, { type: "primary", htmlType: "submit", children: editId ? 'PUT Güncelle' : 'POST Ekle' }), _jsx(Button, { type: "primary", onClick: handleGet, children: "GET Kullan\u0131c\u0131lar" }), _jsx(Button, { danger: true, onClick: () => {
                                            form.resetFields();
                                            setEditId('');
                                        }, children: "Temizle" })] })] })] }), _jsx(Divider, {}), _jsx(Title, { level: 4, style: { color: 'white' }, children: "\uD83D\uDC65 Kullan\u0131c\u0131 Listesi" }), _jsx(List, { style: { backgroundColor: '#F0F0F0', color: 'white' }, bordered: true, dataSource: users, renderItem: (user) => (_jsx(List.Item, { actions: [
                        _jsx(Button, { danger: true, size: "small", onClick: () => handleDelete(user.id), children: "Sil" }, "delete"),
                        _jsx(Button, { size: "small", onClick: () => {
                                setEditId(user.id);
                                form.setFieldsValue({ name: user.name, email: user.email });
                            }, children: "D\u00FCzenle" }, "edit"),
                    ], children: _jsxs(Text, { children: ["#", user.id, " - ", user.name, " (", user.email, ")"] }) }, user.id)) })] }));
}
//# sourceMappingURL=Crud.js.map