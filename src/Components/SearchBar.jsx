/* eslint-disable react/prop-types */
export const SearchBar = ({ onSearch }) => {
    return (
        <div className="flex items-center justify-between">
            <input
                type="text"
                placeholder="Buscar..."
                className="w-60 mb-5 px-4 py-2 text-sm text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={onSearch}
            />
        </div>
    )
}
