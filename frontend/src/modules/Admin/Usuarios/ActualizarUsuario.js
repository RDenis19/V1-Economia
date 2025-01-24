import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const ActualizarUsuario = ({ open, onClose, userId, onUserUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (userId) {
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuario = usuariosGuardados.find((u) => u.id === userId);
      if (usuario) {
        form.setFieldsValue(usuario);
      } else {
        message.error('Usuario no encontrado');
        onClose();
      }
    }
  }, [userId, form, onClose]);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuariosActualizados = usuariosGuardados.map((u) =>
          u.id === userId ? { ...u, ...values } : u
        );

        localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
        message.success('Usuario actualizado exitosamente');
        onUserUpdated(); // Notificar al componente principal para refrescar la tabla
        onClose(); // Cerrar el modal
      })
      .catch((errorInfo) => {
        message.error('Error al actualizar el usuario');
      });
  };

  return (
    <Modal
      title="Editar Usuario"
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
          name="nombres"
          label="Nombres"
          rules={[{ required: true, message: 'Por favor, ingresa los nombres' }]}
        >
          <Input placeholder="Ingrese los nombres" />
        </Form.Item>
        <Form.Item
          name="apellido"
          label="Apellido"
          rules={[{ required: true, message: 'Por favor, ingresa el apellido' }]}
        >
          <Input placeholder="Ingrese el apellido" />
        </Form.Item>
        <Form.Item
          name="cedula"
          label="Cédula"
          rules={[{ required: true, message: 'Por favor, ingresa la cédula' }]}
        >
          <Input placeholder="Ingrese la cédula" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}
        >
          <Input placeholder="Ingrese el correo electrónico" />
        </Form.Item>
        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: 'Selecciona un estado' }]}
        >
          <Select placeholder="Selecciona un estado">
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rol_id"
          label="Rol"
          rules={[{ required: true, message: 'Selecciona un rol' }]}
        >
          <Select placeholder="Selecciona un rol">
            <Option value={1}>Administrador</Option>
            <Option value={2}>Prestatario</Option>
            <Option value={3}>Prestamista</Option>
            <Option value={4}>Soporte</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ActualizarUsuario;
