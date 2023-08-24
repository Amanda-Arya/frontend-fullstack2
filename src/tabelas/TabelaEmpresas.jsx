import { Table, Form } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BotaoNovo } from "../templates/Botoes";
import Cabecalho2 from "../templates/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroEmpresas({
  empresas,
  setEmpresas,
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
      .delete(`${urlBase}/empresas/${codigo}`)
      .then(({ data }) => {
        const newArray = empresas.filter(
          (empresa) => empresa.codigo !== codigo
        );

        setEmpresas(newArray);
        toast.info(data.mensagem);
      })
      .catch(({ response }) => toast.error(response.data.mensagem));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  empresas.forEach((empresa, i) => {
    if (
      empresa.razao_social.toLowerCase().indexOf(filtro.toLowerCase()) === -1
    ) {
      return;
    }
    linhas.push(
      <LinhaEmpresa
        empresa={empresa}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Empresas"} />
      <Container className="mt-3">
        <div className="d-flex mb-3 justify-content-between">
          <BotaoNovo acaoBtnNovo={() => setExibeTabela(false)} />
          <Form>
            <Form.Control
              type="text"
              value={filtro}
              placeholder="Pesquisar por razão social..."
              onChange={(e) => aoMudarFiltro(e.target.value)}
              style={{ width: "300px" }}
            />
          </Form>
        </div>
        <Table hover style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>IE</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Proprietário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaEmpresa({ empresa, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td>{empresa.codigo}</td>
      <td>{empresa.razao_social}</td>
      <td>{empresa.cnpj}</td>
      <td>{empresa.ie}</td>
      <td>{empresa.telefone}</td>
      <td>{empresa.email}</td>
      <td>{empresa.proprietario}</td>
      <td>
        <AiOutlineEdit size={20} onClick={() => handleEdit(empresa)} />{" "}
        <AiOutlineDelete
          size={20}
          onClick={() => handleConfirm(empresa.codigo)}
        />
      </td>
    </tr>
  );
}
