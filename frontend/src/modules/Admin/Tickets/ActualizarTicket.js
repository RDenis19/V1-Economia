import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, message } from 'antd';

const { Option } = Select;

const ActualizarTicket = ({ open, onClose, ticketId, onTicketUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (ticketId) {
      const ticketsGuardados = JSON.parse(localStorage.getItem('tickets')) || [];
      const ticket = ticketsGuardados.find((t) => t.id === ticketId);
      if (ticket) {
        ticket.fecha_vencimiento = ticket.fecha_vencimiento ? new Date(ticket.fecha_vencimiento) : null;
        form.setFieldsValue(ticket);
      } else {
        message.error('Ticket no encontrado');
        onClose();
      }
    }
  }, [ticketId, form, onClose]);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        const ticketsGuardados = JSON.parse(localStorage.getItem('tickets')) || [];
        const ticketsActualizados = ticketsGuardados.map((t) =>
          t.id === ticketId ? { ...t, ...values, fecha_vencimiento: values.fecha_vencimiento.format('YYYY-MM-DD') } : t
        );

        localStorage.setItem('tickets', JSON.stringify(ticketsActualizados));
        message.success('Ticket actualizado exitosamente');
        onTicketUpdated(); // Notificar al componente principal para refrescar la tabla
        onClose(); // Cerrar el modal
      })
      .catch(() => {
        message.error('Error al actualizar el ticket');
      });
  };

  return (
    <Modal
      title="Editar Ticket"
      open={open}
      onCancel={onClose}
      onOk={handleUpdate}
      okText="Actualizar"
      cancelText="Cancelar"
      centered
      width={600}
    >
      <Form form={form} layout="vertical">
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
        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: 'Selecciona un estado' }]}
        >
          <Select placeholder="Selecciona un estado">
            <Option value="Abierto">Abierto</Option>
            <Option value="Cerrado">Cerrado</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ActualizarTicket;
