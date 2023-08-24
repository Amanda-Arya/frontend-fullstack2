import { useState, useEffect } from "react";
import FormTurma from "../formularios/FormTurma";
import TabelaCadastroTurmas from "../tabelas/TabelaTurmas";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroTurmas(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getTurmas = async () => {
    try {
      const res = await axios.get(urlBase + "/turmas");
      setTurmas(res.data.sort((a, b) => (a.codigo > b.codigo ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getFuncionarios = async () => {
    try {
      const res = await axios.get(urlBase + "/funcionarios/professor");
      setFuncionarios(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getCursos = async () => {
    try {
      const res = await axios.get(urlBase + "/cursos");
      setCursos(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getTurmas();
    getFuncionarios();
    getCursos();
  }, [setTurmas]);

  return exibeTabela ? (
    <TabelaCadastroTurmas
      turmas={turmas}
      setTurmas={setTurmas}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <FormTurma
      cursos={cursos}
      funcionarios={funcionarios}
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      getTurmas={getTurmas}
      setExibeTabela={setExibeTabela}
    />
  );
}
