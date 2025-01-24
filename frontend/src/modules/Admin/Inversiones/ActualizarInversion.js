import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Checkbox, message } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const ActualizarInversion = ({ open, onClose, investmentId, onInvestmentUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (investmentId) {
      const inversionesGuardadas = JSON.parse(localStorage.getItem('inversiones')) || [];
      const inversion = inversionesGuardadas.find((i) => i.id === investmentId);
      if (inversion) {
        inversion.fechaTransaccion = inversion.fechaTransaccion ? dayjs(inversion.fechaTransaccion) : null;
        form.setFieldsValue(inversion);
      } else {
        message.error('Inversión no encontrada');
        onClose();
      }
    }
  }, [investmentId, form, onClose]);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        const inversionesGuardadas = JSON.parse(localStorage.getItem('inversiones')) || [];
        const inversionesActualizadas = inversionesGuardadas.map((i) =>
          i.id === investmentId ? { ...i, ...values, fechaTransaccion: values.fechaTransaccion.format('YYYY-MM-DD') } : i
        );

        localStorage.setItem('inversiones', JSON.stringify(inversionesActualizadas));
        message.success('Inversión actualizada exitosamente');
        onInvestmentUpdated(); // Notificar al componente principal para refrescar la tabla
        onClose(); // Cerrar el modal
      })
      .catch(() => {
        message.error('Error al actualizar la inversión');
      });
  };

  return (
    <Modal
      title="Editar Inversión"
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

export default ActualizarInversion;
