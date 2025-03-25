import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        const res = await fetch('/api.php?action=login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if (data.success) {
            navigate('/admin')
        } else {
            alert(data.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4 text-center">Login Admin</h2>
                <input
                    type="text"
                    placeholder="Usuário"
                    className="w-full mb-3 px-3 py-2 border rounded"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full mb-3 px-3 py-2 border rounded"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-black text-white py-2 rounded hover:opacity-90"
                >
                    Entrar
                </button>
            </div>
        </div>
    )
}
