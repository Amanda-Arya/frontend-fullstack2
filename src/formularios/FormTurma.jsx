import { Container, Col, Form, Row, InputGroup } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import MenuFormulario from "../templates/MenuFormulario";
import Cabecalho2 from "../templates/Cabecalho2";
import { urlBase } from "../utils/definicoes";
import { toast } from "react-toastify";
import axios from "axios";
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FormTurma({
  cursos,
  funcionarios,
  onEdit,
  setExibeTabela,
  setOnEdit,
  getTurmas,
}) {
  const [validated, setValidated] = useState(false);
  const [listaProfessores, setListaProfessores] = useState([]);
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
      turma.curso.value = onEdit.curso.codigo;
      if (Array.isArray(onEdit.funcionarios) && onEdit.funcionarios.length > 0) {
        const codigos = onEdit.funcionarios.map((item) => item.codigo);
        setListaProfessores(codigos);
      }
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const limpaCampos = () => {

    const turma = ref.current;
    turma.codigo.value = "";
    turma.periodo.value = "";
    turma.ano_letivo.value = "";
    turma.dt_inicio.value = "";
    turma.dt_fim.value = "";
    turma.status.value = "";
    turma.vagas.value = "";
    turma.funcionario.value = "";
    turma.curso.value = "";

    setListaProfessores([]);
  }

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
            funcionarios: listaProfessores,
            curso: turma.curso.value,
          })
          .then(({ data }) => {
            limpaCampos();
            toast.info(data.mensagem);
          })
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
            funcionarios: listaProfessores,
            curso: turma.curso.value,
          })
          .then(({ data }) => {
            limpaCampos();
            toast.info(data.mensagem);
          })
          .catch(({ response }) => toast.error(response.data.mensagem));
      }
      getTurmas();
    } else {
      setValidated(true);
    }
  };

  function handleAddProfessor() {
    const turma = ref.current;
    if (turma?.funcionario?.value !== "") {
      if (!listaProfessores.some((item) => item == turma?.funcionario?.value))
        setListaProfessores(state => [...state, turma.funcionario.value])
    }
  }

  function handleRemoverProfessor(professor) {
    const index = listaProfessores.findIndex((item) => item == professor);
    if (index > -1) {
      listaProfessores.splice(index, 1);
      setListaProfessores([...listaProfessores]);
    }
  }

  const buscaNomeProfessor = (professor) =>
    funcionarios.find((funcionario) => funcionario.codigo_funcionario == professor)?.nome;

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
                <InputGroup>
                  <Form.Select name="funcionario">
                    <option value="">Selecione</option>
                    {funcionarios.map((funcionario, i) => {
                      return (
                        <option value={funcionario.codigo_funcionario} key={i}>
                          {funcionario.nome}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <InputGroup.Text onClick={() => handleAddProfessor()}>
                    <FontAwesomeIcon icon={faPlus} />
                  </InputGroup.Text>
                  <Form.Control.Feedback type="invalid">
                    Professor da turma é obrigatório!
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <ul>
                {listaProfessores.map((professor) => (
                  <li key={professor}>{buscaNomeProfessor(professor)} <FontAwesomeIcon icon={faTrash} onClick={() => handleRemoverProfessor(professor)} /></li>
                ))}
              </ul>
            </Col>
          </Row>
        </Form>
      </Container>
    </div >
  );
}
