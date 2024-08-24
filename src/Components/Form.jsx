/* eslint-disable react/prop-types */

export const Form = ({ formValues, onChange, onSubmit, isEdit }) => {
    return (
        <form onSubmit={onSubmit}>
            {Object.keys(formValues).map((key) => {
                if(key == 'fechaIngreso'){
                    return (
                        <div className="mb-4" key={key}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                                {key
                                    .replace(/_/g, ' ')
                                    .replace(/\b\w/g, (l) => l.toUpperCase())
                                }
                            </label>
                            <input
                                id={key}
                                name={key}
                                type="date"
                                value={formValues[key] || ''}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                    );
                }
                // Si el campo es "id", y si está en modo edición, no lo mostramos
                if (key === 'id' || key === 'idDomicilio') {
                    return (
                        <div className="mb-4" key={key}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                                {key
                                    .replace(/_/g, ' ')
                                    .replace(/\b\w/g, (l) => l.toUpperCase())
                                }
                            </label>
                            <input
                                id={key}
                                name={key}
                                type="text"
                                value={formValues[key] || ''}
                                onChange={onChange}
                                className="w-full px-3 py-2 border rounded bg-gray-200" 
                                readOnly 
                            />
                        </div>
                    );
                }
                return (
                    <div className="mb-4" key={key}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                            {key
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, (l) => l.toUpperCase())
                            }
                        </label>
                        <input
                            id={key}
                            name={key}
                            type="text"
                            value={formValues[key] || ''}
                            onChange={onChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                );
            
            })}
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
