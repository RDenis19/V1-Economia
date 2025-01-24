import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Button, Space, Tag, Pagination } from 'antd';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import AgregarTicket from './AgregarTicket';
import ActualizarTicket from './ActualizarTicket';
import VistaTicket from './VistaTicket';
import AsistirTicket from './AsistirTicket';

const Tickets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssistModalOpen, setIsAssistModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  // Función para obtener tickets
  const fetchData = useCallback(() => {
    setLoading(true);
    const ticketsGuardados = JSON.parse(localStorage.getItem('tickets')) || [];
    const filteredData = ticketsGuardados.filter(ticket =>
      ticket.usuarioAsociado.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
    setTotalRecords(filteredData.length);
    setLoading(false);
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddTicket = (newTicket) => {
    setData([newTicket, ...data]);
    setTotalRecords(totalRecords + 1);
  };

  const handleTicketUpdated = () => {
    fetchData();
  };

  const columns = [
    {
      title: 'ID Ticket',
      dataIndex: 'idTicket',
      key: 'idTicket',
    },
    {
      title: 'Usuario Asociado',
      dataIndex: 'usuarioAsociado',
      key: 'usuarioAsociado',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={estado === 'Abierto' ? 'green' : 'red'}>{estado}</Tag>
      ),
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setSelectedTicketId(record.idTicket);
              setIsAssistModalOpen(true);
            }}
          >
            Asistir
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedTicketId(record.idTicket);
              setIsEditModalOpen(true);
            }}
          >
            Editar
          </Button>
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedTicketId(record.idTicket);
              setIsViewModalOpen(true);
            }}
          >
            Ver
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Tickets</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar tickets por usuario"
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
            Crear Ticket
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="idTicket"
      />
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={currentPage}
        total={totalRecords}
        pageSize={8}
        onChange={(page) => setCurrentPage(page)}
      />
      <AgregarTicket
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onTicketAdded={handleAddTicket}
      />
      <ActualizarTicket
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        ticketId={selectedTicketId}
        onTicketUpdated={handleTicketUpdated}
      />
      <VistaTicket
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        ticketId={selectedTicketId}
        onEdit={(id) => {
          setSelectedTicketId(id);
          setIsViewModalOpen(false);
          setIsEditModalOpen(true);
        }}
      />
      <AsistirTicket
        open={isAssistModalOpen}
        onClose={() => setIsAssistModalOpen(false)}
        ticketId={selectedTicketId}
      />
    </div>
  );
};

export default Tickets;
