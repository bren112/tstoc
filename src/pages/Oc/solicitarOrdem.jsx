import React, { useState } from 'react';
import supabase from '../../supabaseclient';
import './solicitar.css'
const CriarOrdemCompra = () => {
  const [ordem, setOrdem] = useState('');
  const [solicitante, setSolicitante] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pegando id_setores do LocalStorage
    const setorId = parseInt(localStorage.getItem('setor_id'), 10);

    if (!setorId) {
      console.error('Erro: setor_id não encontrado no LocalStorage');
      return;
    }

    const { data, error } = await supabase
      .from('ordem_compra')
      .insert([
        {
          id_setores: setorId, // Setor correto vindo do LocalStorage
          ordem,
          solicitante
        }
      ]);

    if (error) {
      console.error('Erro ao inserir ordem de compra:', error.message);
    } else {
      console.log('Ordem de compra inserida com sucesso!', data);
      window.location.href = '/lista_ordem'; 
    }
  };

  return (
    <>
    <br/>
      <h1 id="centro">Inserir Nova Ordem de Compra</h1>
    <br/>

    <div className="container_total">
      <div className='card2'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ordem">Número da Ordem:</label>

<br/>

        <input
          id='solicitar'
          type="text"
          name="ordem"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
          required
        />
<br/>
        <label htmlFor="solicitante">Solicitante:</label>

<br/>

        <input
        id='solicitar'
          type="text"
          name="solicitante"
          value={solicitante}
          onChange={(e) => setSolicitante(e.target.value)}
          required
        />
        <br/>

        <button id='btnSolicitar' type="submit">Salvar Ordem de Compra</button>
      </form>
    </div></div></>
  );
};

export default CriarOrdemCompra;
