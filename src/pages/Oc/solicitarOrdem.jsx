import React, { useState } from 'react';
import supabase from '../../supabaseclient';
import './solicitar.css';

const CriarOrdemCompra = () => {
  const [ordem, setOrdem] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [empresa, setEmpresa] = useState('');

  const gerarLinkEmail = (dados) => {
    const destinatario = 'douglas@usinasantarita.com.br';
    const assunto = encodeURIComponent('Nova Ordem de Compra Criada');
    const corpo = encodeURIComponent(
      `Uma nova ordem de compra foi criada:\n\n` +
      `Número da Ordem: ${dados.ordem}\n` +
      `Solicitante: ${dados.solicitante}\n` +
      `Empresa: ${dados.empresa}\n`+ 
      `Verifique aqui : 10.10.12.171/lista_ordem`
    );

    return `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const setorId = parseInt(localStorage.getItem('setor_id'), 10);
    if (!setorId) {
      console.error('Erro: setor_id não encontrado no LocalStorage');
      return;
    }

    const ordemCompra = { id_setores: setorId, ordem, solicitante, empresa };
    const { data, error } = await supabase.from('ordem_compra').insert([ordemCompra]);

    if (error) {
      console.error('Erro ao inserir ordem de compra:', error.message);
    } else {
      console.log('Ordem de compra inserida com sucesso!', data);

      
      window.location.href = gerarLinkEmail(ordemCompra);
    }
  };

  return (
    <>
      <br />
      <h1 id="centro">Inserir Nova Ordem de Compra</h1>
      <br />
      <div className="container_total">
        <div className='card2'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="ordem">Número da Ordem:</label>
            <br />
            <input
              id='solicitar'
              type="text"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              required
            />
            <br />
            <label htmlFor="solicitante">Solicitante:</label>
            <br />
            <input
              id='solicitar'
              type="text"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              required
            />
            <br />
            <label htmlFor="empresa">Empresa:</label>
            <br />
            <input
              id='empresa'
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              required
            />
            <br />
            <button id='btnSolicitar' type="submit">Salvar e Enviar Email</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CriarOrdemCompra;
