import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Button, Space, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import AgregarInversion from './AgregarInversion';
import ActualizarInversion from './ActualizarInversion';
import VistaInversion from './VistaInversion';

const Inversiones = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvestmentId, setSelectedInvestmentId] = useState(null);

  // Función para obtener inversiones
  const fetchData = useCallback(() => {
    setLoading(true);
    const inversionesGuardadas = JSON.parse(localStorage.getItem('inversiones')) || [];
    const filteredData = inversionesGuardadas.filter(investment =>
      investment.idProyecto.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
    setTotalRecords(filteredData.length);
    setLoading(false);
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddInvestment = (newInvestment) => {
    setData([newInvestment, ...data]);
    setTotalRecords(totalRecords + 1);
  };

  const handleInvestmentUpdated = () => {
    fetchData();
  };

  const columns = [
    {
      title: 'ID Proyecto',
      dataIndex: 'idProyecto',
      key: 'idProyecto',
    },
    {
      title: 'ID Prestamista',
      dataIndex: 'idPrestamista',
      key: 'idPrestamista',
    },
    {
      title: 'Monto Invertido',
      dataIndex: 'montoInvertido',
      key: 'montoInvertido',
    },
    {
      title: 'Tipo Retorno',
      dataIndex: 'tipoRetorno',
      key: 'tipoRetorno',
    },
    {
      title: 'Método de Pago',
      dataIndex: 'metodoPago',
      key: 'metodoPago',
    },
    {
      title: 'Términos y Condiciones',
      dataIndex: 'terminos',
      key: 'terminos',
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedInvestmentId(record.id);
              setIsEditModalOpen(true);
            }}
          />
          <Button icon={<DeleteOutlined />} />
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedInvestmentId(record.id);
              setIsViewModalOpen(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Inversiones</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar inversiones por ID Proyecto"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Space>
          <Button icon={<FilterOutlined />}>Filtrar</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Crear Inversión
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="idProyecto"
      />
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={currentPage}
        total={totalRecords}
        pageSize={8}
        onChange={(page) => setCurrentPage(page)}
      />
      <AgregarInversion
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onInvestmentAdded={handleAddInvestment}
      />
      <ActualizarInversion
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        investmentId={selectedInvestmentId}
        onInvestmentUpdated={handleInvestmentUpdated}
      />
      <VistaInversion
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        investmentId={selectedInvestmentId}
      />
    </div>
  );
};

export default Inversiones;
