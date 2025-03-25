import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditarNoticia() {
    const { id } = useParams()
    const [noticia, setNoticia] = useState({})
    const navigate = useNavigate()

    const fetchNoticia = async () => {
        const res = await fetch('/api.php?action=get_noticias')
        const data = await res.json()
        const item = data.find(n => n.id === parseInt(id))
        if (item) setNoticia(item)
    }

    const handleSubmit = async () => {
        const formData = new URLSearchParams()
        Object.entries(noticia).forEach(([key, value]) =>
            formData.append(key, value)
        )

        await fetch('/api.php?action=editar_noticia', {
            method: 'PUT',
            body: formData.toString(),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })

        navigate('/admin')
    }

    useEffect(() => {
        fetchNoticia()
    }, [])

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-xl font-semibold mb-4">Editar Notícia</h1>
            <input
                className="w-full mb-3 px-3 py-2 border rounded"
                value={noticia.titulo || ''}
                onChange={e => setNoticia({ ...noticia, titulo: e.target.value })}
                placeholder="Título"
            />
            <input
                className="w-full mb-3 px-3 py-2 border rounded"
                value={noticia.subtitulo || ''}
                onChange={e => setNoticia({ ...noticia, subtitulo: e.target.value })}
                placeholder="Subtítulo"
            />
            <textarea
                className="w-full mb-3 px-3 py-2 border rounded"
                value={noticia.conteudo || ''}
                onChange={e => setNoticia({ ...noticia, conteudo: e.target.value })}
                placeholder="Conteúdo"
            />
            <input
                className="w-full mb-3 px-3 py-2 border rounded"
                value={noticia.imagem_url || ''}
                onChange={e => setNoticia({ ...noticia, imagem_url: e.target.value })}
                placeholder="URL da Imagem"
            />
            <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Salvar
            </button>
        </div>
    )
}
