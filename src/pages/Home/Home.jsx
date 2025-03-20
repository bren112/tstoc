import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseclient';
import './Home.css';

function Home() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
        const setorId = localStorage.getItem('setor_id');
        if (setorId) {
            navigate('/home_logado'); 
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (!usuario || !senha) {
            setMensagem('Preencha todos os campos!');
            return;
        }

        const { data, error } = await supabase
            .from('setores')
            .select('id, nome_setor')
            .eq('usuario', usuario)
            .eq('senha', senha)
            .single();

        if (error || !data) {
            setMensagem('Usuário ou senha inválidos!');
            return;
        }

        localStorage.setItem('setor_id', data.id);
        setMensagem(`Bem-vindo, ${data.nome_setor}!`);

        setTimeout(() => {
            navigate('/home_logado'); 
        }, 2000);
    };

    return (
        <div className="login-container">
            <div className="card">
            <h1 id='corUsina'>Login</h1>
            <br />
            <input
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
            {mensagem && <p id='msg'>{mensagem}</p>}
        </div></div>
    );
}

export default Home;
