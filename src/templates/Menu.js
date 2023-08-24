import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./styles/Menu.css";

export default function Menu() {
  return (
    <>
      <Navbar className="custom-navbar" expand={false}>
        <Container>
          <Navbar.Toggle aria-controls={`offcanvasNavbar`}>
            <GiHamburgerMenu color="white" size={25} />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar`}
            aria-labelledby={`offcanvasNavbarLabel`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <NavDropdown title="Cadastro" id={`offcanvasNavbarDropdown`}>
                  <NavDropdown.Item as={Link} to="/cadastro-aluno">
                    Aluno
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cadastro-cargo">
                    Cargo
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cadastro-curso">
                    Curso
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cadastro-empresa">
                    Empresa
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cadastro-funcionario">
                    Funcionario
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cadastro-turma">
                    Turma
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/relatorio-aprendiz">
                  Relatório do Aprendiz
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
