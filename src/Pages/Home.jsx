/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MainLayout } from "../Components/MainLayout";
import { Table } from "../Components/Table";
import { apiCall } from "../libs/api";
import { TableSkeleton } from "../Components/TableSkeleton";
import { ErrorPopOut } from "../Components/ErrorPopOut";
import { Modal } from "../Components/Modal";
import { Form } from "../Components/Form";

export const Home = () => {
  const [odontologos, setOdontologos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [search, setSearch] = useState('');
  const [odontologosFiltrados, setOdontologosFiltrados] = useState([]);
  const [formData, setFormData] = useState({
    numero_De_Licencia: '',
    nombre: '',
    apellido: ''
  });

  useEffect(() => {
    const fetchOdontologos = async () => {
      try {
        const data = await apiCall('odontologos');
        setOdontologos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOdontologos();
  }, []);

  const columns = [
    { Header: 'Número de Licencia', accessor: 'numero_De_Licencia' },
    { Header: 'Nombre', accessor: 'nombre' },
    { Header: 'Apellido', accessor: 'apellido' },
    { Header: 'ID', accessor: 'id' },
  ];

  const handleCloseError = () => {
    setError(null);
  };

  const handleEdit = (row) => {
    setModalTitle('Editar Odontologo');

    setFormData({
      id: row.id,
      numero_De_Licencia: row.numero_De_Licencia,
      nombre: row.nombre,
      apellido: row.apellido

    });
    setIsModalOpen(true);
  };

  const handleDelete = async (row) => {
  
    const { id } = row;
    try {
      await apiCall(`odontologos/${id}`, 'DELETE');
      const updatedOdontologos = await apiCall('odontologos');
      setOdontologos(updatedOdontologos);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      const updatedOdontologos = await apiCall('odontologos');
      setOdontologos(updatedOdontologos);
    }

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewOdontologo = () => {
    setModalTitle('Crear Odontologo');

    setFormData({
      numero_De_Licencia: '',
      nombre: '',
      apellido: '',

    });
    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalTitle === 'Editar Odontologo') {
        await apiCall(`odontologos/editar`, 'PUT', formData);
      } else {
        await apiCall('odontologos', 'POST', formData);
      }

      const updatedOdontologos = await apiCall('odontologos');
      setOdontologos(updatedOdontologos);

      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearch(value);
    setLoading(true);

    if (value === "") {
      setOdontologosFiltrados([]);
      setError("");
      setLoading(false);
      return;
    }

    const filteredData = odontologos.filter((odontologo) => {
      return (
        odontologo.nombre.toLowerCase().includes(value.toLowerCase()) ||
        odontologo.apellido.toLowerCase().includes(value.toLowerCase()) ||
        odontologo.numero_De_Licencia.toLowerCase().includes(value.toLowerCase())
      );
    });

    if (filteredData.length === 0) {
      setError('No se encontraron resultados');
      setOdontologosFiltrados([]);
    } else {
      setError("");
      setOdontologosFiltrados(filteredData);
    }
    setLoading(false);
  };

  return (
    <MainLayout title="Odontologo" buttonText="Nuevo odontologo" onButtonClick={handleNewOdontologo} onSearch={handleSearch}>
      <div>
        <ErrorPopOut errorMessage={error} onClose={handleCloseError} />
        <h1 className="text-xl font-semibold mb-4">Odontólogos</h1>

        {loading ? (
          <TableSkeleton />
        ) : (
          <Table columns={columns} data={odontologosFiltrados.length > 0 ? odontologosFiltrados : odontologos} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
          <Form
            formValues={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isEdit={modalTitle === 'Editar Odontologo'}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};
