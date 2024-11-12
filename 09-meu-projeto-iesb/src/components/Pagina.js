'use client'

import { Container, Nav, Navbar } from "react-bootstrap"
import { FaCar, FaListAlt, FaPlusCircle } from "react-icons/fa"

export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="primary" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <FaCar className="me-2" />
            Paiva's Car
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/veiculos">
                <FaListAlt className="me-2" />
                Lista de Veículos
              </Nav.Link>
              <Nav.Link href="/veiculos/form">
                <FaPlusCircle className="me-2" />
                Novo Veículo
              </Nav.Link>
              <Nav.Link href="/vendedores">
                <FaListAlt className="me-2" />
                Vendedores
              </Nav.Link>
              <Nav.Link href="/clientes">
                <FaListAlt className="me-2" />
                Clientes
              </Nav.Link>
              <Nav.Link href="/vendas">
                <FaListAlt className="me-2" />
                Vendas
              </Nav.Link>
              <Nav.Link href="">
                <FaListAlt className="me-2" />
                Dashboard
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de Título */}
      <div className="bg-dark text-center text-white py-2">
        <h1>{"Paiva's Car"}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}
