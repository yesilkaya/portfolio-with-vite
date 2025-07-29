"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Contact_styles_1 = require("./Contact.styles");
/**
 * `ContactForm` bileşeni, kullanıcıdan iletişim bilgilerini alıp
 * belirtilen API endpoint'ine (http://localhost:3000/api/contact) POST isteği gönderen bir formdur.
 *
 * Özellikler:
 * - Tüm alanlar zorunludur.
 * - Email alanı geçerli formatta olmalıdır.
 * - Gönderim başarılıysa form sıfırlanır ve kullanıcıya bilgi verilir.
 * - Hata durumunda kullanıcı bilgilendirilir.
 *
 * @component
 * @returns {JSX.Element} İletişim formunu içeren React bileşeni.
 */
const ContactForm = () => {
    const [form] = antd_1.Form.useForm();
    /**
     * Form başarıyla gönderildiğinde çağrılır.
     *
     * @async
     * @param {ContactFormValues} values - Formdan gelen değerler.
     * @returns {Promise<void>}
     */
    const onFinish = async (values) => {
        try {
            const response = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                form.resetFields();
                alert("Mesajınız başarıyla gönderildi!");
            }
            else {
                alert("Bir hata oluştu. Lütfen tekrar deneyin.");
            }
        }
        catch (error) {
            console.error("İstek gönderilirken hata oluştu:", error);
            alert("Sunucuya bağlanılamadı.");
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Contact_styles_1.Container, { children: [(0, jsx_runtime_1.jsxs)(Contact_styles_1.Title, { level: 1, children: ["Bana ", (0, jsx_runtime_1.jsx)("span", { children: "Ula\u015F" })] }), (0, jsx_runtime_1.jsx)(Contact_styles_1.StyledForm, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { name: "contact-us", layout: "vertical", form: form, onFinish: onFinish, children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: 24, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)(Contact_styles_1.LabelSpan, { children: "Ad" }), name: "firstName", rules: [{ required: true, message: "Adınızı giriniz!" }], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { size: "large", placeholder: "Ad\u0131n\u0131z" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)(Contact_styles_1.LabelSpan, { children: "Soyad" }), name: "lastName", rules: [{ required: true, message: "Soyadınızı giriniz!" }], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { size: "large", placeholder: "Soyad\u0131n\u0131z" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)(Contact_styles_1.LabelSpan, { children: "Email" }), name: "email", rules: [
                                            { required: true, message: "Email adresinizi giriniz!" },
                                            { type: "email", message: "Geçerli bir email giriniz!" },
                                        ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { size: "large", placeholder: "ornek@mail.com" }) }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: (0, jsx_runtime_1.jsx)(Contact_styles_1.LabelSpan, { children: "Mesaj\u0131n\u0131z" }), name: "message", rules: [{ required: true, message: "Lütfen mesajınızı yazınız!" }], children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { rows: 5, size: "large", style: { resize: "none", fontSize: "1.1rem" }, placeholder: "Mesaj\u0131n\u0131z\u0131 buraya yaz\u0131n..." }) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 24, style: { textAlign: "center" }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(Contact_styles_1.StyledButton, { type: "primary", htmlType: "submit", size: "large", children: "G\u00F6nder" }) }) }) })] }) })] }));
};
exports.ContactForm = ContactForm;
//# sourceMappingURL=Contact.js.map