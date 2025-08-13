import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Form, Input, Row, Col } from "antd";
import { Container, Title, StyledButton, LabelSpan } from "./Contact.styles";
import { CONTACTS_URL } from "../../types/urls";
import { messages } from "../../messages/Messages";
import { getAuthHeader } from "../../auth/credentials";
export const ContactForm = () => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = React.useState(false);
    const isAdmin = !!getAuthHeader().Authorization;
    const onFinish = async (values) => {
        if (isAdmin)
            return;
        // Trim ve basic kurallar
        const payload = {
            first_name: values.firstName.trim(),
            last_name: (values.lastName ?? "").trim(),
            email: values.email.trim(),
            message: values.message.trim(),
        };
        // Uzunluk sınırları (DB ile uyum)
        if (payload.first_name.length > 100)
            return alert("Ad en fazla 100 karakter olabilir.");
        if (payload.last_name.length > 100)
            return alert("Soyad en fazla 100 karakter olabilir.");
        if (payload.email.length > 255)
            return alert("E-posta en fazla 255 karakter olabilir.");
        setSubmitting(true);
        try {
            const response = await fetch(CONTACTS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "omit",
                cache: "no-store",
            });
            // 403: Admin modunda yeni oluşturma kapalı
            if (response.status === 403) {
                return;
            }
            let data = null;
            try {
                data = await response.json();
            }
            catch {
            }
            if (response.ok) {
                form.resetFields();
                alert(messages.contact.send_success(data?.message ?? "Gönderildi"));
            }
            else {
                const errText = data?.error ?? "Gönderilemedi";
                alert(messages.contact.send_error(errText));
            }
        }
        catch (error) {
            console.error(messages.common.action_error, error);
            alert(messages.contact.send_error("Beklenmeyen bir hata oluştu"));
        }
        finally {
            setSubmitting(false);
        }
    };
    return (_jsxs(Container, { children: [_jsxs(Title, { level: 1, children: ["Bana ", _jsx("span", { children: "Ula\u015F" })] }), _jsxs(Form, { name: "contact-us", layout: "vertical", form: form, onFinish: onFinish, disabled: isAdmin, children: [_jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Ad" }), name: "firstName", rules: [
                                        { required: true, message: messages.contact.first_name_required },
                                        { max: 100, message: "Ad en fazla 100 karakter olabilir." },
                                    ], children: _jsx(Input, { size: "large", placeholder: "Ad\u0131n\u0131z", autoComplete: "given-name" }) }) }), _jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Soyad" }), name: "lastName", rules: [{ max: 100, message: "Soyad en fazla 100 karakter olabilir." }], children: _jsx(Input, { size: "large", placeholder: "Soyad\u0131n\u0131z" }) }) }), _jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Email" }), name: "email", rules: [
                                        { required: true, message: messages.contact.email_required },
                                        { type: "email", message: messages.contact.email_invalid },
                                        { max: 255, message: "E-posta en fazla 255 karakter olabilir." },
                                    ], children: _jsx(Input, { size: "large", placeholder: "ornek@mail.com", type: "email", inputMode: "email", autoComplete: "email" }) }) })] }), _jsx(Row, { children: _jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Mesaj\u0131n\u0131z" }), name: "message", rules: [{ required: true, message: messages.contact.message_required }], children: _jsx(Input.TextArea, { rows: 5, size: "large", style: { resize: "none", fontSize: "1.1rem" }, placeholder: "Mesaj\u0131n\u0131z\u0131 buraya yaz\u0131n..." }) }) }) }), _jsx(Row, { children: _jsx(Col, { span: 24, style: { textAlign: "center" }, children: _jsx(Form.Item, { children: _jsx(StyledButton, { type: "primary", htmlType: "submit", size: "large", loading: submitting, disabled: submitting, children: "G\u00F6nder" }) }) }) })] })] }));
};
//# sourceMappingURL=Contact.js.map