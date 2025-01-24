import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Select, message, Modal, Form, DatePicker, Upload, Checkbox, Descriptions, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';

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
  const [editingProjectId, setEditingProjectId] = useState(null);
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

  const handleAddProject = () => {
    form
      .validateFields()
      .then((values) => {
        const nuevoProyecto = {
          ...values,
          cronograma: values.cronograma?.file?.name || null,
          video: values.video?.file?.name || null,
          documentacion: values.documentacion?.file?.name || null,
          idProyecto: Date.now(),
          fechaVerificacion: values.fechaVerificacion?.format('YYYY-MM-DD') || null,
        };
        const updatedProjects = [nuevoProyecto, ...proyectos];
        setProyectos(updatedProjects);
        message.success('Proyecto agregado exitosamente');
        setIsAddModalOpen(false);
        form.resetFields();
      })
      .catch(() => {
        message.error('Por favor, complete todos los campos obligatorios correctamente.');
      });
  };

  const handleEditProject = (values) => {
    const proyectosActualizados = proyectos.map((project) =>
      project.idProyecto === editingProjectId
        ? {
            ...project,
            ...values,
            cronograma: values.cronograma?.file?.name || project.cronograma,
            video: values.video?.file?.name || project.video,
            documentacion: values.documentacion?.file?.name || project.documentacion,
            fechaVerificacion: values.fechaVerificacion?.format('YYYY-MM-DD') || project.fechaVerificacion,
          }
        : project
    );
    setProyectos(proyectosActualizados);
    message.success('Proyecto actualizado exitosamente');
    setIsEditModalOpen(false);
    form.resetFields();
  };

  const handleViewProject = (project) => {
    setViewingProject(project);
    setIsViewModalOpen(true);
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
            onClick={() => {
              setEditingProjectId(record.idProyecto);
              form.setFieldsValue(record);
              setIsEditModalOpen(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              setProyectos(proyectos.filter((project) => project.idProyecto !== record.idProyecto));
              message.success('Proyecto eliminado');
            }}
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

      {/* Modal para agregar proyecto */}
      <Modal
        title="Crear Proyecto"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={handleAddProject}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nombre" label="Nombre del Proyecto" rules={[{ required: true, message: 'Ingrese el nombre del proyecto' }]}> <Input /> </Form.Item>
          <Form.Item name="descripcion" label="Descripción del Proyecto" rules={[{ required: true, message: 'Ingrese la descripción' }]}> <Input.TextArea /> </Form.Item>
          <Form.Item name="cronograma" label="Subir Cronograma de Actividades"> <Upload> <Button icon={<UploadOutlined />}>Subir</Button> </Upload> </Form.Item>
          <Form.Item name="categoria" label="Categoría" rules={[{ required: true, message: 'Seleccione una categoría' }]}> 
            <Select>
              <Option value="Social">Social</Option>
              <Option value="Comunitario">Comunitario</Option>
              <Option value="Ambiental">Ambiental</Option>
            </Select>
          </Form.Item>
          <Form.Item name="ciudad" label="Ciudad" rules={[{ required: true, message: 'Ingrese la ciudad' }]}> <Input /> </Form.Item>
          <Form.Item name="provincia" label="Provincia" rules={[{ required: true, message: 'Ingrese la provincia' }]}> <Input /> </Form.Item>
          <Form.Item name="progreso" label="Progreso General" rules={[{ required: true, message: 'Ingrese el progreso general' }]}> <Input /> </Form.Item>
          <Form.Item name="impacto" label="Impacto Social" rules={[{ required: true, message: 'Ingrese el impacto' }]}> <Input /> </Form.Item>
          <Form.Item name="monto" label="Monto Solicitado" rules={[{ required: true, message: 'Ingrese el monto solicitado' }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="plazo" label="Plazo del Proyecto" rules={[{ required: true, message: 'Ingrese el plazo del proyecto' }]}> <Input /> </Form.Item>
          <Form.Item name="retorno" label="Tipo de Retorno Pactado" rules={[{ required: true, message: 'Seleccione un tipo de retorno' }]}> 
            <Select>
              <Option value="Recompensa">Recompensa</Option>
              <Option value="Donación">Donación</Option>
              <Option value="Inversión">Inversión</Option>
            </Select>
          </Form.Item>
          <Form.Item name="video" label="Subir Video"> <Upload> <Button icon={<UploadOutlined />}>Subir</Button> </Upload> </Form.Item>
          <Form.Item name="documentacion" label="Documentación Complementaria"> <Upload> <Button icon={<UploadOutlined />}>Subir</Button> </Upload> </Form.Item>
          <Form.Item name="terminos" valuePropName="checked" rules={[{ required: true, message: 'Debe aceptar los términos y condiciones' }]}> <Checkbox>Acepto los términos y condiciones de la transacción</Checkbox> </Form.Item>
          <Form.Item name="desarrolloEconomico" label="Desarrollo Económico" rules={[{ required: true, message: 'Seleccione el desarrollo económico' }]}> 
            <Select>
              <Option value="Mensual">Mensual</Option>
              <Option value="Trimestral">Trimestral</Option>
              <Option value="Semestral">Semestral</Option>
            </Select>
          </Form.Item>
          <Form.Item name="estado" label="Estatus de Verificación" rules={[{ required: true, message: 'Seleccione el estatus' }]}> 
            <Select>
              <Option value="Pendiente">Pendiente</Option>
              <Option value="Aprobado">Aprobado</Option>
              <Option value="Rechazado">Rechazado</Option>
            </Select>
          </Form.Item>
          <Form.Item name="fechaVerificacion" label="Fecha de Verificación" rules={[{ required: true, message: 'Seleccione la fecha' }]}> <DatePicker style={{ width: '100%' }} /> </Form.Item>
        </Form>
      </Modal>

      {/* Modal para editar proyecto */}
      <Modal
        title="Editar Proyecto"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleEditProject}>
          {/* Campos similares al modal de agregar */}
          <Form.Item name="nombre" label="Nombre del Proyecto" rules={[{ required: true, message: 'Ingrese el nombre del proyecto' }]}> <Input /> </Form.Item>
          <Form.Item name="descripcion" label="Descripción del Proyecto" rules={[{ required: true, message: 'Ingrese la descripción' }]}> <Input.TextArea /> </Form.Item>
          <Form.Item name="cronograma" label="Subir Cronograma de Actividades"> <Upload> <Button icon={<UploadOutlined />}>Subir</Button> </Upload> </Form.Item>
          <Form.Item name="categoria" label="Categoría" rules={[{ required: true, message: 'Seleccione una categoría' }]}> 
            <Select>
              <Option value="Social">Social</Option>
              <Option value="Comunitario">Comunitario</Option>
              <Option value="Ambiental">Ambiental</Option>
            </Select>
          </Form.Item>
          <Form.Item name="ciudad" label="Ciudad" rules={[{ required: true, message: 'Ingrese la ciudad' }]}> <Input /> </Form.Item>
          <Form.Item name="provincia" label="Provincia" rules={[{ required: true, message: 'Ingrese la provincia' }]}> <Input /> </Form.Item>
          <Form.Item name="progreso" label="Progreso General" rules={[{ required: true, message: 'Ingrese el progreso general' }]}> <Input /> </Form.Item>
          <Form.Item name="impacto" label="Impacto Social" rules={[{ required: true, message: 'Ingrese el impacto' }]}> <Input /> </Form.Item>
          <Form.Item name="monto" label="Monto Solicitado" rules={[{ required: true, message: 'Ingrese el monto solicitado' }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="plazo" label="Plazo del Proyecto" rules={[{ required: true, message: 'Ingrese el plazo del proyecto' }]}> <Input /> </Form.Item>
          <Form.Item name="retorno" label="Tipo de Retorno Pactado" rules={[{ required: true, message: 'Seleccione un tipo de retorno' }]}> 
            <Select>
              <Option value="Recompensa">Recompensa</Option>
              <Option value="Donación">Donación</Option>
              <Option value="Inversión">Inversión</Option>
            </Select>
          </Form.Item>
          <Form.Item name="video" label="Subir Video"> <Upload> <Button icon={<UploadOutlined />}>Subir</Button> </Upload> </Form.Item>
          <Form.Item name="documentacion" label="Documentación Complementaria"> <Upload> <Button icon={<UploadOutlined />}>Subir</Button> </Upload> </Form.Item>
          <Form.Item name="terminos" valuePropName="checked" rules={[{ required: true, message: 'Debe aceptar los términos y condiciones' }]}> <Checkbox>Acepto los términos y condiciones de la transacción</Checkbox> </Form.Item>
          <Form.Item name="desarrolloEconomico" label="Desarrollo Económico" rules={[{ required: true, message: 'Seleccione el desarrollo económico' }]}> 
            <Select>
              <Option value="Mensual">Mensual</Option>
              <Option value="Trimestral">Trimestral</Option>
              <Option value="Semestral">Semestral</Option>
            </Select>
          </Form.Item>
          <Form.Item name="estado" label="Estatus de Verificación" rules={[{ required: true, message: 'Seleccione el estatus' }]}> 
            <Select>
              <Option value="Pendiente">Pendiente</Option>
              <Option value="Aprobado">Aprobado</Option>
              <Option value="Rechazado">Rechazado</Option>
            </Select>
          </Form.Item>
          <Form.Item name="fechaVerificacion" label="Fecha de Verificación" rules={[{ required: true, message: 'Seleccione la fecha' }]}> <DatePicker style={{ width: '100%' }} /> </Form.Item>
        </Form>
      </Modal>

      {/* Modal para ver proyecto */}
      <Modal
        title="Detalles del Proyecto"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
      >
        {viewingProject ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID Proyecto">{viewingProject.idProyecto}</Descriptions.Item>
            <Descriptions.Item label="Nombre">{viewingProject.nombre}</Descriptions.Item>
            <Descriptions.Item label="Descripción">{viewingProject.descripcion}</Descriptions.Item>
            <Descriptions.Item label="Categoría">{viewingProject.categoria}</Descriptions.Item>
            <Descriptions.Item label="Ciudad">{viewingProject.ciudad}</Descriptions.Item>
            <Descriptions.Item label="Provincia">{viewingProject.provincia}</Descriptions.Item>
            <Descriptions.Item label="Progreso General">{viewingProject.progreso}</Descriptions.Item>
            <Descriptions.Item label="Impacto Social">{viewingProject.impacto}</Descriptions.Item>
            <Descriptions.Item label="Monto Solicitado">{viewingProject.monto}</Descriptions.Item>
            <Descriptions.Item label="Plazo del Proyecto">{viewingProject.plazo}</Descriptions.Item>
            <Descriptions.Item label="Tipo de Retorno Pactado">{viewingProject.retorno}</Descriptions.Item>
            <Descriptions.Item label="Estatus de Verificación">{viewingProject.estado}</Descriptions.Item>
            <Descriptions.Item label="Fecha de Verificación">{viewingProject.fechaVerificacion}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Spin tip="Cargando..." />
        )}
      </Modal>
    </div>
  );
};

export default Proyectos;
