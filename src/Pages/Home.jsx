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
  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
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
    setModalTitle('Edit Odontologo');
    setCurrentRecord(row);
    setFormData({
      id: row.id,
      numero_De_Licencia: row.numero_De_Licencia,
      nombre: row.nombre,
      apellido: row.apellido

    });
    setIsModalOpen(true);
  };

  const handleDelete = async (row) => {
    console.log('Delete:', row);
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
    setModalTitle('Create Odontologo');
    setCurrentRecord(null);
    setFormData({
      id: '',
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
      if (modalTitle === 'Edit Odontologo') {
        console.log('Updating:', formData);

        await apiCall(`odontologos/editar`, 'PUT', formData);

        console.log('Updated:', formData);
      } else {
        await apiCall('odontologos', 'POST', formData);
        console.log('Created:', formData);
      }

      const updatedOdontologos = await apiCall('odontologos');
      setOdontologos(updatedOdontologos);

      handleCloseModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <MainLayout title="Odontologo" buttonText="Nuevo odontologo" onButtonClick={handleNewOdontologo}>
      <div>
        <ErrorPopOut errorMessage={error} onClose={handleCloseError} />
        <h1 className="text-xl font-semibold mb-4">Odontólogos</h1>

        {loading ? (
          <TableSkeleton />
        ) : (
          <Table columns={columns} data={odontologos} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
          <Form
            formValues={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isEdit={modalTitle === 'Edit Odontologo'}
          />
        </Modal>
      </div>
    </MainLayout>
  );
};
