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
    turmas,
    onEdit,
    setExibirTabela,
    setOnEdit,
    getMatriculas,
}) {

    const [validated, setValidated] = useState(false);
    const [alunos, setAlunos] = useState([]);  
    const [alunoSelecionado, setAlunoSelecionado] = useState();
    const [cursoSelecionado, setCursoSelecionado] = useState();
    const ref = useRef();

    useEffect(() => {
        axios.get(urlBase + '/alunos')
            .then((response) => {
                if (response.status === 200)
                    setAlunos(response.data);
            })
            .catch((error) => {
                toast.error(error.mensagem);
            })
    }, []);

    useEffect(() => {
        if (alunoSelecionado) {
            const matricula = ref.current;
            matricula.aluno.value = alunoSelecionado.nome;
        }
    }, [alunoSelecionado]);

    useEffect(() => {
        if (cursoSelecionado) {
            const matricula = ref.current;
            matricula.curso.value = cursoSelecionado.nome;
        }
    }, [cursoSelecionado])

    useEffect(() => {
        if (onEdit) {
            const matricula = ref.current;
            matricula.codigo.value = onEdit.cod_matricula;
            matricula.dataMatricula.value = onEdit.dataMatricula?.slice(0, 10);
            matricula.aluno.value = onEdit.aluno.nome;
            matricula.curso.value = onEdit.curso.codigo;
            matricula.turma.value = onEdit.turma.codigo_turma;
            setAlunoSelecionado(onEdit.aluno);
            setCursoSelecionado(onEdit.curso);
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

    const limpaCampos = () =>{

        matricula.codigo.value = "";
        matricula.dataMatricula.value = "";
        matricula.aluno.value = "";
        matricula.curso.value = "";
        matricula.turma.value ="";
    }

        if (form.checkValidity()) {
            if (onEdit) {
                await axios
                    .put(urlBase + "/matriculas/", {
                        cod_matricula: matricula.codigo.value,
                        dataMatricula: matricula.dataMatricula.value,
                        cod_aluno: alunoSelecionado.codigo,
                        cod_curso: cursoSelecionado.codigo,
                        cod_turma: matricula.turma.value,
                    })
                    .then(({ data }) => {
                        limpaCampos();
                        toast.info(data.mensagem)
                    })
                    .catch(({ response }) => toast.error(response.data.mensagem));
            } else {
                
                await axios
                    
                    .post(urlBase + "/matriculas/", {
                        cod_matricula: matricula.codigo.value,
                        dataMatricula: matricula.dataMatricula.value,
                        cod_aluno: alunoSelecionado.codigo,
                        cod_curso: cursoSelecionado.codigo,
                        cod_turma: matricula.turma.value,
                    })
                    .then(({ data }) => toast.info(data.mensagem))
                    .catch(({ response }) => toast.error(response.data.mensagem));
            }
           

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
                                <Form.Control type="date" name="dataMatricula" required />
                                <Form.Control.Feedback type="invalid">
                                    Data da Matrícula é obrigatório!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Aluno</Form.Label>
                                <SearchBar
                                    placeholder={'Selecione o aluno'}
                                    dados={alunos}
                                    name={"aluno"}
                                    campoChave={"codigo"}
                                    campoBusca={"nome"}
                                    funcaoSelecao={setAlunoSelecionado}
                                    ref={ref}
                                    valor={onEdit?.aluno?.nome}
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
                                <SearchBar
                                    placeholder={'Selecione o curso'}
                                    dados={cursos}
                                    name={"curso"}
                                    campoChave={"codigo"}
                                    campoBusca={"nome"}
                                    funcaoSelecao={setCursoSelecionado}
                                    ref={ref}
                                    valor={onEdit?.curso?.nome}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Curso é obrigatório!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* <Row className="mt-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Curso</Form.Label>
                                <Form.Select name="curso" required>
                                    <option value="" disabled selected>Selecione</option>
                                    {cursos.map((curso, i) => <option value={curso.codigo} key={i}>{curso.nome}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Escolha do curso é obrigatório!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row> */}
                    <Row className="mt-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Turma </Form.Label>
                                <Form.Select name="turma" required>
                                    <option value="" disabled selected>Selecione</option>
                                    {turmas.map((turma, i) => <option value={turma.codigo_turma} key={i}>{turma.curso.nome} - {turma.ano_letivo}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Escolha da turma é obrigatório!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}