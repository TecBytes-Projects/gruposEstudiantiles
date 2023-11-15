import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Valores antes de enviar la solicitud:', {
            username,
            password,
        });
        try {
            const response = await fetch('http://localhost:8000/routes.php', {
                method: 'POST',
                mode: 'cors',  // Asegúrate de agregar esta línea
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'login',
                    username,
                    password,
                }),
            });
    
            const data = await response.json();
    
            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data.message);
                // Aquí puedes redirigir a la página de inicio u otras acciones después del inicio de sesión exitoso
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
    );
};

export default Login;
