import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Atracoes from "./pages/Atracoes/Atracoes";
import Pagamento from "./pages/Pagamento/Pagamento";
import Logado from "./pages/Logado/Logado";
import CriarDespesa from "./pages/criar/Criar";
import CriarOrdemCompra from "./pages/Oc/solicitarOrdem";
import ListaOrdensCompra from "./pages/Oc/listaOc";
import Anual from "./pages/Anual/Anual";
import CriarAnual from "./pages/Anual/criarAnual";
function App() {
  return (
    <BrowserRouter>
      <div id="root">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/atracoes" element={<Atracoes />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/home_logado" element={<Logado />} />
            <Route path="/criar_despesa" element={<CriarDespesa />} />
            <Route path="/solicitar_ordem" element={<CriarOrdemCompra />} />
            <Route path="/anual" element={<Anual />} />
            <Route path="/anualcreate" element={<CriarAnual />} />
            <Route path="/lista_ordem" element={<ListaOrdensCompra />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
