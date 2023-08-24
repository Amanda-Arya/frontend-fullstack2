import { Container, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import MenuFormulario from "../templates/MenuFormulario";
import Cabecalho2 from "../templates/Cabecalho2";
import { urlBase } from "../utils/definicoes";
import { toast } from "react-toastify";
import axios from "axios";

export default function FormCurso({
  onEdit,
  setExibeTabela,
  setOnEdit,
  getCursos,
}) {
  const [validated, setValidated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const curso = ref.current;
      curso.codigo.value = onEdit.codigo;
      curso.nome.value = onEdit.nome;
      curso.sala.value = onEdit.sala;
      curso.eixo.value = onEdit.eixo;
      curso.carga_horas.value = onEdit.carga_horas;
      curso.dt_criacao.value = onEdit.dt_criacao;
      curso.dt_desativacao.value = onEdit.dt_desativacao;
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const curso = ref.current;

    if (form.checkValidity()) {
      if (onEdit) {
        await axios
          .put(urlBase + "/cursos/", {
            codigo: curso.codigo.value,
            nome: curso.nome.value,
            sala: curso.sala.value,
            eixo: curso.eixo.value,
            carga_horas: curso.carga_horas.value,
            dt_criacao: curso.dt_criacao.value,
            dt_desativacao: curso.dt_desativacao.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ data }) => toast.error(data.mensagem));
      } else {
        await axios
          .post(urlBase + "/cursos/", {
            codigo: curso.codigo.value,
            nome: curso.nome.value,
            sala: curso.sala.value,
            eixo: curso.eixo.value,
            carga_horas: curso.carga_horas.value,
            dt_criacao: curso.dt_criacao.value,
            dt_desativacao: curso.dt_desativacao.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ data }) => toast.error(data.mensagem));
      }

      curso.codigo.value = "";
      curso.nome.value = "";
      curso.sala.value = "";
      curso.eixo.value = "";
      curso.carga_horas.value = "";
      curso.dt_criacao.value = "";
      curso.dt_desativacao.value = "";

      getCursos();
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Curso"} />
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
          <Row className="mb-3">
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control type="text" name="codigo" disabled />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Digite o nome do curso"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Nome do curso é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Sala</Form.Label>
                <Form.Control
                  type="text"
                  name="sala"
                  placeholder="Digite a sala do curso"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Sala do curso é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Eixo</Form.Label>
                <Form.Control
                  type="text"
                  name="eixo"
                  placeholder="Digite o eixo formativo do curso"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Eixo formativo do curso é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Carga horária</Form.Label>
                <Form.Control
                  type="number"
                  name="carga_horas"
                  placeholder="Digite a carga horária do curso"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Carga horária do curso é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Criado em</Form.Label>
                <Form.Control type="date" name="dt_criacao" required />
                <Form.Control.Feedback type="invalid">
                  Data de criação é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Desativado em</Form.Label>
                <Form.Control type="date" name="dt_desativacao" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
