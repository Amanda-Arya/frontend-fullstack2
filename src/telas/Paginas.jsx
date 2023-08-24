import Pagina from "../templates/Pagina";
import error from "./img/erro404.jpg";
import TelaCadastroCursos from "./TelaCursos";
import TelaCadastroEmpresas from "./TelaEmpresas";
import TelaCadastroCargos from "./TelaCargos";
import TelaCadastroFuncionarios from "./TelaFuncionarios";
import "./styles/Tela404.css";
import TelaCadastroAlunos from "./TelaAlunos";
import TelaCadastroTurmas from "./TelaTurmas";

// PÁGINAS

function PaginaCadastroAluno(props) {
  const obj = { texto1: "Cadastro", texto2: "Aluno" };

  return (
    <Pagina obj={obj}>
      <TelaCadastroAlunos />
    </Pagina>
  );
}

function PaginaCadastroCargo(props) {
  const obj = { texto1: "Cadastro", texto2: "Cargo" };

  return (
    <Pagina obj={obj}>
      <TelaCadastroCargos />
    </Pagina>
  );
}

function PaginaCadastroCurso(props) {
  const obj = { texto1: "Cadastro", texto2: "Curso" };

  return (
    <Pagina obj={obj}>
      <TelaCadastroCursos />
    </Pagina>
  );
}

function PaginaCadastroEmpresa(props) {
  const obj = { texto1: "Cadastro", texto2: "Empresa" };
  return (
    <Pagina obj={obj}>
      <TelaCadastroEmpresas />
    </Pagina>
  );
}

function PaginaCadastroFuncionario(props) {
  const obj = { texto1: "Cadastro", texto2: "Funcionario" };
  return (
    <Pagina obj={obj}>
      <TelaCadastroFuncionarios />
    </Pagina>
  );
}

function PaginaCadastroTurma(props) {
  const obj = { texto1: "Cadastro", texto2: "Turma" };

  return (
    <Pagina obj={obj}>
      <TelaCadastroTurmas />
    </Pagina>
  );
}

function Pagina404(props) {
  return (
    <Pagina>
      <div className="tela-erro">
        <img src={error} alt="Erro 404" />
        <h1>Página Não Encontrada</h1>
        <h2>A página que você está procurando não pôde ser encontrada</h2>
      </div>
    </Pagina>
  );
}

// TELAS

function PaginaInicial(props) {
  return (
    <Pagina>
      {
        // Exibe apenas o menu
      }
    </Pagina>
  );
}

export {
  PaginaCadastroCurso,
  Pagina404,
  PaginaCadastroEmpresa,
  PaginaInicial,
  PaginaCadastroTurma,
  PaginaCadastroFuncionario,
  PaginaCadastroAluno,
  PaginaCadastroCargo,
};
