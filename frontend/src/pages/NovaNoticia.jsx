import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NovaNoticia = () => {
    const [form, setForm] = useState({
        titulo: '',
        subtitulo: '',
        conteudo: '',
        imagem: null
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setForm({ ...form, imagem: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("titulo", form.titulo);
        formData.append("subtitulo", form.subtitulo);
        formData.append("conteudo", form.conteudo);
        formData.append("imagem", form.imagem);

        const res = await fetch('/backend-php/upload_noticia.php', {
            method: 'POST',
            body: formData
        });

        const result = await res.json();
        alert(result.message || 'Notícia enviada!');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <input
                name="titulo"
                placeholder="Título"
                value={form.titulo}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <input
                name="subtitulo"
                placeholder="Subtítulo"
                value={form.subtitulo}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            <ReactQuill
                value={form.conteudo}
                onChange={(value) => setForm({ ...form, conteudo: value })}
                theme="snow"
            />
            <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
                accept="image/*"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Publicar Notícia
            </button>
        </form>
    );
};

export default NovaNoticia;
