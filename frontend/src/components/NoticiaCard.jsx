import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NoticiaCard({ noticia, onDelete }) {
    const navigate = useNavigate()

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg">{noticia.titulo}</h2>
            <p className="text-sm text-gray-600">{noticia.subtitulo}</p>
            <div className="mt-2 flex justify-between items-center">
                <button
                    className="text-blue-600"
                    onClick={() => navigate(`/admin/editar/${noticia.id}`)}
                >
                    Editar
                </button>
                <button
                    className="text-red-600"
                    onClick={() => onDelete(noticia.id)}
                >
                    Excluir
                </button>
            </div>
        </div>
    )
}
