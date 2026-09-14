import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Produto from './pages/Produto'
import Servicos from './pages/Servicos'
import Sobre from './pages/Sobre'
import Loja from './pages/Loja'
import Login from './admin/Login'
import AdminGuard from './admin/AdminGuard'
import Dashboard from './admin/Dashboard'
import ProdutoForm from './admin/ProdutoForm'
import Categorias from './admin/Categorias'

export default function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/produto/:id" element={<Produto />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/loja" element={<Loja />} />

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminGuard><Dashboard /></AdminGuard>} />
      <Route path="/admin/produto/novo" element={<AdminGuard><ProdutoForm /></AdminGuard>} />
      <Route path="/admin/produto/:id/editar" element={<AdminGuard><ProdutoForm /></AdminGuard>} />
      <Route path="/admin/categorias" element={<AdminGuard><Categorias /></AdminGuard>} />

      <Route path="*" element={<Home />} />
    </Routes>
  )
}
