import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ProjectOutlined,
  FileTextOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function AdminLayout({ children }) {
  const adminLinks = [
    {
      label: "Dashboard",
      to: "/administrador/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "Usuarios",
      to: "/administrador/usuarios",
      icon: <UserOutlined />,
    },
    {
      label: "Proyectos",
      to: "/administrador/proyectos",
      icon: <ProjectOutlined />,
    },
    {
      label: "Tickets",
      to: "/administrador/tickets",
      icon: <FileTextOutlined />,
    },
    {
      label: "Inversiones",
      to: "/administrador/inversiones",
      icon: <BankOutlined />,
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar links={adminLinks} />
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Header
          username="Administrador"
          profilePic="https://via.placeholder.com/40"
        />
        <Content
          style={{
            margin: "16px",
            padding: 24,
            background: "#fff",
            borderRadius: "8px",
            overflowY: "auto",
            height: "calc(100vh - 64px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
