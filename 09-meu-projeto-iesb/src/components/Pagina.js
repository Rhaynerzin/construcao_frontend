'use client'

import { Container, Nav, Navbar } from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/funcionarios">Funcionários</Nav.Link>
            <Nav.Link href="">Clientes</Nav.Link>
            <Nav.Link href="">Produtos</Nav.Link>
            <Nav.Link href="">Vendas</Nav.Link>
            <Nav.Link href="">Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}