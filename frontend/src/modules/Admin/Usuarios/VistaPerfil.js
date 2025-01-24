import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Spin } from 'antd';

const VistaPerfil = ({ open, onClose, userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuario = usuariosGuardados.find((u) => u.id === userId);
      setUserData(usuario || null);
      setLoading(false);
    }
  }, [userId]);

  return (
    <Modal
      title="Información del Usuario"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {loading ? (
        <Spin tip="Cargando datos del usuario..." />
      ) : userData ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{userData.id}</Descriptions.Item>
          <Descriptions.Item label="Nombres">{userData.nombres}</Descriptions.Item>
          <Descriptions.Item label="Apellido">{userData.apellido}</Descriptions.Item>
          <Descriptions.Item label="Cédula">{userData.cedula}</Descriptions.Item>
          <Descriptions.Item label="Correo Electrónico">{userData.email}</Descriptions.Item>
          <Descriptions.Item label="Rol">
            {userData.rol_id === 1
              ? 'Administrador'
              : userData.rol_id === 2
              ? 'Prestatario'
              : userData.rol_id === 3
              ? 'Prestamista'
              : 'Soporte'}
          </Descriptions.Item>
          <Descriptions.Item label="Estado">{userData.estado}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Nacimiento">{userData.fecha_nacimiento}</Descriptions.Item>
          <Descriptions.Item label="Información Adicional">{userData.usuarioscol || 'N/A'}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </Modal>
  );
};

export default VistaPerfil;
