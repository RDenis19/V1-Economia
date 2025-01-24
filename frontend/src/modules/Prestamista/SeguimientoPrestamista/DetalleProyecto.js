import React from 'react';
import { Modal, Descriptions, Progress, Button, Space } from 'antd';

const DetalleProyecto = ({ open, onClose, project }) => {
  if (!project) {
    return null;
  }

  return (
    <Modal
      title="Detalles del Proyecto"
      open={open}
      onCancel={onClose}
      footer={
        <Space>
          <Button type="primary" onClick={() => console.log(`Invertir más en el proyecto ${project.nombre}`)}>
            Invertir Más
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
        <Descriptions.Item label="Ubicación">{project.ubicacion}</Descriptions.Item>
        <Descriptions.Item label="Fecha de Inicio">{project.fechaInicio}</Descriptions.Item>
        <Descriptions.Item label="Meta de Financiación">${project.metaFinanciacion}</Descriptions.Item>
        <Descriptions.Item label="Monto Recaudado">${project.montoRecaudado}</Descriptions.Item>
        <Descriptions.Item>
          <Progress percent={(project.montoRecaudado / project.metaFinanciacion) * 100} />
        </Descriptions.Item>
        <Descriptions.Item label="Impacto del Proyecto">
          {project.impacto}
        </Descriptions.Item>
        <Descriptions.Item label="Metas de Desarrollo Sostenible">
          {project.metasDesarrollo}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default DetalleProyecto;
