/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MainLayout } from "../Components/MainLayout";
import { Table } from "../Components/Table";
import { apiCall } from "../libs/api";
import { TableSkeleton } from "../Components/TableSkeleton";
import { ErrorPopOut } from "../Components/ErrorPopOut";
import { Modal } from "../Components/Modal";
import { Form } from "../Components/Form";
import { Alert } from "../Components/Alert";
export const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        fechaIngreso: '',
        calle: '',
        numero: '',
        localidad: '',
        provincia: ''
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const data = await apiCall('pacientes');
                setPacientes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    const columns = [
        { Header: 'Nombre', accessor: 'nombre' },
        { Header: 'Apellido', accessor: 'apellido' },
        { Header: 'Dni', accessor: 'dni' },
        { Header: 'Fecha de Ingreso', accessor: 'fechaIngreso' },
        { Header: 'domicilio', accessor: 'domicilio' },
        { Header: 'ID', accessor: 'id' },
    ];

    const handleCloseError = () => {
        setError(null);
    };

    const handleEdit = (row) => {
        setModalTitle('Edit Paciente');

        setFormData({
            id: row.id,
            nombre: row.nombre,
            apellido: row.apellido,
            dni: row.dni,
            fechaIngreso: row.fechaIngreso,
            calle: row.domicilio.calle,
            numero: row.domicilio.numero,
            localidad: row.domicilio.localidad,
            provincia: row.domicilio.provincia,
            idDomicilio: row.domicilio.id
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (row) => {
        console.log('Delete:', row);
        const { id } = row;
        try {
            await apiCall(`pacientes/${id}`, 'DELETE');
            const updatedPacientes = await apiCall('pacientes');
            setPacientes(updatedPacientes);
            setAlert({ type: 'success', message: 'Paciente eliminado con éxito' });
            setTimeout(() => {
                setAlert(null);
            }, 5000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            const updatedPacientes = await apiCall('pacientes');
            setPacientes(updatedPacientes);
        }

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNewPaciente = () => {
        setModalTitle('Crear Paciente');

        setFormData({
            nombre: '',
            apellido: '',
            dni: '',
            fechaIngreso: '',
            calle: '',
            numero: '',
            localidad: '',
            provincia: ''
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let dataJson = {
                id: formData?.id,
                nombre: formData.nombre,
                apellido: formData.apellido,
                dni: formData.dni,
                fechaIngreso: formData.fechaIngreso,
                domicilio: {
                    id: formData?.idDomicilio,
                    calle: formData.calle,
                    numero: formData.numero,
                    localidad: formData.localidad,
                    provincia: formData.provincia
                }
            }
            if (modalTitle === 'Editar Paciente') {
                console.log('Updating:', dataJson);
                await apiCall(`pacientes/editar`, 'PUT', dataJson);
                setAlert({ type: 'success', message: 'Paciente actualizado con éxito' });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            } else {
                await apiCall('pacientes', 'POST', dataJson);
                console.log('Created:', dataJson);
                setAlert({ type: 'success', message: 'Paciente creado con éxito' });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            }

            const updatedPacientes = await apiCall('pacientes');
            setPacientes(updatedPacientes);

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
            setPacientesFiltrados([]);
            setError("");
            setLoading(false);
            return;
        }

        const filteredData = pacientes.filter((paciente) => {
            return (
                paciente.nombre.toLowerCase().includes(value.toLowerCase()) ||
                paciente.apellido.toLowerCase().includes(value.toLowerCase()) ||
                paciente.dni.toLowerCase().includes(value.toLowerCase())
            );
        });

        if (filteredData.length === 0) {
            setAlert({ type: 'error', message: 'No se encontraron resultados' });
            setTimeout(() => {
                setAlert(null);
            }, 3000);
            setPacientesFiltrados([]);
        } else {
            setError("");
            setPacientesFiltrados(filteredData);
        }

        setLoading(false);
    };
    return (
        <MainLayout title="Pacientes" buttonText="Nuevo Paciente" onButtonClick={handleNewPaciente} onSearch={handleSearch}>
            <div>
                <ErrorPopOut errorMessage={error} onClose={handleCloseError} />
                <h1 className="text-xl font-semibold mb-4">Pacientes</h1>
                {alert && (
                    <Alert type={alert.type} message={alert.message} />
                )}
                {loading ? (
                    <TableSkeleton />
                ) : (
                    <Table columns={columns} data={pacientesFiltrados.length > 0 ? pacientesFiltrados : pacientes} onEdit={handleEdit} onDelete={handleDelete} />
                )}


                <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
                    <Form
                        formValues={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        isEdit={modalTitle === 'Editar Paciente'}
                    />
                </Modal>
            </div>
        </MainLayout>
    )
}
