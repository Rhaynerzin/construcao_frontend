'use client'

import { Container, Nav, Navbar } from "react-bootstrap"
import { FaCarAlt, FaClipboardList, FaUserFriends, FaUserTie, FaShoppingCart, FaStore } from "react-icons/fa"

export default function Pagina({ children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="primary" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/"><FaCarAlt className="me-2" /> Paiva's Car
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav"/>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/veiculos"><FaClipboardList className="me-2" /> Lista de Veículos
              </Nav.Link>
              <Nav.Link href="/veiculos/form"><FaCarAlt className="me-2" /> Novo Veículo
              </Nav.Link>
              <Nav.Link href="/vendedores"><FaUserTie className="me-2" /> Vendedores
              </Nav.Link>
              <Nav.Link href="/fornecedores"><FaStore className="me-2" /> Fornecedores
              </Nav.Link>
              <Nav.Link href="/clientes"><FaUserFriends className="me-2" /> Clientes
              </Nav.Link>
              <Nav.Link href="/vendas"><FaShoppingCart className="me-2" /> Vendas
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
