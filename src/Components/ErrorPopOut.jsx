// eslint-disable-next-line react/prop-types
export const ErrorPopOut = ({ errorMessage, onClose }) => {
    if (!errorMessage) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
                <h2 className="text-lg font-semibold text-red-600">Error</h2>
                <p className="mt-2 text-gray-600">{errorMessage}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

