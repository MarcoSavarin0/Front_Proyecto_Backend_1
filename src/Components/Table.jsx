/* eslint-disable react/prop-types */

export const Table = ({ columns, data, onEdit, onDelete }) => {
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                                    {row[column.accessor]}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => onEdit(row)}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(row)}
                                    className="text-red-600 hover:text-red-900 ml-4"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
