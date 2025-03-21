import React, { useEffect, useState } from "react";
import supabase from "../../supabaseclient";
import "./oc.css"; // Importa o CSS

const ListaOrdensCompra = () => {
  const [ordens, setOrdens] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assinatura, setAssinatura] = useState("");
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  useEffect(() => {
    const fetchOrdens = async () => {
      const setorId = parseInt(localStorage.getItem("setor_id"), 10);

      if (!setorId) {
        console.error("Erro: setor_id não encontrado no LocalStorage");
        return;
      }

      const { data, error } = await supabase
        .from("ordem_compra")
        .select("*")
        .eq("id_setores", setorId);

      if (error) {
        console.error("Erro ao buscar ordens:", error.message);
      } else {
        setOrdens(data);
      }
    };

    fetchOrdens();
  }, []);

  const abrirModal = (ordem) => {
    setOrdemSelecionada(ordem);
    setAssinatura(ordem.assinatura || "");
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setOrdemSelecionada(null);
  };

  const salvarAssinatura = async () => {
    if (!ordemSelecionada) return;

    const status = assinatura ? "Aprovado" : "Pendente";

    const { error } = await supabase
      .from("ordem_compra")
      .update({ assinatura, status })
      .eq("id", ordemSelecionada.id);

    if (error) {
      console.error("Erro ao atualizar assinatura:", error.message);
    } else {
      setOrdens(
        ordens.map((ordem) =>
          ordem.id === ordemSelecionada.id
            ? { ...ordem, assinatura, status }
            : ordem
        )
      );
      fecharModal();
    }
  };

  return (<>
  <br/>
      <h1 id="centro">Ordens de Compra Solicitadas</h1>
<br/>
    <div className="container_total">

      <div className="table-container">
        <table id="table">
          <thead id="thead">
            <tr id="tr">
       
              <th>Ordem</th>
              <th>Solicitante</th>
              <th>Empresa</th>
              <th>Status</th>
              <th>Assinatura</th>
              
          
            </tr>
          </thead>
          <tbody>
            {ordens.map((ordem) => (
              <tr
                key={ordem.id}
                className={ordem.status === "Aprovado" ? "aprovado" : "pendente"}
              >
      
                <td>{ordem.ordem}</td>
                <td>{ordem.solicitante}</td>
                <td>{ordem.empresa}</td>
                <td className="status">{ordem.status}</td>
                <td>
                  {ordem.assinatura ? (
                    ordem.assinatura
                  ) : (
                    <button id="editar" onClick={() => abrirModal(ordem)}>Assinar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Assinar Ordem #{ordemSelecionada?.id}</h2><br/>
            <input
              type="text"
              value={assinatura}
              onChange={(e) => setAssinatura(e.target.value)}
              placeholder="Digite sua assinatura"
            /><br/>
            <div className="modal-buttons">
              <button className="save" onClick={salvarAssinatura}>
                Salvar
              </button>
              <button className="cancel" onClick={fecharModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>);
};

export default ListaOrdensCompra;
