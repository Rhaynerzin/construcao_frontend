import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default function Pagina(props) {
    
  return (
        <>
<Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Formularios" id="basic-nav-dropdown">
                <NavDropdown.Item href="/formularios/nome">Nome</NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Container>
    </Navbar>        

  <div className="text-center bg-secondary text-white py-2">
    <h1>{props.titulo}</h1>
  </div>
        
  <Container className="mt-2">
  {props.children}
  </Container>
        
        
        </>
    )
}