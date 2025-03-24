import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from "./pages/Home/Home";
import Logado from "./pages/Logado/Logado";
import CriarDespesa from "./pages/criar/Criar";
import CriarOrdemCompra from "./pages/Oc/solicitarOrdem";
import ListaOrdensCompra from "./pages/Oc/listaOc";
import Anual from "./pages/Anual/Anual";
import CriarAnual from "./pages/Anual/criarAnual";
import Diretoria from "./pages/Diretoria/Diretoria";
function App() {
  return (
    <BrowserRouter>
      <div id="root">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home_logado" element={<Logado />} />
            <Route path="/criar_despesa" element={<CriarDespesa />} />
            <Route path="/solicitar_ordem" element={<CriarOrdemCompra />} />
            <Route path="/anual" element={<Anual />} />
            <Route path="/anualcreate" element={<CriarAnual />} />
            <Route path="/lista_ordem" element={<ListaOrdensCompra />} />
            <Route path="/diretoria" element={<Diretoria />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
