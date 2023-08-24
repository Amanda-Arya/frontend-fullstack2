import Cabecalho2 from "../templates/Cabecalho2";
import { Container, Form, Dropdown } from "react-bootstrap";
// import listaRegistros from "../dados/registros";
import Registro from "../templates/Registro";
import { BotaoCancelar, BotaoSalvar, BotaoVoltar } from "../templates/Botoes";

export default function RelatorioAprendiz(props) {
  const obj = props.dados;

  return (
    <>
      <Cabecalho2
        texto1={"Relatório do Aprendiz"}
        texto2={`#${obj.codigo} - ${obj.nome}`}
      />
      <Container className="mt-3">
        <div
          className="d-flex justify-content-between w-100 mb-3"
          style={{ height: "40px" }}
        >
          <BotaoVoltar acaoBtnVoltar={props.chamarTabela} />
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              Ações aprendiz
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-2">Contrato</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Informações</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Form>
          <hr />
          <div
            className="d-flex flex-column align-items-center overflow-auto"
            style={{ minHeight: "200px", maxHeight: "200px" }}
          >
            {listaRegistros.length > 0 ? (
              <Registro registros={listaRegistros} />
            ) : (
              <h3>Nenhum registro por aqui...</h3>
            )}
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="w-75">
              {/* <textarea
                className="w-100 mb-3"
                name=""
                id=""
                cols="30"
                rows="5"
                style={{ resize: "none" }}
              ></textarea> */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Adicionar Registro</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ resize: "none" }}
                />
              </Form.Group>
            </div>

            <div className="w-75">
              <BotaoSalvar />
              <BotaoCancelar />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
}
