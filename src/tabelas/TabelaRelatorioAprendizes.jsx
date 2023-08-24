import { Form, Table, Row, Col } from "react-bootstrap";
import Cabecalho2 from "../templates/Cabecalho2";
import { Container } from "react-bootstrap";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function TabelaRelatorioAprendizes(props) {
  return (
    <div>
      <Cabecalho2
        texto1={"Relatório do Aprendiz"}
        texto2={"Selecionar aluno"}
      />
      <Container className="mt-3">
        <div
          className="d-flex justify-content-center w-100 mb-3"
        >
          <Form className="w-50">
            <Form.Group as={Row} controlId="consultaAluno">
              <Form.Label className="text-center" column sm={2}>
                Aluno
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="consultaAluno"
                  placeholder="Digite para consultar"
                  sm={10}
                ></Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <Container className="my-3 w-50"></Container>
        <Table hover style={{ fontSize: "12px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>CPF</th>
              <th>Nome</th>
              <th>Data Nascimento</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {props.alunos.map((aluno, i) => {
              return (
                <tr key={i}>
                  <td>{aluno.codigo}</td>
                  <td>{aluno.cpf}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.dtNascimento}</td>
                  <td>
                    <Link to={`${aluno.codigo}`}>
                      <AiOutlineFileSearch
                        size={20}
                        title={"Ver relatório de " + aluno.nome}
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
