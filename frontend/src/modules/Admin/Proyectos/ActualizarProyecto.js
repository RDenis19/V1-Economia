import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Upload, Button, Checkbox, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const ActualizarProyecto = ({ open, onClose, project, onProjectUpdated }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        ...project,
        fechaVerificacion: project.fechaVerificacion ? dayjs(project.fechaVerificacion) : null,
      });
    }
  }, [project, form]);

  const handleUpdateProject = (values) => {
    try {
      const proyectosGuardados = JSON.parse(localStorage.getItem('proyectos')) || [];
      const proyectosActualizados = proyectosGuardados.map((p) =>
        p.idProyecto === project.idProyecto
          ? {
              ...p,
              ...values,
              cronograma: values.cronograma?.file?.name || p.cronograma,
              video: values.video?.file?.name || p.video,
              documentacion: values.documentacion?.file?.name || p.documentacion,
              fechaVerificacion: values.fechaVerificacion?.format('YYYY-MM-DD') || p.fechaVerificacion,
            }
          : p
      );

      localStorage.setItem('proyectos', JSON.stringify(proyectosActualizados));

      onProjectUpdated();

      message.success('Proyecto actualizado exitosamente');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Error al actualizar el proyecto');
    }
  };

  return (
    <Modal
      title="Editar Proyecto"
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdateProject}
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

export default ActualizarProyecto;
