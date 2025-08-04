/**
 * @file ContactForm.tsx
 * @description Kullanıcıların ad, soyad, email ve mesaj bilgilerini girerek iletişim kurabileceği form bileşeni.
 * Form `antd` kütüphanesi ile oluşturulmuş olup, başarılı gönderim sonrası form temizlenir.
 */

import React from "react";
import { Form, Input, Row, Col } from "antd";
import { Container, Title, StyledButton, LabelSpan } from "./Contact.styles";

/**
 * @typedef {Object} ContactFormValues
 * @property {string} firstName - Kullanıcının adı.
 * @property {string} lastName - Kullanıcının soyadı.
 * @property {string} email - Kullanıcının email adresi.
 * @property {string} message - Kullanıcının gönderdiği mesaj içeriği.
 */

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

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

export const ContactForm: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();

  /**
   * Form başarıyla gönderildiğinde çağrılır.
   *
   * @async
   * @param {ContactFormValues} values - Formdan gelen değerler.
   * @returns {Promise<void>}
   */
  const onFinish = async (values: ContactFormValues) => {
    try {
      const response = await fetch("http://localhost:4000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          message: values.message,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        form.resetFields();
        alert(`Mesaj başarıyla gönderildi! ✉️\n${data.message}`);
      } else {
        alert(`❌ Hata: ${data.error}`);
      }
    } catch (error) {
      console.error("İstek gönderilirken hata oluştu:", error);
      alert("⚠️ Sunucuya bağlanılamadı.");
    }
  };
  

  return (
    <Container>
      <Title level={1}>
        Bana <span>Ulaş</span>
      </Title>

      <Form name="contact-us" layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Ad</LabelSpan>}
              name="firstName"
              rules={[{ required: true, message: "Adınızı giriniz!" }]}
            >
              <Input size="large" placeholder="Adınız" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Soyad</LabelSpan>}
              name="lastName"
              rules={[{ required: true, message: "Soyadınızı giriniz!" }]}
            >
              <Input size="large" placeholder="Soyadınız" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Email</LabelSpan>}
              name="email"
              rules={[
                { required: true, message: "Email adresinizi giriniz!" },
                { type: "email", message: "Geçerli bir email giriniz!" },
              ]}
            >
              <Input size="large" placeholder="ornek@mail.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Mesajınız</LabelSpan>}
              name="message"
              rules={[
                { required: true, message: "Lütfen mesajınızı yazınız!" },
              ]}
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
              <StyledButton type="primary" htmlType="submit" size="large">
                Gönder
              </StyledButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
