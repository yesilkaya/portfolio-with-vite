import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  Button,
  List,
  Typography,
  message,
  Space,
  Divider,
  Card,
} from 'antd';

const { Title, Text } = Typography;
const API_URL = 'http://localhost:4000/users';

const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  padding: 24px;
`;

// Kullanıcı tipi
interface User {
  id: string;
  name: string;
  email: string;
}

// Form verisi tipi
interface UserFormValues {
  name: string;
  email: string;
}

function CrudScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm<UserFormValues>();
  const [editId, setEditId] = useState<string>('');

  useEffect(() => {
    handleGet();
  }, []);

  // GET
  const handleGet = async () => {
    try {
      const response = await fetch(API_URL);
      const data: User[] = await response.json();
      setUsers(data);
      message.success(`GET başarılı (${response.status})`);
    } catch (error: any) {
      message.error('GET hatası: ' + error.message);
    }
  };

  // POST
  const handlePost = async (values: UserFormValues) => {
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
    } catch (error: any) {
      message.error('POST hatası: ' + error.message);
    }
  };

  // PUT
  const handlePut = async (values: UserFormValues) => {
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
    } catch (error: any) {
      message.error('PUT hatası: ' + error.message);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      message.success(`DELETE başarılı (${response.status})`);
      handleGet();
    } catch (error: any) {
      message.error('DELETE hatası: ' + error.message);
    }
  };

  return (
    <Container>
      <Card bordered>
        <Title level={3}>🧾 CRUD Kullanıcı Formu</Title>

        <Form<UserFormValues>
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (editId) handlePut(values);
            else handlePost(values);
          }}
        >
          <Form.Item label="İsim" name="name" rules={[{ required: true }]}>
            <Input placeholder="İsim girin" />
          </Form.Item>

          <Form.Item label="E-posta" name="email" rules={[{ required: true }]}>
            <Input placeholder="E-posta girin" />
          </Form.Item>

          <Form.Item label="Güncellenecek ID">
            <Input
              placeholder="PUT için ID"
              value={editId}
              onChange={(e) => setEditId(e.target.value)}
            />
          </Form.Item>

          <Space>
            <Button type="primary" htmlType="submit">
              {editId ? 'PUT Güncelle' : 'POST Ekle'}
            </Button>
            <Button type="primary" onClick={handleGet}>GET Kullanıcılar</Button>
            <Button
              danger
              onClick={() => {
                form.resetFields();
                setEditId('');
              }}
            >
              Temizle
            </Button>
          </Space>
        </Form>
      </Card>

      <Divider />

      <Title level={4} style={{ color: 'white' }}>👥 Kullanıcı Listesi</Title>
      <List
        style={{ backgroundColor: '#F0F0F0', color: 'white' }}
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button
                danger
                size="small"
                onClick={() => handleDelete(user.id)}
                key="delete"
              >
                Sil
              </Button>,
              <Button
                size="small"
                onClick={() => {
                  setEditId(user.id);
                  form.setFieldsValue({ name: user.name, email: user.email });
                }}
                key="edit"
              >
                Düzenle
              </Button>,
            ]}
            key={user.id}
          >
            <Text>
              #{user.id} - {user.name} ({user.email})
            </Text>
          </List.Item>
        )}
      />
    </Container>
  );
}

export default CrudScreen;
