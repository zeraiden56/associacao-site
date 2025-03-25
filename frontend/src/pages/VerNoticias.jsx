import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerNoticias = () => {
    const [noticias, setNoticias] = useState([]);
    const navigate = useNavigate();

    const carregarNoticias = async () => {
        try {
            const res = await fetch('/backend-php/api.php?action=get_noticias');
            const data = await res.json();
            setNoticias(data);
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
        }
    };

    const deletarNoticia = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta notícia?')) return;

        await fetch('/backend-php/api.php?action=deletar_noticia', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        carregarNoticias(); // Atualiza a lista
    };

    useEffect(() => {
        carregarNoticias();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Notícias Publicadas</h1>

            {noticias.length === 0 ? (
                <p className="text-gray-500">Nenhuma notícia publicada ainda.</p>
            ) : (
                <div className="space-y-4">
                    {noticias.map((noticia) => (
                        <div
                            key={noticia.id}
                            className="bg-white shadow p-4 rounded flex justify-between items-start"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{noticia.titulo}</h2>
                                <p className="text-gray-600">{noticia.subtitulo}</p>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => navigate(`/editar/${noticia.id}`)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deletarNoticia(noticia.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VerNoticias;
