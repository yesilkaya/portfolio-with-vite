import React from "react";
import { Form, Input, Row, Col } from "antd";
import { Container, Title, StyledButton, LabelSpan } from "./Contact.styles";
import { CONTACTS_URL } from "../../../shared/types/urls";
import { messages } from "../../../shared/messages/Messages";
import { getAuthHeader } from "../../client/credentials";

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [submitting, setSubmitting] = React.useState(false);

  const isAdmin = !!getAuthHeader().Authorization;

  const onFinish = async (values: ContactFormValues) => {
    if (isAdmin) return;

    // Trim ve basic kurallar
    const payload = {
      first_name: values.firstName.trim(),
      last_name: (values.lastName ?? "").trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    // Uzunluk sınırları (DB ile uyum)
    if (payload.first_name.length > 100) return alert("Ad en fazla 100 karakter olabilir.");
    if (payload.last_name.length > 100) return alert("Soyad en fazla 100 karakter olabilir.");
    if (payload.email.length > 255) return alert("E-posta en fazla 255 karakter olabilir.");

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

      let data: any = null;
      try {
        data = await response.json();
      } catch {}

      if (response.ok) {
        form.resetFields();
        alert(messages.contact.send_success(data?.message ?? "Gönderildi"));
      } else {
        const errText = data?.error ?? "Gönderilemedi";
        alert(messages.contact.send_error(errText));
      }
    } catch (error) {
      console.error(messages.common.action_error, error);
      alert(messages.contact.send_error("Beklenmeyen bir hata oluştu"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Title level={1}>
        Bana <span>Ulaş</span>
      </Title>

      <Form name="contact-us" layout="vertical" form={form} onFinish={onFinish} disabled={isAdmin}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Ad</LabelSpan>}
              name="firstName"
              rules={[
                { required: true, message: messages.contact.first_name_required },
                { max: 100, message: "Ad en fazla 100 karakter olabilir." },
              ]}
            >
              <Input size="large" placeholder="Adınız" autoComplete="given-name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Soyad</LabelSpan>}
              name="lastName"
              rules={[{ max: 100, message: "Soyad en fazla 100 karakter olabilir." }]} // ← required: false
            >
              <Input size="large" placeholder="Soyadınız" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Email</LabelSpan>}
              name="email"
              rules={[
                { required: true, message: messages.contact.email_required },
                { type: "email", message: messages.contact.email_invalid },
                { max: 255, message: "E-posta en fazla 255 karakter olabilir." },
              ]}
            >
              <Input size="large" placeholder="ornek@mail.com" type="email" inputMode="email" autoComplete="email" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Mesajınız</LabelSpan>}
              name="message"
              rules={[{ required: true, message: messages.contact.message_required }]}
            >
              <Input.TextArea
                rows={5}
                size="large"
                style={{ resize: "none", fontSize: "1.1rem" }}
                placeholder="Mesajınızı buraya yazın..."
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Form.Item>
              <StyledButton type="primary" htmlType="submit" size="large" loading={submitting} disabled={submitting}>
                Gönder
              </StyledButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
