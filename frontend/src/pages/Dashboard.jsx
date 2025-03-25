import React, { useState } from 'react';
import VerNoticias from './VerNoticias';
import NovaNoticia from './NovaNoticia';

const Dashboard = () => {
    const [abaAtiva, setAbaAtiva] = useState("ver");

    const renderConteudo = () => {
        switch (abaAtiva) {
            case "nova":
                return <NovaNoticia />;
            case "ver":
            default:
                return <VerNoticias />;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
                <h2 className="text-xl font-bold">Painel Admin</h2>
                <nav className="flex flex-col space-y-2">
                    <button onClick={() => setAbaAtiva("ver")} className="hover:bg-gray-700 px-3 py-2 rounded text-left">
                        📄 Ver Notícias
                    </button>
                    <button onClick={() => setAbaAtiva("nova")} className="hover:bg-gray-700 px-3 py-2 rounded text-left">
                        📝 Nova Notícia
                    </button>
                </nav>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1 p-6 bg-gray-50">
                {renderConteudo()}
            </main>
        </div>
    );
};

export default Dashboard;
