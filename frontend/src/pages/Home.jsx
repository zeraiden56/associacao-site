import React, { useEffect, useState } from "react";

const Home = () => {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const res = await fetch('/backend-php/api.php?action=get_noticias');
                const data = await res.json();
                setNoticias(data);
            } catch (error) {
                console.error('Erro ao carregar notícias:', error);
            }
        };

        fetchNoticias();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">ASDPEMAT</h1>
            <p className="text-center text-gray-600 mb-12">
                Associação dos Servidores Públicos da Defensoria Pública do Estado de Mato Grosso
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {noticias.map(noticia => (
                    <div key={noticia.id} className="bg-white shadow p-4 rounded">
                        <h2 className="font-semibold text-lg">{noticia.titulo}</h2>
                        <p className="text-sm text-gray-600">{noticia.subtitulo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
