/* eslint-disable react/prop-types */

export const Form = ({ formValues, onChange, onSubmit, isEdit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero_De_Licencia">
                    License Number
                </label>
                <input
                    id="numero_De_Licencia"
                    name="numero_De_Licencia"
                    type="text"
                    value={formValues.numero_De_Licencia || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    First Name
                </label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formValues.nombre || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                    Last Name
                </label>
                <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    value={formValues.apellido || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            {!isEdit && (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                        ID
                    </label>
                    <input
                        id="id"
                        name="id"
                        type="text"
                        value={formValues.id || ''}
                        onChange={onChange}
                        className="w-full px-3 py-2 border rounded"
                        disabled={isEdit}
                    />
                </div>
            )}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded"
                >
                    {isEdit ? 'Update' : 'Create'}
                </button>
            </div>
        </form>
    );

};
