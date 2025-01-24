import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Upload, Button, Checkbox, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AgregarProyecto = ({ open, onClose, onProjectAdded }) => {
  const [form] = Form.useForm();

  const handleCreateProject = (values) => {
    try {
      const nuevoProyecto = {
        ...values,
        cronograma: values.cronograma?.file?.name || null,
        video: values.video?.file?.name || null,
        documentacion: values.documentacion?.file?.name || null,
        idProyecto: Date.now(), // Generar un ID único basado en la hora
        fechaVerificacion: values.fechaVerificacion?.format('YYYY-MM-DD') || null,
      };

      // Obtener proyectos existentes de localStorage
      const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
      const proyectosActualizados = [nuevoProyecto, ...proyectosGuardados];

      // Guardar el nuevo proyecto en localStorage
      localStorage.setItem('proyectos', JSON.stringify(proyectosActualizados));

      // Notificar al componente principal
      onProjectAdded(nuevoProyecto);

      // Mensaje de éxito y limpiar el formulario
      message.success('Proyecto creado exitosamente');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Error al crear el proyecto');
    }
  };

  return (
    <Modal
      title="Crear Proyecto"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateProject}
      >
        <Form.Item
          name="nombre"
          label="Nombre del Proyecto"
          rules={[{ required: true, message: 'Por favor ingresa el nombre del proyecto' }]}
        >
          <Input placeholder="Ingrese el nombre del proyecto" />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción del Proyecto"
          rules={[{ required: true, message: 'Por favor ingresa la descripción del proyecto' }]}
        >
          <Input.TextArea placeholder="Ingrese la descripción del proyecto" />
        </Form.Item>
        <Form.Item
          name="cronograma"
          label="Subir Cronograma de Actividades"
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Subir</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="categoria"
          label="Categoría"
          rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
        >
          <Select placeholder="Seleccione la categoría">
            <Option value="Social">Social</Option>
            <Option value="Comunitario">Comunitario</Option>
            <Option value="Ambiental">Ambiental</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="ciudad"
          label="Ciudad"
          rules={[{ required: true, message: 'Por favor ingresa la ciudad' }]}
        >
          <Input placeholder="Ingrese la ciudad" />
        </Form.Item>
        <Form.Item
          name="provincia"
          label="Provincia"
          rules={[{ required: true, message: 'Por favor ingresa la provincia' }]}
        >
          <Input placeholder="Ingrese la provincia" />
        </Form.Item>
        <Form.Item
          name="progreso"
          label="Progreso General"
          rules={[{ required: true, message: 'Por favor ingresa el progreso general' }]}
        >
          <Input placeholder="Ingrese el progreso general" />
        </Form.Item>
        <Form.Item
          name="impacto"
          label="Impacto Social"
          rules={[{ required: true, message: 'Por favor ingresa el impacto social' }]}
        >
          <Input placeholder="Ingrese el impacto social" />
        </Form.Item>
        <Form.Item
          name="monto"
          label="Monto Solicitado"
          rules={[{ required: true, message: 'Por favor ingresa el monto solicitado' }]}
        >
          <Input type="number" placeholder="Ingrese el monto solicitado" />
        </Form.Item>
        <Form.Item
          name="plazo"
          label="Plazo del Proyecto"
          rules={[{ required: true, message: 'Por favor ingresa el plazo del proyecto' }]}
        >
          <Input placeholder="Ingrese el plazo del proyecto" />
        </Form.Item>
        <Form.Item
          name="retorno"
          label="Tipo de Retorno Pactado"
          rules={[{ required: true, message: 'Por favor selecciona el tipo de retorno' }]}
        >
          <Select placeholder="Seleccione el tipo de retorno">
            <Option value="Recompensa">Recompensa</Option>
            <Option value="Donación">Donación</Option>
            <Option value="Inversión">Inversión</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="video"
          label="Subir Video"
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Subir</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="documentacion"
          label="Documentación Complementaria"
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Subir</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="terminos"
          valuePropName="checked"
          rules={[{ required: true, message: 'Debes aceptar los términos y condiciones' }]}
        >
          <Checkbox>Acepto los términos y condiciones de la transacción</Checkbox>
        </Form.Item>
        <Form.Item
          name="desarrolloEconomico"
          label="Desarrollo Económico"
          rules={[{ required: true, message: 'Por favor selecciona la frecuencia de actualizaciones' }]}
        >
          <Select placeholder="Seleccione la frecuencia de actualizaciones">
            <Option value="Mensual">Mensual</Option>
            <Option value="Trimestral">Trimestral</Option>
            <Option value="Semestral">Semestral</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="estado"
          label="Estatus de Verificación"
          rules={[{ required: true, message: 'Por favor selecciona el estatus de verificación' }]}
        >
          <Select placeholder="Seleccione el estatus de verificación">
            <Option value="Pendiente">Pendiente</Option>
            <Option value="Aprobado">Aprobado</Option>
            <Option value="Rechazado">Rechazado</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fechaVerificacion"
          label="Fecha de Verificación"
          rules={[{ required: true, message: 'Por favor selecciona la fecha de verificación' }]}
        >
          <DatePicker style={{ width: '100%' }} placeholder="Seleccione la fecha de verificación" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AgregarProyecto;
