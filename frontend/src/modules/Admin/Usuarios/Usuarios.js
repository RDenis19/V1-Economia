import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import AgregarUsuario from './AgregarUsuario';
import ActualizarUsuario from './ActualizarUsuario';
import VistaPerfil from './VistaPerfil';

const { Option } = Select;

const Usuarios = () => {
  const obtenerUsuarios = () => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    return usuariosGuardados ? JSON.parse(localStorage.getItem('usuarios')) : [];
  };

  const [usuarios, setUsuarios] = useState(obtenerUsuarios());
  const [filteredData, setFilteredData] = useState(usuarios);
  const [searchText, setSearchText] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterRol, setFilterRol] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [viewingUserId, setViewingUserId] = useState(null);

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    let data = [...usuarios];

    if (searchText) {
      data = data.filter(
        (user) =>
          user.cedula.toLowerCase().includes(searchText.toLowerCase()) ||
          user.nombres.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterEstado) {
      data = data.filter((user) => user.estado === filterEstado);
    }

    if (filterRol) {
      data = data.filter((user) => user.rol_id.toString() === filterRol);
    }

    setFilteredData(data);
  }, [searchText, filterEstado, filterRol, usuarios]);

  const handleAddUser = (newUser) => {
    const updatedUsers = [{ ...newUser, id: usuarios.length + 1 }, ...usuarios];
    setUsuarios(updatedUsers);
    message.success('Usuario agregado exitosamente');
  };

  const handleUpdateUser = () => {
    setUsuarios(obtenerUsuarios());
    message.success('Usuario actualizado exitosamente');
  };

  const columns = [
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'rol_id',
      key: 'rol_id',
      render: (rol_id) => {
        const roles = { 1: 'Administrador', 2: 'Prestatario', 3: 'Prestamista', 4: 'Soporte' };
        return roles[rol_id];
      },
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={estado === 'Activo' ? 'green' : 'red'}>{estado}</Tag>
      ),
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingUserId(record.id);
              setIsEditModalOpen(true);
            }}
          />
          <Button icon={<DeleteOutlined />} danger />
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setViewingUserId(record.id);
              setIsViewModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Usuarios</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar por Cédula o Nombre"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Space>
          <Select
            placeholder="Filtrar por Estado"
            value={filterEstado}
            onChange={(value) => setFilterEstado(value)}
            style={{ width: '150px' }}
            allowClear
          >
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
          <Select
            placeholder="Filtrar por Rol"
            value={filterRol}
            onChange={(value) => setFilterRol(value)}
            style={{ width: '200px' }}
            allowClear
          >
            <Option value="1">Administrador</Option>
            <Option value="2">Prestatario</Option>
            <Option value="3">Prestamista</Option>
            <Option value="4">Soporte</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
            Crear Usuario
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: 7,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="id"
      />
      <AgregarUsuario
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onUserAdded={handleAddUser}
      />
      <ActualizarUsuario
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userId={editingUserId}
        onUserUpdated={handleUpdateUser}
      />
      <VistaPerfil
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        userId={viewingUserId}
      />
    </div>
  );
};

export default Usuarios;
