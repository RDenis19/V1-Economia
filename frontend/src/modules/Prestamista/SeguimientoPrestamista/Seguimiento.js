import React, { useState, useEffect } from 'react';
import { List, Card, Button, Space, Progress, message } from 'antd';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import DetalleProyecto from './DetalleProyecto';

const Seguimiento = () => {
  const obtenerProyectosAsignados = () => {
    const proyectosGuardados = localStorage.getItem('proyectosAsignados');
    // Si no hay proyectos guardados, devolver los proyectos de ejemplo
    if (!proyectosGuardados) {
      return [
        {
          idProyecto: 1,
          nombre: 'Huerto Urbano Comunitario',
          metaFinanciacion: 5000,
          montoRecaudado: 3200,
          inversores: 12,
          descripcion: 'Crear un huerto urbano para la comunidad local.',
          ubicacion: 'Quito',
          fechaInicio: '01/09/2023',
          impacto: 'Reducción de emisiones de carbono, producción de alimentos locales.',
          metasDesarrollo: 'Energía limpia, acción climática, comunidades sostenibles.'
        },
        {
          idProyecto: 2,
          nombre: 'Reciclaje de Plásticos',
          metaFinanciacion: 7500,
          montoRecaudado: 4500,
          inversores: 20,
          descripcion: 'Implementar un programa de reciclaje de plásticos en la comunidad.',
          ubicacion: 'Guayaquil',
          fechaInicio: '15/10/2023',
          impacto: 'Reducción de residuos plásticos, concienciación ambiental.',
          metasDesarrollo: 'Consumo responsable, acción climática, vida en la tierra.'
        }
      ];
    }
    return JSON.parse(proyectosGuardados);
  };

  const [proyectosAsignados, setProyectosAsignados] = useState(obtenerProyectosAsignados());
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('proyectosAsignados', JSON.stringify(proyectosAsignados));
  }, [proyectosAsignados]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const handleInvestMore = (project) => {
    message.info(`Preparado para invertir más en el proyecto: ${project.nombre}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Seguimiento de Proyectos Asignados</h2>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={proyectosAsignados}
        renderItem={project => (
          <List.Item>
            <Card title={project.nombre}>
              <p><strong>Meta de Financiación:</strong> ${project.metaFinanciacion}</p>
              <p><strong>Monto Recaudado:</strong> ${project.montoRecaudado} por {project.inversores} inversores</p>
              <p><strong>Descripción:</strong> {project.descripcion}</p>
              <p><strong>Ubicación:</strong> {project.ubicacion}</p>
              <p><strong>Fecha de Inicio:</strong> {project.fechaInicio}</p>
              <Progress percent={(project.montoRecaudado / project.metaFinanciacion) * 100} />
              <Space style={{ marginTop: '10px' }}>
                <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(project)}>
                  Ver Detalles
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleInvestMore(project)}>
                  Invertir Más
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />
      <DetalleProyecto
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default Seguimiento;


