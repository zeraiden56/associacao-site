import React, { useState } from "react";

const Admin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const response = await fetch(`${API_URL}/backend-php/api.php?action=login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("admin_token", data.token || "true"); // use token se existir
                window.location.href = "/admin/dashboard";
            } else {
                setErro("Usuário ou senha inválidos.");
            }

        } catch (error) {
            console.error("Erro ao conectar:", error);
            setErro("Erro de conexão com o servidor.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Área Administrativa</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    {erro && <p className="text-red-500 text-sm">{erro}</p>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Usuário</label>
                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
