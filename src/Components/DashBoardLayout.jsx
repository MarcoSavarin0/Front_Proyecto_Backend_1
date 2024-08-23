/* eslint-disable react/prop-types */

export const DashBoardLayout = ({ title = "", buttonText = "", onButtonClick, children }) => {
    return (
        <div className="flex flex-col flex-1">
            <header className="flex items-center justify-between p-4 bg-white border-b">
                <h1 className="text-xl font-semibold">{title}</h1>
                <button 
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded" 
                    onClick={onButtonClick}
                >
                    {buttonText}
                </button>
            </header>
            <main className="flex-1 p-4">
                <div className="h-full bg-white border rounded-lg p-4">
                    {children}
                </div>
            </main>
        </div>
    );
}

