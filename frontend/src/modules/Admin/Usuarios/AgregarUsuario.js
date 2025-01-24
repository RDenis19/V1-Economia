import React from 'react';
import { Modal, Form, Input, Select, DatePicker, message } from 'antd';

const { Option } = Select;

const AgregarUsuario = ({ open, onClose, onUserAdded }) => {
  const [form] = Form.useForm();

  const handleCreateUser = (values) => {
    try {
      // Ajustar formato de fecha
      if (values.fecha_nacimiento) {
        values.fecha_nacimiento = values.fecha_nacimiento.format('YYYY-MM-DD');
      }

      // Crear el nuevo usuario
      const nuevoUsuario = {
        ...values,
        id: Date.now(), // Generar un ID único basado en la hora
      };

      // Obtener usuarios existentes de localStorage
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuariosActualizados = [nuevoUsuario, ...usuariosGuardados];

      // Guardar el nuevo usuario en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));

      // Notificar al componente principal
      onUserAdded(nuevoUsuario);

      // Mensaje de éxito y limpiar el formulario
      message.success('Usuario creado exitosamente');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Error al crear el usuario');
    }
  };

  return (
    <Modal
      title="Crear Usuario"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateUser}
        initialValues={{ estado: 'Activo' }}
      >
        <Form.Item
          name="nombres"
          label="Nombres"
          rules={[{ required: true, message: 'Por favor ingresa los nombres' }]}
        >
          <Input placeholder="Ingrese los nombres" />
        </Form.Item>
        <Form.Item
          name="apellido"
          label="Apellido"
          rules={[{ required: true, message: 'Por favor ingresa el apellido' }]}
        >
          <Input placeholder="Ingrese el apellido" />
        </Form.Item>
        <Form.Item
          name="cedula"
          label="Cédula"
          rules={[{ required: true, message: 'Por favor ingresa la cédula' }]}
        >
          <Input placeholder="Ingrese la cédula" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[{ required: true, type: 'email', message: 'Por favor ingresa un correo válido' }]}
        >
          <Input placeholder="Ingrese el correo electrónico" />
        </Form.Item>
        <Form.Item
          name="contraseña"
          label="Contraseña"
          rules={[{ required: true, message: 'Por favor ingresa la contraseña' }]}
        >
          <Input.Password placeholder="Ingrese la contraseña" />
        </Form.Item>
        <Form.Item
          name="rol_id"
          label="Rol"
          rules={[{ required: true, message: 'Por favor selecciona un rol' }]}
        >
          <Select placeholder="Seleccione un rol">
            <Option value="1">Administrador</Option>
            <Option value="2">Prestatario</Option>
            <Option value="3">Prestamista</Option>
            <Option value="4">Soporte</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="fecha_nacimiento"
          label="Fecha de Nacimiento"
          rules={[{ required: true, message: 'Por favor selecciona la fecha de nacimiento' }]}
        >
          <DatePicker placeholder="Seleccione la fecha" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="usuarioscol"
          label="UsuariosCol"
          rules={[{ required: false }]}
        >
          <Input placeholder="Ingrese información adicional (opcional)" />
        </Form.Item>
        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: 'Por favor selecciona el estado' }]}
        >
          <Select placeholder="Seleccione el estado">
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AgregarUsuario;
