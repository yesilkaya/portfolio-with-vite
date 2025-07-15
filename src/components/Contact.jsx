import React from "react";

import { Form, Input, Button, Typography, Row, Col } from "antd";


const ContactForm = () => {
  const [form] = Form.useForm();
  const { Title } = Typography;

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
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("İstek gönderilirken hata oluştu:", error);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div>
      <Title
        level={1}
        style={{
          marginBottom: 0,
          padding: "20px 30px 0 30px",
          color: "var(--text-color)",
          fontSize: "4rem",
          textAlign: "center",
        }}
      >
        Bana <span style={{ color: "var(--primary-color)" }}>Ulaş</span>

      </Title>

      <Form
        name="contact-us"
        layout="vertical"
        form={form}
        style={{ marginTop: 30, padding: "0 30px 30px 30px" }}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          {/* Genişletilmiş inputlar */}
          <Col span={24}>
            <Form.Item
              label={<span style={{ fontSize: "1.2rem", color: "var(--text-color)" }}>Ad</span>}
              name="firstName"
              rules={[{ required: true, message: "Adınızı giriniz!" }]}
            >
              <Input size="large" placeholder="Adınız" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={<span style={{ fontSize: "1.2rem" , color: "var(--text-color)"}}>Soyad</span>}
              name="lastName"
              rules={[{ required: true, message: "Soyadınızı giriniz!" }]}
            >
              <Input size="large" placeholder="Soyadınız" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={<span style={{ fontSize: "1.2rem", color: "var(--text-color)" }}>Email</span>}
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
              label={<span style={{ fontSize: "1.2rem" , color: "var(--text-color)"}}>Mesajınız</span>}
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
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--text-color)",
                  borderColor: "var(--primary-color)",
                }}
              >
                Gönder
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactForm;
