import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Checkbox, message } from 'antd';

const { Option } = Select;

const AgregarInversion = ({ open, onClose, onInvestmentAdded }) => {
  const [form] = Form.useForm();

  const handleCreateInvestment = (values) => {
    try {
      // Crear la nueva inversión
      const nuevaInversion = {
        ...values,
        id: Date.now(), // Generar un ID único basado en la hora
        fechaTransaccion: values.fechaTransaccion.format('YYYY-MM-DD'), // Formatear la fecha de transacción
      };

      // Obtener inversiones existentes de localStorage
      const inversionesGuardadas = JSON.parse(localStorage.getItem('inversiones')) || [];
      const inversionesActualizadas = [nuevaInversion, ...inversionesGuardadas];

      // Guardar la nueva inversión en localStorage
      localStorage.setItem('inversiones', JSON.stringify(inversionesActualizadas));

      // Notificar al componente principal
      onInvestmentAdded(nuevaInversion);

      // Mensaje de éxito y limpiar el formulario
      message.success('Inversión creada exitosamente');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Error al crear la inversión');
    }
  };

  return (
    <Modal
      title="Crear Inversión"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCreateInvestment}
      >
        <Form.Item
          name="idProyecto"
          label="ID del Proyecto"
          rules={[{ required: true, message: 'Por favor ingresa el ID del proyecto' }]}
        >
          <Input placeholder="Ingrese el ID del proyecto" />
        </Form.Item>
        <Form.Item
          name="idPrestamista"
          label="ID del Prestamista"
          rules={[{ required: true, message: 'Por favor ingresa el ID del prestamista' }]}
        >
          <Input placeholder="Ingrese el ID del prestamista" />
        </Form.Item>
        <Form.Item
          name="montoInvertido"
          label="Monto de Inversión"
          rules={[{ required: true, message: 'Por favor ingresa el monto de inversión' }]}
        >
          <Input placeholder="Ingrese el monto de inversión" />
        </Form.Item>
        <Form.Item
          name="fechaTransaccion"
          label="Fecha de la Transacción"
          rules={[{ required: true, message: 'Por favor selecciona la fecha de la transacción' }]}
        >
          <DatePicker placeholder="Seleccione la fecha" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="tipoRetorno"
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
          name="metodoPago"
          label="Método de Pago"
          rules={[{ required: true, message: 'Por favor selecciona el método de pago' }]}
        >
          <Select placeholder="Seleccione el método de pago">
            <Option value="Transferencia bancaria">Transferencia bancaria</Option>
            <Option value="Tarjeta de crédito">Tarjeta de crédito</Option>
            <Option value="Billetera digital">Billetera digital</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="terminos"
          valuePropName="checked"
          rules={[{ required: true, message: 'Debes aceptar los términos y condiciones' }]}
        >
          <Checkbox>Acepto los términos y condiciones de la transacción</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AgregarInversion;
