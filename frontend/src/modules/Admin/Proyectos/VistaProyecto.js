import React from 'react';
import { Modal, Descriptions, Button, Space, message, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const VistaProyecto = ({ open, onClose, project, onShowImages }) => {
  if (!project) {
    return (
      <Modal
        title="Detalles del Proyecto"
        open={open}
        onCancel={onClose}
        footer={null}
      >
        <Spin tip="Cargando..." />
      </Modal>
    );
  }

  return (
    <Modal
      title="Detalles del Proyecto"
      open={open}
      onCancel={onClose}
      footer={
        <Space>
          <Button type="primary" onClick={() => onShowImages(project.idProyecto)}>
            Ver Imágenes
          </Button>
          <Button onClick={onClose}>Cerrar</Button>
        </Space>
      }
      width={800}
    >
      <Descriptions bordered column={1} layout="vertical">
        <Descriptions.Item label="ID Proyecto">{project.idProyecto}</Descriptions.Item>
        <Descriptions.Item label="Nombre">{project.nombre}</Descriptions.Item>
        <Descriptions.Item label="Descripción">{project.descripcion}</Descriptions.Item>
        <Descriptions.Item label="Categoría">{project.categoria}</Descriptions.Item>
        <Descriptions.Item label="Ciudad">{project.ciudad}</Descriptions.Item>
        <Descriptions.Item label="Provincia">{project.provincia}</Descriptions.Item>
        <Descriptions.Item label="Progreso General">{project.progreso}</Descriptions.Item>
        <Descriptions.Item label="Impacto Social">{project.impacto}</Descriptions.Item>
        <Descriptions.Item label="Monto Solicitado">{project.monto}</Descriptions.Item>
        <Descriptions.Item label="Plazo del Proyecto">{project.plazo}</Descriptions.Item>
        <Descriptions.Item label="Tipo de Retorno Pactado">{project.retorno}</Descriptions.Item>
        <Descriptions.Item label="Estatus de Verificación">{project.estado}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Verificación">{project.fechaVerificacion}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default VistaProyecto;
