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

export const Turno = () => {
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [search, setSearch] = useState('');

    const [formData, setFormData] = useState({
        paciente_id: '',
        odontologo_id: '',
        fecha: ''
    })


    return (
        <MainLayout title="Pacientes" buttonText="Nuevo Paciente" onButtonClick={handleNewTurno} onSearch={handleSearch}>
        <div>
            <ErrorPopOut errorMessage={error} onClose={handleCloseError} />
            <h1 className="text-xl font-semibold mb-4">Pacientes</h1>
            {alert && (
                <Alert type={alert.type} message={alert.message} />
            )}
            {loading ? (
                <TableSkeleton />
            ) : (
                <Table columns={columns} data={turnos} onEdit={handleEdit} onDelete={handleDelete} />
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
