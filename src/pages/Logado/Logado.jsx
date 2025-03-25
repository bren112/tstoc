import React, { useEffect, useState } from 'react';
import supabase from '../../supabaseclient';
import { useNavigate } from 'react-router-dom';
import './logado.css';

function Logado() {
    const [setor, setSetor] = useState(null);
    const [despesas, setDespesas] = useState([]);
    const [mes, setMes] = useState('');
    const [despesaEditando, setDespesaEditando] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [ordenacao, setOrdenacao] = useState('asc'); 
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const setorId = localStorage.getItem('setor_id');
    const navigate = useNavigate();

    useEffect(() => {
      const fetchSetor = async () => {
             if (!setorId) return;
 
             const { data: setorData, error: setorError } = await supabase
                 .from('setores')
                 .select('id , nome_setor')
                 .eq('id', setorId)
                 .single();
 
             if (setorError) {
                 console.error('Erro ao buscar setor:', setorError.message);
             } else {
                 setSetor(setorData.nome_setor);
             }

            const { data: despesasData, error: despesasError } = await supabase
                .from('despesas')
                .select('*')
                .eq('id_setores', setorId);

            if (despesasError) {
                console.error('Erro ao buscar despesas:', despesasError.message);
            } else {
                setDespesas(despesasData);
            }
        };

        fetchSetor();
        
        const mesAtual = new Date().getMonth() + 1; // getMonth() retorna de 0 a 11, então somamos 1
        setMes(mesAtual.toString());
    
    }, [setorId]);

    const logout = () => {
        localStorage.removeItem('setor_id');
        navigate('/');
    };

    const filtrarDespesasPorMes = () => {
        if (!mes) return despesas;
        return despesas.filter((despesa) => {
            const dataCriacao = new Date(despesa.data_criacao);
            return dataCriacao.getMonth() === parseInt(mes) - 1;
        });
    };

    const abrirModal = (despesa) => {
        setDespesaEditando(despesa);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setDespesaEditando(null);
    };
    const filtrarDespesasPorPesquisa = () => {
        if (!termoPesquisa) return filtrarDespesasPorMes();
        
        return filtrarDespesasPorMes().filter((despesa) =>
            Object.values(despesa).some((valor) =>
                valor?.toString().toLowerCase().includes(termoPesquisa.toLowerCase())
            )
        );
    };

    const editarDespesa = async (e) => {
        e.preventDefault();
        if (!despesaEditando) return;

        const { id, fornecedor, cnpj, emp, vencto, recto_fat, valor, nota_fiscal, ordem_de_compra, pedido, campo_aplicacao, observacao, status, data_criacao, venctoo } = despesaEditando;

        const { error } = await supabase
            .from('despesas')
            .update({
                fornecedor,
                cnpj,
                emp,
                vencto,
                recto_fat,
                valor,
                nota_fiscal,
                ordem_de_compra,
                pedido,
                campo_aplicacao,
                observacao,
                status,
                venctoo,
            })
            .eq('id', id);

        if (error) {
            console.error('Erro ao editar despesa:', error.message);
        } else {
            fecharModal();
            window.location.reload(); 
        }
    };

    const excluirDespesa = async (id) => {
        const { error } = await supabase
            .from('despesas')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro ao excluir despesa:', error.message);
        } else {
            alert('Despesa excluída com sucesso!');
            window.location.reload(); 
        }
    };

    const verificarCorVencimento = (venctoOriginal, status) => {
        const hoje = new Date();
        const vencimento = new Date(venctoOriginal); 
    
        if (isNaN(vencimento)) {
            return ''; 
        }
    
        const diffTime = vencimento - hoje;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        if (status === 'pendente') {
            return 'orange';
        } else if (status === 'concluida') {
            return 'green';
        } else if (diffDays <= 7 && diffDays >= 0) {
            return 'yellow';
        } else if (diffDays < 0) {
            return 'red';
        }
        return ''; 
    };

    // Função para ordenar as despesas pela coluna 'Vencimento'
    const ordenarDespesas = (despesas) => {
        return despesas.sort((a, b) => {
            const vencimentoA = new Date(a.vencto);
            const vencimentoB = new Date(b.vencto);
            if (ordenacao === 'asc') {
                return vencimentoA - vencimentoB;
            } else {
                return vencimentoB - vencimentoA;
            }
        });
    };

    return (
        <div>
                <button onClick={logout} className="logout-button">Logout</button>
            <div className="fileira">
            <h2 id='setor'>Setor Logado: <span id='spanSetor'>{setor}</span></h2>

            <button id='vencendo' onClick={() => setOrdenacao(ordenacao === 'asc' ? 'desc' : 'asc')}>
                    {ordenacao === 'asc' ? 'Ordenar por Vencendo' : 'Desfazer'}
                </button>

        

            <div className='mes'>
                <br />
                <label htmlFor="mes">Escolha o mês: </label>
                <select
                    id="mes"
                    value={mes}
                    onChange={(e) => setMes(e.target.value)}
                >
                    <option value="">Selecione</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
            </div>

            </div>
         
            <div className="pesquisa-container">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                />
            </div>
            {despesas.length > 0 ? (
                <div>
                    <h1 id='centro'>Despesas Mensais</h1>
                    <div className="table">
                        <div className="tst">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fornecedor</th>
                                    <th>CNPJ</th>
                                    <th>Emp</th>
                                    <th>Vencimento Dia</th>
                                    <th>Recebimento</th>
                                    <th>Valor</th>
                                    <th>Nota Fiscal</th>
                                    <th>Ordem de Compra</th>
                                    <th>Pedido</th>
                                    <th>Campo de Aplicação</th>
                                    <th>Observação</th>
                                    <th>Status</th>
                                    {/* <th>Data de Criação</th> */}
                                    <th>Vencimento Data</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {ordenarDespesas(filtrarDespesasPorPesquisa()).map((despesa) => (
                             
                                    <tr
                                        key={despesa.id}
                                        style={{
                                            backgroundColor: verificarCorVencimento(despesa.venctoo, despesa.status),
                                        }}
                                    >
                                        <td>{despesa.fornecedor}</td>
                                        <td>{despesa.cnpj}</td>
                                        <td>{despesa.emp}</td>
                                        <td>{despesa.vencto}</td>
                                        <td>{despesa.recto_fat}</td>
                                        <td>{`R$ ${despesa.valor.toFixed(2).replace('.', ',')}`}</td>
                                        <td>{despesa.nota_fiscal}</td>
                                        <td>{despesa.ordem_de_compra}</td>
                                        <td>{despesa.pedido}</td>
                                        <td>{despesa.campo_aplicacao}</td>
                                        <td>{despesa.observacao}</td>
                                        <td>{despesa.status}</td>
                                        {/* <td>{new Date(despesa.data_criacao).toLocaleDateString()}</td> */}
                                        <td>{despesa.venctoo ? new Date(despesa.venctoo).toLocaleDateString() : 'N/A'}</td>
                                        <td>
                                            <div className="acoes">
                                            <button id='editar' onClick={() => abrirModal(despesa)}>✏️</button>
                                            <br />
                                            <button id='excluir' onClick={() => excluirDespesa(despesa.id)}>Excluir</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
            <div class="acordeao">
    <input type="checkbox" id="acordeao-1" class="acordeao-checkbox" />
    <label for="acordeao-1" class="acordeao-titulo">
        <strong>Cliqe p/ver Legenda</strong>
    </label>
    <div class="acordeao-conteudo">
        <ul>
            <li><strong id='laranja'>laranja:</strong> São as despesas que estão em processo.</li>
            <li><strong id='verde'>Verde:</strong> Despesas que já foram finalizadas.</li>
            <li><strong id='amarelo'>Amarelo:</strong> Despesas que faltam 7 dias ou menos para vencer</li>
            <li><strong id='vermelho'>Vermelho:</strong> Despesas que passaram da data de vencimento.</li>
        </ul>
    </div>
</div>
                </div>
                
            ) : (
                <p>Sem despesas registradas.</p>
            )}

            {modalAberto && (
                <div className="modal">
                    <form onSubmit={editarDespesa}>
                        <div className="fim">
                        <button id='excluir' type="button" onClick={fecharModal}>
                            Cancelar
                        </button>
                        </div>
                        <h1>Editar Despesa</h1>
                        <label>Fornecedor</label>
                        <input
                            type="text"
                            value={despesaEditando?.fornecedor || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, fornecedor: e.target.value })
                            }
                        />
                        <label>CNPJ</label>
                        <input
                            type="text"
                            value={despesaEditando?.cnpj || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, cnpj: e.target.value })
                            }
                        />
                        <label>Emp</label>
                        <input
                            type="text"
                            value={despesaEditando?.emp || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, emp: e.target.value })
                            }
                        />
                        <label>Vencimento</label>
                        <input
                            type="number"
                            value={despesaEditando?.vencto || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, vencto: e.target.value })
                            }
                        />
                        <label>Recebimento</label>
                        <input
                            type="number"
                            value={despesaEditando?.recto_fat || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, recto_fat: e.target.value })
                            }
                        />
                        <label>Valor</label>
                        <input
                            type="number"
                            value={despesaEditando?.valor || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, valor: e.target.value })
                            }
                        />
                        <label>Nota Fiscal</label>
                        <input
                            type="text"
                            value={despesaEditando?.nota_fiscal || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, nota_fiscal: e.target.value })
                            }
                        />
                        <label>Ordem de Compra</label>
                        <input
                            type="text"
                            value={despesaEditando?.ordem_de_compra || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, ordem_de_compra: e.target.value })
                            }
                        />
                        <label>Pedido</label>
                        <input
                            type="text"
                            value={despesaEditando?.pedido || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, pedido: e.target.value })
                            }
                        />
                        <label>Campo de Aplicação</label>
                        <input
                            type="text"
                            value={despesaEditando?.campo_aplicacao || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, campo_aplicacao: e.target.value })
                            }
                        />
                        <label>Observação</label>
                        <input
                            type="text"
                            value={despesaEditando?.observacao || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, observacao: e.target.value })
                            }
                        />
                <label>Status</label>
                    <select
                        value={despesaEditando?.status || ''}
                        onChange={(e) =>
                            setDespesaEditando({ ...despesaEditando, status: e.target.value })
                        }
                    >
                        <option value="null">null</option>
                        <option value="pendente">pendente</option>
                        <option value="concluida">concluida</option>
                        
                        
                    </select>

                        <label>Vencimento Original</label>
                        <input
                            type="date"
                            value={despesaEditando?.venctoo || ''}
                            onChange={(e) =>
                                setDespesaEditando({ ...despesaEditando, venctoo: e.target.value })
                            }
                        />
                        <button type="submit">Salvar</button>
                    
                    </form>
                </div>
            )}
        </div>
    );
}

export default Logado;
