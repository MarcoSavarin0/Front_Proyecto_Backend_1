/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal } from './Modal';
export const Table = ({ columns, data, onEdit, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleAddressClick = (address) => {
        setSelectedAddress(address);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.accessor}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.Header}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td
                                    key={column.accessor}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {column.accessor === 'domicilio' ? (
                                        <button
                                            onClick={() => handleAddressClick(row[column.accessor])}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Ver Domicilio
                                        </button>
                                    ) : (
                                        row[column.accessor]
                                    )}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => onEdit(row)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(row)}
                                    className="text-red-600 hover:text-red-900 ml-4"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>

                    ))}
                    <Modal isOpen={isModalOpen} onClose={closeModal} title="Domicilio Completo">
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                {selectedAddress.calle} - {selectedAddress.numero}
                            </p>
                            <p className="text-sm text-gray-500">
                                {selectedAddress.localidad}, {selectedAddress.provincia}
                            </p>
                        </div>
                    </Modal>
                </tbody>
            </table>

        </div>
    );
};
