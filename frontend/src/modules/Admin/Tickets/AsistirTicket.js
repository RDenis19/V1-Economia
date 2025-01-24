import React, { useState } from 'react';
import { Modal, Input, Button, List, Avatar } from 'antd';

const { TextArea } = Input;

const mensajesMock = [
  { id: 1, usuario: 'Soporte', mensaje: '¿En qué puedo ayudarte hoy?', fecha: '2025-01-24 10:30' },
  { id: 2, usuario: 'Usuario', mensaje: 'Tengo un problema con mi cuenta.', fecha: '2025-01-24 10:31' },
];

const AsistirTicket = ({ open, onClose, ticketId }) => {
  const [mensajes, setMensajes] = useState(mensajesMock);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim() !== '') {
      const nuevo = {
        id: mensajes.length + 1,
        usuario: 'Soporte',
        mensaje: nuevoMensaje,
        fecha: new Date().toLocaleString(),
      };
      setMensajes([...mensajes, nuevo]);
      setNuevoMensaje('');
    }
  };

  return (
    <Modal
      title={`Asistir Ticket ${ticketId}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <List
        itemLayout="horizontal"
        dataSource={mensajes}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.usuario.charAt(0)}</Avatar>}
              title={<span>{item.usuario} - <small>{item.fecha}</small></span>}
              description={item.mensaje}
            />
          </List.Item>
        )}
        style={{ marginBottom: '20px', maxHeight: '400px', overflowY: 'scroll' }}
      />
      <TextArea
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        rows={4}
        placeholder="Escribe un mensaje..."
      />
      <Button type="primary" onClick={handleEnviarMensaje} style={{ marginTop: '10px' }}>
        Enviar
      </Button>
    </Modal>
  );
};

export default AsistirTicket;
