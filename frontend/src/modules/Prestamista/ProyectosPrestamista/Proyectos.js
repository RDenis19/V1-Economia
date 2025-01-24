import React, { useState } from 'react';
import { Card, Button, Modal, Progress, Typography, Input } from 'antd';

const { Meta } = Card;
const { Title, Paragraph } = Typography;
const { Search } = Input;

const projects = [
  {
    id: 1,
    category: 'Tecnológico',
    title: 'EcoJóvenes Inversores',
    description: 'Es una empresa joven y dinámica enfocada en proyectos de reciclaje y sostenibilidad ambiental. Apoya un futuro verde y sostenible invirtiendo en soluciones innovadoras que benefician a la comunidad y al planeta.',
    raised: 1500,
    progress: 64,
    image: 'https://images.unsplash.com/photo-1613858749733-3a3e456e3d9e?q=80&w=300&h=200&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'Tecnológico',
    title: 'SmartGreen City',
    description: 'Un proyecto innovador para transformar las ciudades en entornos sostenibles mediante tecnología inteligente.',
    raised: 2500,
    progress: 75,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=300&h=200&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Tecnológico',
    title: 'Reciclaje Inteligente',
    description: 'Plataforma tecnológica para facilitar el reciclaje en comunidades urbanas.',
    raised: 3000,
    progress: 50,
    image: 'https://images.unsplash.com/photo-1556761175-129418cb2dfe?q=80&w=300&h=200&auto=format&fit=crop',
  },
  {
    id: 4,
    category: 'Social',
    title: 'Conexión Rural',
    description: 'Iniciativa para conectar comunidades rurales con acceso a internet y recursos educativos.',
    raised: 2000,
    progress: 80,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=300&h=200&auto=format&fit=crop',
  },
  {
    id: 5,
    category: 'Educación',
    title: 'AprendeTech',
    description: 'Plataforma de aprendizaje en línea para estudiantes de comunidades marginadas.',
    raised: 5000,
    progress: 90,
    image: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200',
  },
  {
    id: 6,
    category: 'Salud',
    title: 'Salud al Alcance',
    description: 'Proyecto para ofrecer acceso a servicios de salud en áreas remotas.',
    raised: 3500,
    progress: 60,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200',
  },
  {
    id: 7,
    category: 'Ambiente',
    title: 'Reforestación Comunitaria',
    description: 'Iniciativa para reforestar áreas afectadas por la deforestación con la participación de comunidades locales.',
    raised: 4000,
    progress: 70,
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200',
  },
  {
    id: 8,
    category: 'Tecnología',
    title: 'Innovación en Energía',
    description: 'Desarrollo de paneles solares accesibles para hogares rurales.',
    raised: 4500,
    progress: 85,
    image: 'https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200',
  },
  {
    id: 9,
    category: 'Social',
    title: 'Educación para Todos',
    description: 'Programa de becas para estudiantes de bajos recursos.',
    raised: 5000,
    progress: 95,
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300&h=200',
  },
];

const ProjectCard = ({ project, onDetail }) => (
  <Card
    hoverable
    cover={<img alt={project.title} src={project.image} style={{ height: '200px', objectFit: 'cover' }} />}
    style={{ width: 300, margin: '10px' }}
  >
    <Meta
      title={project.title}
      description={<Paragraph ellipsis={{ rows: 2 }}>{project.description}</Paragraph>}
    />
    <Title level={5} style={{ margin: '10px 0' }}>${project.raised}</Title>
    <Progress percent={project.progress} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
      <Button type="primary" onClick={() => onDetail(project)}>
        Más Detalle
      </Button>
      <Button type="default">Invertir</Button>
    </div>
  </Card>
);

const ProjectModal = ({ visible, project, onClose }) => (
  <Modal
    title={project?.title}
    visible={visible}
    onCancel={onClose}
    footer={null}
    width={700}
  >
    {project && (
      <div>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
        />
        <Paragraph>{project.description}</Paragraph>
        <Title level={5}>Monto recaudado: ${project.raised}</Title>
        <Progress percent={project.progress} />
      </div>
    )}
  </Modal>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDetail = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsModalVisible(false);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Proyectos
      </Title>
      <Search
        placeholder="Buscar por nombre del proyecto"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', maxWidth: '400px', margin: '0 auto', display: 'block' }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxHeight: '80vh',
          overflowY: 'auto',
          justifyItems: 'center',
        }}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onDetail={handleDetail} />
        ))}
      </div>

      <ProjectModal
        visible={isModalVisible}
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Projects;