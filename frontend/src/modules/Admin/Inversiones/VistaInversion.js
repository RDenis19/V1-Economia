import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Spin, message } from 'antd';

const VistaInversion = ({ open, onClose, investmentId }) => {
  const [investmentData, setInvestmentData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (investmentId) {
      setLoading(true);
      const inversionesGuardadas = JSON.parse(localStorage.getItem('inversiones')) || [];
      const inversion = inversionesGuardadas.find((i) => i.id === investmentId);
      if (inversion) {
        setInvestmentData(inversion);
      } else {
        message.error('Inversión no encontrada');
        onClose();
      }
      setLoading(false);
    }
  }, [investmentId, onClose]);

  return (
    <Modal
      title="Información de la Inversión"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {loading ? (
        <Spin tip="Cargando datos de la inversión..." />
      ) : investmentData ? (
        <Descriptions bordered column={1} layout="vertical">
          <Descriptions.Item label="ID Proyecto">{investmentData.idProyecto}</Descriptions.Item>
          <Descriptions.Item label="ID Prestamista">{investmentData.idPrestamista}</Descriptions.Item>
          <Descriptions.Item label="Monto Invertido">{investmentData.montoInvertido}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Transacción">{investmentData.fechaTransaccion}</Descriptions.Item>
          <Descriptions.Item label="Tipo de Retorno">{investmentData.tipoRetorno}</Descriptions.Item>
          <Descriptions.Item label="Método de Pago">{investmentData.metodoPago}</Descriptions.Item>
          <Descriptions.Item label="Términos y Condiciones">{investmentData.terminos ? 'Aceptado' : 'No Aceptado'}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No se encontraron datos de la inversión.</p>
      )}
    </Modal>
  );
};

export default VistaInversion;
