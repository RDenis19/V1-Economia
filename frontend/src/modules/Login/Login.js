import React, { useState } from "react";
import { Layout, Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";

// Credenciales quemadas
const users = [
  { email: "admin@correo.com", password: "admin123", role: "Administrador" },
  { email: "prestamista@correo.com", password: "prestamista123", role: "Prestamista" },
  { email: "prestatario@correo.com", password: "prestatario123", role: "Prestatario" },
  { email: "soporte@correo.com", password: "soporte123", role: "Soporte" },
];

const { Content } = Layout;
const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [error, setError] = useState("");

  const handleLogin = (values) => {
    setError("");
    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      onLogin(user.role); // Asigna el rol al iniciar sesión
    } else {
      setError("Credenciales inválidas. Por favor, intenta de nuevo.");
    }
  };

  return (
    <Layout className="login-layout">
      <Content>
        <Row justify="center" align="middle" className="login-container">
          <Col xs={24} sm={12} className="login-form">
            <Title level={2}>Bienvenido</Title>
            <Form name="login" layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="email"
                label="Correo"
                rules={[
                  {
                    required: true,
                    message: "Por favor, introduce tu correo",
                    type: "email",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Correo"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Por favor, introduce tu contraseña",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Contraseña"
                  size="large"
                />
              </Form.Item>
              {error && <p className="error">{error}</p>}
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
