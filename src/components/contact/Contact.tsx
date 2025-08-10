import React from "react";
import { Form, Input, Row, Col } from "antd";
import { Container, Title, StyledButton, LabelSpan } from "./Contact.styles";
import { CONTACTS_URL } from "../../types/urls";
import { messages } from "../../messages/Messages";

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();

  const onFinish = async (values: ContactFormValues) => {
    try {
      const response = await fetch(CONTACTS_URL, {
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
        alert(messages.contact.send_success(data.message));
      } else {
        alert(messages.contact.send_error(data.error));
      }
    } catch (error) {
      console.error(messages.common.action_error, error);
      alert(messages.contact.send_error);
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
              rules={[{ required: true, message: messages.contact.first_name_required }]}
            >
              <Input size="large" placeholder="Adınız" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={<LabelSpan>Soyad</LabelSpan>}
              name="lastName"
              rules={[{ required: true, message: messages.contact.last_name_required }]}
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
