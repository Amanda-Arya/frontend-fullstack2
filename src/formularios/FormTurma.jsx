import { Container, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import MenuFormulario from "../templates/MenuFormulario";
import Cabecalho2 from "../templates/Cabecalho2";
import { urlBase } from "../utils/definicoes";
import { toast } from "react-toastify";
import axios from "axios";

export default function FormTurma({
  cursos,
  funcionarios,
  onEdit,
  setExibeTabela,
  setOnEdit,
  getTurmas,
}) {
  const [validated, setValidated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const turma = ref.current;
      turma.codigo.value = onEdit.codigo;
      turma.periodo.value = onEdit.periodo;
      turma.ano_letivo.value = onEdit.ano_letivo;
      turma.dt_inicio.value = onEdit.dt_inicio;
      turma.dt_fim.value = onEdit.dt_fim;
      turma.status.value = onEdit.status;
      turma.vagas.value = onEdit.vagas;
      turma.funcionario.value = onEdit.Funcionario_codigo;
      turma.curso.value = onEdit.Curso_codigo;
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const turma = ref.current;

    if (form.checkValidity()) {
      if (onEdit) {
        await axios
          .put(urlBase + "/turmas/", {
            codigo: turma.codigo.value,
            periodo: turma.periodo.value,
            ano_letivo: turma.ano_letivo.value,
            dt_inicio: turma.dt_inicio.value,
            dt_fim: turma.dt_fim.value,
            status: turma.status.value,
            vagas: turma.vagas.value,
            funcionario: turma.funcionario.value,
            curso: turma.curso.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ response }) => toast.error(response.data.mensagem));
      } else {
        await axios
          .post(urlBase + "/turmas/", {
            codigo: turma.codigo.value,
            periodo: turma.periodo.value,
            ano_letivo: turma.ano_letivo.value,
            dt_inicio: turma.dt_inicio.value,
            dt_fim: turma.dt_fim.value,
            status: turma.status.value,
            vagas: turma.vagas.value,
            funcionario: turma.funcionario.value,
            curso: turma.curso.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ response }) => toast.error(response.data.mensagem));
      }

      turma.codigo.value = "";
      turma.periodo.value = "";
      turma.ano_letivo.value = "";
      turma.dt_inicio.value = "";
      turma.dt_fim.value = "";
      turma.status.value = "";
      turma.vagas.value = "";
      turma.funcionario.value = "";
      turma.curso.value = "";

      getTurmas();
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Turma"} />
      <Container className="mt-3">
        <Form
          method="POST"
          action="#"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          ref={ref}
        >
          <MenuFormulario acaoBtnVoltar={() => handleBackButton()} />
          <Row className="my-3">
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control type="text" name="codigo" disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Período</Form.Label>
                <Form.Select name="periodo" required>
                  <option value="">Selecione</option>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Noturno">Noturno</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Período da turma é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Ano Letivo</Form.Label>
                <Form.Control
                  type="number"
                  name="ano_letivo"
                  placeholder="Digite o ano letivo"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ano letivo é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Curso</Form.Label>
                <Form.Select name="curso" required>
                  <option value="">Selecione</option>
                  {cursos.map((curso, i) => {
                    return (
                      <option value={curso.codigo} key={i}>
                        {curso.nome}
                      </option>
                    );
                  })}

                  {/* <option value="Técnicas em Serviços de Supermercados">
                    Técnicas em Serviços de Supermercados
                  </option>
                  <option value="Informática">
                    Informática
                  </option>
                  <option value="Comunicação e Linguagem e Informática">
                    Comunicação e Linguagem e Informática
                  </option> */}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Escolha do curso é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Data Início</Form.Label>
                <Form.Control type="date" name="dt_inicio" required />
                <Form.Control.Feedback type="invalid">
                  Data de início é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Data Fim</Form.Label>
                <Form.Control type="date" name="dt_fim" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" required>
                  <option value="">Selecione</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Status atual da turma é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Vagas</Form.Label>
                <Form.Control
                  type="number"
                  name="vagas"
                  placeholder="Digite a quantidade de vagas para turma"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Quantidade de vagas é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Professor</Form.Label>
                <Form.Select name="funcionario" required>
                  <option value="">Selecione</option>
                  {funcionarios.map((funcionario, i) => {
                    return (
                      <option value={funcionario.codigo_funcionario} key={i}>
                        {funcionario.nome}
                      </option>
                    );
                  })}

                  {/* <option value="Aglaê">Aglaê</option>
                  <option value="Renato">Renato</option>
                  <option value="Mario">Mario</option> */}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Professor da turma é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
