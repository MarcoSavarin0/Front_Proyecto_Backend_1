
export const Navbar = () => {
    return (
        <div className="flex-shrink-0 w-64 bg-gray-800">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white text-xl font-semibold">Clinica Odontologica</span>
          </div>
          <nav className="mt-10">
            <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
              </svg>
              <span className="mx-4">Odontologos</span>
            </a>
            <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h8m-8 4h6"></path>
              </svg>
              <span className="mx-4">Pacientes</span>
            </a>
            <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a2 2 0 00-2-2H3m18 8V7a2 2 0 00-2-2h-4"></path>
              </svg>
              <span className="mx-4">Turnos</span>
            </a>
           
            <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5-9-5 9 5zm0 0v6"></path>
              </svg>
              <span className="mx-4">Calendario</span>
            </a>
          </nav>
        </div>
      );
    
}
