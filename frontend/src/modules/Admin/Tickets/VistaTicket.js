import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Spin, message, Button, Space } from 'antd';

const VistaTicket = ({ open, onClose, ticketId, onEdit }) => {
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticketId) {
      setLoading(true);
      const ticketsGuardados = JSON.parse(localStorage.getItem('tickets')) || [];
      const ticket = ticketsGuardados.find((t) => t.id === ticketId);
      if (ticket) {
        setTicketData(ticket);
      } else {
        message.error('Ticket no encontrado');
        onClose();
      }
      setLoading(false);
    }
  }, [ticketId, onClose]);

  return (
    <Modal
      title="Información del Ticket"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {loading ? (
        <Spin tip="Cargando datos del ticket..." />
      ) : ticketData ? (
        <Descriptions bordered column={1} layout="vertical">
          <Descriptions.Item label="ID Ticket">{ticketData.id}</Descriptions.Item>
          <Descriptions.Item label="Usuario Asociado">{ticketData.usuarioAsociado}</Descriptions.Item>
          <Descriptions.Item label="Descripción">{ticketData.descripcion}</Descriptions.Item>
          <Descriptions.Item label="Prioridad">{ticketData.prioridad}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Creación">{ticketData.fecha_creacion}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Vencimiento">{ticketData.fecha_vencimiento}</Descriptions.Item>
          <Descriptions.Item label="Estado">{ticketData.estado}</Descriptions.Item>
          <Descriptions.Item>
            <Space>
              <Button
                type="primary"
                onClick={() => onEdit(ticketData.id)}
              >
                Editar
              </Button>
              <Button onClick={onClose}>Cerrar</Button>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No se encontraron datos del ticket.</p>
      )}
    </Modal>
  );
};

export default VistaTicket;
