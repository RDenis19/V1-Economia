import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Select, message, Modal, Form, DatePicker, Upload, Checkbox, Descriptions, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import AgregarProyecto from './AgregarProyecto';
import ActualizarProyecto from './ActualizarProyecto';
import VistaProyecto from './VistaProyecto';

const { Option } = Select;

const Proyectos = () => {
  const obtenerProyectos = () => {
    const proyectosGuardados = localStorage.getItem('proyectos');
    return proyectosGuardados ? JSON.parse(proyectosGuardados) : [];
  };

  const [proyectos, setProyectos] = useState(obtenerProyectos());
  const [filteredData, setFilteredData] = useState(proyectos);
  const [searchText, setSearchText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingProject, setViewingProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
  }, [proyectos]);

  useEffect(() => {
    let data = [...proyectos];
    if (searchText) {
      data = data.filter((project) =>
        project.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredData(data);
  }, [searchText, proyectos]);

  const handleAddProject = (newProject) => {
    setProyectos([newProject, ...proyectos]);
    setFilteredData([newProject, ...filteredData]);
  };

  const handleProjectUpdated = () => {
    setProyectos(obtenerProyectos());
    setFilteredData(obtenerProyectos());
  };

  const handleViewProject = (project) => {
    setViewingProject(project);
    setIsViewModalOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const handleDeleteProject = (idProyecto) => {
    const updatedProjects = proyectos.filter((project) => project.idProyecto !== idProyecto);
    setProyectos(updatedProjects);
    setFilteredData(updatedProjects);
    localStorage.setItem('proyectos', JSON.stringify(updatedProjects));
    message.success('Proyecto eliminado');
  };

  const columns = [
    { title: 'ID Proyecto', dataIndex: 'idProyecto', key: 'idProyecto' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Categoría', dataIndex: 'categoria', key: 'categoria' },
    { title: 'Impacto', dataIndex: 'impacto', key: 'impacto' },
    { title: 'Estado', dataIndex: 'estado', key: 'estado', render: (estado) => <Tag color={estado === 'Aprobado' ? 'green' : 'red'}>{estado}</Tag> },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewProject(record)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProject(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteProject(record.idProyecto)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestión de Proyectos</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar por nombre del proyecto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
          Crear Proyecto
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="idProyecto"
        pagination={{ pageSize: 7 }}
      />

      <AgregarProyecto
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProjectAdded={handleAddProject}
      />

      <ActualizarProyecto
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={editingProject}
        onProjectUpdated={handleProjectUpdated}
      />

      <VistaProyecto
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        project={viewingProject}
        onShowImages={(idProyecto) => {
          console.log(`Ver imágenes para el proyecto ${idProyecto}`);
        }}
      />
    </div>
  );
};

export default Proyectos;
