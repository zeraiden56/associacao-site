import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">ASDPEMAT</h1>
                <nav className="space-x-4">
                    <Link to="/" className="hover:text-blue-600">Início</Link>
                    <Link to="/sobre" className="hover:text-blue-600">Quem Somos</Link>
                    <Link to="/associar" className="hover:text-blue-600">Como se Associar</Link>
                    <Link to="/presidencia" className="hover:text-blue-600">Presidência</Link>
                    <Link to="/admin" className="hover:text-blue-600">Admin</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
