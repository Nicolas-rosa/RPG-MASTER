import React from 'react'; // Importando React
import { Link } from 'react-router-dom'; // Importando Link do react-router-dom
import '../index.css'; // Importando o CSS

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false); // Estado para o menu

    return (
        <header className="bg-gray-900 text-yellow-300 p-6 shadow-lg border-b-4 border-gray-700">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-4xl md:text-5xl font-extrabold font-MedievalSharp mb-4 md:mb-0">
                    <i className="fas fa-dragon mr-2"></i> Rpg Master
                </h1>
                <button 
                    className="md:hidden text-yellow-300 focus:outline-none" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                </button>
                <nav 
                    aria-label="Main Navigation" 
                    className={`${
                        isOpen ? 'block' : 'hidden'
                    } md:block`}
                >
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-lg">
                        <li>
                            <Link to="/" className="hover:text-yellow-400 transition duration-200 ease-in-out flex items-center">
                                <i className="fas fa-home mr-2"></i> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/Info" className="hover:text-yellow-400 transition duration-200 ease-in-out flex items-center">
                                <i className="fas fa-info-circle mr-2"></i> Info
                            </Link>
                        </li>
                        <li>
                            <Link to="/Criar" className="hover:text-yellow-400 transition duration-200 ease-in-out flex items-center">
                                <i className="fas fa-scroll mr-2"></i> Criar
                            </Link>
                        </li>
                        <li>
                            <Link to="/Contact" className="hover:text-yellow-400 transition duration-200 ease-in-out flex items-center">
                                <i className="fas fa-envelope mr-2"></i> Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;