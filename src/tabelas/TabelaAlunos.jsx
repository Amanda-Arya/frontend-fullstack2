import { Table, Form } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BotaoNovo } from "../templates/Botoes";
import Cabecalho2 from "../templates/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroAlunos({
  alunos,
  setAlunos,
  filtro,
  aoMudarFiltro,
  setOnEdit,
  setExibeTabela,
}) {
  const linhas = [];

  const confirmOnDelete = (codigo) => {
    if (window.confirm(`Confirma a exclusão do item ${codigo}?`)) {
      handleDelete(codigo);
    }
  };

  const handleDelete = async (codigo) => {
    await axios
      .delete(`${urlBase}/alunos/${codigo}`)
      .then(({ data }) => {
        const newArray = alunos.filter((aluno) => aluno.codigo !== codigo);

        setAlunos(newArray);
        toast.info(data.mensagem);
      })
      .catch(({ response }) => toast.error(response.data.mensagem));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  alunos.forEach((aluno, i) => {
    if (aluno.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaAluno
        aluno={aluno}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Alunos"} />
      <Container className="mt-3">
        <div className="d-flex mb-3 justify-content-between">
          <BotaoNovo acaoBtnNovo={() => setExibeTabela(false)} />
          <Form>
            <Form.Control
              type="text"
              value={filtro}
              placeholder="Pesquisar por nome..."
              onChange={(e) => aoMudarFiltro(e.target.value)}
              style={{ width: "300px" }}
            />
          </Form>
        </div>
        <Table hover style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>CPF</th>
              <th>Nome</th>
              <th>RG</th>
              <th>Telefone</th>
              <th>Escola</th>
              <th>Serie</th>
              <th>Periodo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaAluno({ aluno, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td>{aluno.codigo}</td>
      <td>{aluno.cpf}</td>
      <td>{aluno.nome}</td>
      <td>{aluno.rg}</td>
      <td>{aluno.telefone}</td>
      <td>{aluno.escola}</td>
      <td>{aluno.serie}</td>
      <td>{aluno.periodo}</td>
      <td>
        <AiOutlineEdit size={20} onClick={() => handleEdit(aluno)} />{" "}
        <AiOutlineDelete
          size={20}
          onClick={() => handleConfirm(aluno.codigo)}
        />
      </td>
    </tr>
  );
}
