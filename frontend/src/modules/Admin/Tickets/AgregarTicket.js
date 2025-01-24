import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, message } from 'antd';

const { Option } = Select;

const AgregarTicket = ({ open, onClose, onTicketAdded }) => {
  const [form] = Form.useForm();

  const handleCreateTicket = (values) => {
    try {
      // Crear el nuevo ticket
      const nuevoTicket = {
        ...values,
        id: Date.now(), // Generar un ID único basado en la hora
        estado: 'Abierto', // Estado inicial del ticket
        fecha_creacion: new Date().toISOString(), // Fecha de creación
      };

      // Obtener tickets existentes de localStorage
      const ticketsGuardados = JSON.parse(localStorage.getItem('tickets')) || [];
      const ticketsActualizados = [nuevoTicket, ...ticketsGuardados];

      // Guardar el nuevo ticket en localStorage
      localStorage.setItem('tickets', JSON.stringify(ticketsActualizados));

      // Notificar al componente principal
      onTicketAdded(nuevoTicket);

      // Mensaje de éxito y limpiar el formulario
      message.success('Ticket creado exitosamente');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Error al crear el ticket');
    }
  };

  return (
    <Modal
      title="Crear Ticket"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateTicket}
      >
        <Form.Item
          name="usuarioAsociado"
          label="Usuario Asociado"
          rules={[{ required: true, message: 'Por favor ingresa el usuario asociado' }]}
        >
          <Input placeholder="Ingrese el usuario asociado" />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'Por favor ingresa la descripción del ticket' }]}
        >
          <Input.TextArea placeholder="Ingrese la descripción del ticket" />
        </Form.Item>
        <Form.Item
          name="prioridad"
          label="Prioridad"
          rules={[{ required: true, message: 'Por favor selecciona la prioridad' }]}
        >
          <Select placeholder="Seleccione la prioridad">
            <Option value="Baja">Baja</Option>
            <Option value="Media">Media</Option>
            <Option value="Alta">Alta</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fecha_vencimiento"
          label="Fecha de Vencimiento"
          rules={[{ required: true, message: 'Por favor selecciona la fecha de vencimiento' }]}
        >
          <DatePicker placeholder="Seleccione la fecha" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AgregarTicket;
