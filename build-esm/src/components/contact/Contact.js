import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Row, Col } from "antd";
import { Container, Title, StyledForm, StyledButton, LabelSpan, } from "./Contact.styles";
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
export const ContactForm = () => {
    const [form] = Form.useForm();
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
    return (_jsxs(Container, { children: [_jsxs(Title, { level: 1, children: ["Bana ", _jsx("span", { children: "Ula\u015F" })] }), _jsx(StyledForm, { children: _jsxs(Form, { name: "contact-us", layout: "vertical", form: form, onFinish: onFinish, children: [_jsxs(Row, { gutter: 24, children: [_jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Ad" }), name: "firstName", rules: [{ required: true, message: "Adınızı giriniz!" }], children: _jsx(Input, { size: "large", placeholder: "Ad\u0131n\u0131z" }) }) }), _jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Soyad" }), name: "lastName", rules: [{ required: true, message: "Soyadınızı giriniz!" }], children: _jsx(Input, { size: "large", placeholder: "Soyad\u0131n\u0131z" }) }) }), _jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Email" }), name: "email", rules: [
                                            { required: true, message: "Email adresinizi giriniz!" },
                                            { type: "email", message: "Geçerli bir email giriniz!" },
                                        ], children: _jsx(Input, { size: "large", placeholder: "ornek@mail.com" }) }) })] }), _jsx(Row, { children: _jsx(Col, { span: 24, children: _jsx(Form.Item, { label: _jsx(LabelSpan, { children: "Mesaj\u0131n\u0131z" }), name: "message", rules: [{ required: true, message: "Lütfen mesajınızı yazınız!" }], children: _jsx(Input.TextArea, { rows: 5, size: "large", style: { resize: "none", fontSize: "1.1rem" }, placeholder: "Mesaj\u0131n\u0131z\u0131 buraya yaz\u0131n..." }) }) }) }), _jsx(Row, { children: _jsx(Col, { span: 24, style: { textAlign: "center" }, children: _jsx(Form.Item, { children: _jsx(StyledButton, { type: "primary", htmlType: "submit", size: "large", children: "G\u00F6nder" }) }) }) })] }) })] }));
};
//# sourceMappingURL=Contact.js.map