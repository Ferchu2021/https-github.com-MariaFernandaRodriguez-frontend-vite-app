import React, { useState } from "react";
import DashboardCard from "../Dashboard/DashboardCard";
import Modal from "./Modal";
import FormField from "../Forms/FormField";
import Button from "./Button";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";

const ComponentExamples = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setShowModal(false);
  };

  const categoryOptions = [
    { value: "tech", label: "Tecnología" },
    { value: "design", label: "Diseño" },
    { value: "business", label: "Negocios" },
    { value: "lifestyle", label: "Estilo de Vida" }
  ];

  const statusOptions = [
    { value: "draft", label: "Borrador" },
    { value: "published", label: "Publicado" },
    { value: "archived", label: "Archivado" }
  ];

  // Datos de ejemplo para DataTable
  const tableData = [
    {
      id: 1,
      title: "Introducción a React",
      description: "Guía completa para principiantes",
      category: "tech",
      status: "published",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Diseño UX Moderno",
      description: "Principios de diseño centrado en el usuario",
      category: "design",
      status: "draft",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Estrategias de Marketing",
      description: "Técnicas efectivas para el crecimiento",
      category: "business",
      status: "archived",
      createdAt: "2024-01-13"
    }
  ];

  const tableColumns = [
    {
      key: "title",
      title: "Título",
      render: (value) => <strong>{value}</strong>
    },
    {
      key: "description",
      title: "Descripción"
    },
    {
      key: "category",
      title: "Categoría",
      render: (value) => {
        const categoryMap = {
          tech: "Tecnología",
          design: "Diseño",
          business: "Negocios",
          lifestyle: "Estilo de Vida"
        };
        return categoryMap[value] || value;
      }
    },
    {
      key: "status",
      title: "Estado",
      render: (value) => <StatusBadge status={value} showIcon={true} />
    },
    {
      key: "createdAt",
      title: "Fecha"
    }
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "32px", color: "#111827" }}>
        Biblioteca de Componentes Reutilizables
      </h1>

      {/* Dashboard Cards */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "24px", color: "#374151" }}>Dashboard Cards</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "24px" 
        }}>
          <DashboardCard
            title="Usuarios Activos"
            value="1,234"
            icon="👥"
            trend="+12%"
            color="blue"
            onClick={() => console.log("Card clicked")}
          />
          
          <DashboardCard
            title="Posts Publicados"
            value="567"
            icon="📝"
            trend="+8%"
            color="green"
          />
          
          <DashboardCard
            title="Comentarios"
            value="89"
            icon="💬"
            trend="-3%"
            color="purple"
          />
          
          <DashboardCard
            title="Visitas"
            value="12,345"
            icon="👁️"
            trend="+25%"
            color="orange"
          />
        </div>
      </section>

      {/* Buttons */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "24px", color: "#374151" }}>Botones</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="success">Éxito</Button>
          <Button variant="danger">Peligro</Button>
          <Button variant="warning">Advertencia</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <Button size="sm">Pequeño</Button>
          <Button size="md">Mediano</Button>
          <Button size="lg">Grande</Button>
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <Button icon="📧" iconPosition="left">Con Icono</Button>
          <Button icon="→" iconPosition="right">Flecha</Button>
          <Button loading>Loading</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
      </section>

      {/* Status Badges */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "24px", color: "#374151" }}>Status Badges</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <StatusBadge status="active" showIcon={true} />
          <StatusBadge status="inactive" showIcon={true} />
          <StatusBadge status="pending" showIcon={true} />
          <StatusBadge status="published" showIcon={true} />
          <StatusBadge status="draft" showIcon={true} />
          <StatusBadge status="archived" showIcon={true} />
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <StatusBadge status="active" variant="solid" />
          <StatusBadge status="danger" variant="solid" />
          <StatusBadge status="warning" variant="outline" />
          <StatusBadge status="info" variant="soft" />
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <StatusBadge status="active" size="sm" />
          <StatusBadge status="active" size="md" />
          <StatusBadge status="active" size="lg" />
        </div>
      </section>

      {/* DataTable */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "24px", color: "#374151" }}>DataTable</h2>
        <DataTable
          data={tableData}
          columns={tableColumns}
          searchable={true}
          sortable={true}
          pagination={true}
          itemsPerPage={3}
          onRowClick={(item) => console.log("Row clicked:", item)}
        />
      </section>

      {/* Modal Example */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "24px", color: "#374151" }}>Modal</h2>
        <Button 
          variant="primary"
          onClick={() => setShowModal(true)}
        >
          Abrir Modal con Formulario
        </Button>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Crear Nuevo Post"
          size="lg"
        >
          <form onSubmit={handleSubmit}>
            <FormField
              label="Título del Post"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ingresa el título del post..."
              required
            />

            <FormField
              label="Descripción"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Escribe la descripción del post..."
              rows={4}
              required
            />

            <FormField
              label="Categoría"
              name="category"
              type="select"
              value={formData.category}
              onChange={handleInputChange}
              options={categoryOptions}
              required
            />

            <FormField
              label="Estado"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleInputChange}
              options={statusOptions}
              required
            />

            <div style={{ 
              display: "flex", 
              gap: "12px", 
              justifyContent: "flex-end",
              marginTop: "24px"
            }}>
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="success"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Modal>
      </section>

      {/* Form Fields Examples */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "24px", color: "#374151" }}>Campos de Formulario</h2>
        <div style={{ maxWidth: "600px" }}>
          <FormField
            label="Nombre"
            name="name"
            type="text"
            placeholder="Ingresa tu nombre"
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
          />

          <FormField
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            required
          />

          <FormField
            label="Descripción"
            name="description"
            type="textarea"
            placeholder="Escribe una descripción..."
            rows={4}
          />

          <FormField
            label="Categoría"
            name="category"
            type="select"
            options={categoryOptions}
            placeholder="Selecciona una categoría"
          />

          <FormField
            label="Fecha de Publicación"
            name="publishDate"
            type="date"
          />

          <FormField
            label="Campo con Error"
            name="errorField"
            type="text"
            placeholder="Este campo tiene un error"
            error="Este campo es requerido"
          />

          <FormField
            label="Campo Deshabilitado"
            name="disabledField"
            type="text"
            placeholder="Este campo está deshabilitado"
            disabled
          />
        </div>
      </section>
    </div>
  );
};

export default ComponentExamples; 