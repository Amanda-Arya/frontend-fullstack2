import { Table, Form } from "react-bootstrap";
import { BotaoNovo } from "../templates/Botoes";
import Cabecalho2 from "../templates/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";


export default function TabelaCadastroMatriculas({
    matriculas,
    setMatriculas,
    filtro,
    aoMudarFiltro,
    setOnEdit,
    setExibeTabela,
}) {

    const linhas = [];

    const confirmDelete = (codigo) => {
        if (window.confirm(`Confirma a exclusão do item ${codigo}?`)) {
            handleDelete(codigo);
        };
    };

    const handleDelete = async (codigo) => {
        await axios
            .delete(`${urlBase}/matriculas/${codigo}`)
            .then(({ data }) => {
                const newLista = matriculas.filter((matricula) => matricula.codigo !== codigo);
                setMatriculas(newLista);
                toast.info(data.mennsagem);
            }).catch(({ response }) => toast.error(response.data.mensagem));
        setOnEdit(null);
    };

    const handleEdit = (item) => {
        setOnEdit(item);
        setExibeTabela(false);
    };


    matriculas.forEach((matricula, i) => {
        if (matricula.dataMatricula.indexOf(filtro) === -1) {
            return;
        }
        linhas.push(
            <LinhaMatricula
                matricula={matricula}
                key={i}
                handleEdit={handleEdit}
                handleConfirm={confirmDelete}
            />
        );

    });
    return (
        <div>
            <Cabecalho2 texto1={"Consulta"} texto2={"Matriculas"} />
            <Container className="mt-3">
                <div className="d-flex mb-3 justify-content-between">
                    <BotaoNovo botaoNovo={() => setExibeTabela(false)} />
                    <Form>
                        <Form.Control
                            type="text"
                            value={filtro}
                            placeholder="data matrícula..."
                            onChange={(e) => aoMudarFiltro(e.target.value)}
                            style={{ width: "300px" }}

                        />
                    </Form>
                </div>
                <Table hover style={{ fontSize: "14px" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Data Matrícula</th>
                            <th>Aluno</th>
                            <th>Curso</th>
                        </tr>
                    </thead>
                    <tbody>{linhas}</tbody>

                </Table>

            </Container>
        </div>
    );
}
function LinhaMatricula({ matricula, handleEdit, handleConfirm }) {
    return (
      <tr>
        <td>{matricula.codigo}</td>
        <td>{matricula.dataMatricula}</td>
        <td>{matricula.aluno}</td>
        <td>{matricula.curso}</td>
        <td>
         
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit(matricula)} />
          <FontAwesomeIcon icon={faTrash} onClick={() => handleConfirm(matricula.codigo)} />
          
        </td>
      </tr>
    );
  }