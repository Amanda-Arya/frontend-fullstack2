import { useState, useRef, useEffect } from "react";
import Cabecalho2 from "../templates/Cabecalho2";
import { Container, Form, Row, Col } from "react-bootstrap";
import MenuFormulario from "../templates/MenuFormulario";
import SearchBar from "../templates/SearchBar";
import axios from "axios";
import { urlBase } from "../utils/definicoes";
import { toast } from "react-toastify";


export default function FormMatricula({
    cursos,
    onEdit,
    setExibirTabela,
    setOnEdit,
    getMatriculas,
}) {

    const [validated, setValidated] = useState(false);
    const [alunosSelecionados, SetAlunosSelecionados] = useState({});
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const matricula = ref.current;
            matricula.codigo.value = onEdit.codigo;
            matricula.dataMatricula.value = onEdit.dataMatrciula;
            matricula.aluno.value = onEdit.aluno;
            matricula.curso.value = onEdit.curso;
           
        }
    }, [onEdit]);

    const handleBackButton = () => {
        if (onEdit) setOnEdit(null);
        setExibirTabela(true);
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        const matricula = ref.current;

        if (form.checkValidity()) {
            if (onEdit) {
                await axios
                    .put(urlBase + "/matriculas/", {
                        cod_matricula: matricula.codigo.value,
                        dataMatricula: matricula.dataMatricula.value,
                        cod_aluno: matricula.aluno.value,
                        cod_curso: matricula.curso.value,
                        

                    })
                    .then(({ data }) => toast.info(data.mensagem))
                    .catch(({ response }) => toast.error(response.data.mensagem));
            } else {
                await axios
                    .post(urlBase + "/matriculas/", {
                        cod_matricula: matricula.codigo.value,
                        dataMatricula: matricula.dataMatricula.value,
                        cod_aluno: matricula.aluno.value,
                        cod_curso: matricula.curso.value,
                        
                    })
                    .then(({ data }) => toast.info(data.mensagem))
                    .catch(({ response }) => toast.error(response.data.mensagem));
            }
            matricula.codigo.value = "";
            matricula.dataMatricula.value = "";
            matricula.aluno.value = "";
            matricula.curso.value = "";
           

            getMatriculas();
        } else {
            setValidated(true);
        }
    };


    return (
        <div>
            <Cabecalho2 texto1={"Cadastro"} texto2={"Matrícula"} />
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
                    <Row className="my-3" >
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <Form.Group>
                                <Form.Label>Código</Form.Label>
                                <Form.Control type="text" name="codigo" disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Data Matrícula</Form.Label>
                                <Form.Control type="date" name="data" required />
                                <Form.Control.Feedback type="invalid">
                                    Data da Matrícula é obrigatório!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Aluno</Form.Label>
                                <SearchBar placeholder={'Selecione o aluno'}
                                    dados={alunosSelecionados}
                                    campoChave={"cpf"}
                                    campoBusca={"nome"}
                                    funcaoSelecao={SetAlunosSelecionados}
                                    valor={""}
                                /> 
                                 <Form.Control.Feedback type="invalid">
                                    aluno é obrigatório!
                                </Form.Control.Feedback>

                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Curso</Form.Label>
                                <Form.Select name="curso" required>
                                    <option value="">Selecione</option>
                                    {cursos.map((curso, i) => {
                                        return (
                                            <option value={curso.codigo} key={i}>{curso.nome}</option>

                                        );
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Escolha do curso é obrigatório!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}