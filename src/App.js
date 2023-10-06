import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  PaginaCadastroCurso,
  Pagina404,
  PaginaCadastroEmpresa,
  PaginaInicial,
  PaginaCadastroFuncionario,
  PaginaCadastroCargo,
  PaginaCadastroAluno,
  PaginaCadastroTurma,
  PaginaCadastroMatricula
} from "./telas/Paginas";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/frontend-fullstack2" element={<PaginaInicial />} />
          <Route
            exact
            path="cadastro-curso"
            element={<PaginaCadastroCurso />}
          />
          <Route
            exact
            path="cadastro-empresa"
            element={<PaginaCadastroEmpresa />}
          />
          <Route
            exact
            path="cadastro-funcionario"
            element={<PaginaCadastroFuncionario />}
          />
          <Route
            exact
            path="cadastro-cargo"
            element={<PaginaCadastroCargo />}
          />
          *<Route
            exact
            path="cadastro-aluno"
            element={<PaginaCadastroAluno />}
          />
          <Route
            exact
            path="cadastro-turma"
            element={<PaginaCadastroTurma />}
          />
          <Route
            exact
            path="cadastro-matricula"
            element={<PaginaCadastroMatricula />}
          
          />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
