/**
 * @module CrudScreen
 * This module provides a CRUD interface for managing users.
 */
import React from 'react';
import { useState, useEffect } from 'react';
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

/**
 * Represents a user in the CRUD application.
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Represents the values for the user form.
 * @interface UserFormValues
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 */
interface UserFormValues {
  name: string;
  email: string;
}

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
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm<UserFormValues>();
  const [editId, setEditId] = useState<string>('');

  useEffect(() => {
    handleGet();
  }, []);

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
