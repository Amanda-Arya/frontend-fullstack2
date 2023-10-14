import { useState, useEffect } from "react";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";
import FormMatricula from "../formularios/FormMatricula";
import TabelaCadastroMatriculas from "../tabelas/TabelaMatriculas";

export default function TelaCadastroMatriculas(props) {
    const [exibeTabela, setExibeTabela] = useState(true);
    const [onEdit, setOnEdit] = useState(false);
    const [matriculas, setMatriculas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [filtro, setFiltro] = useState("");

    const getMatriculas = async () => {

        try {
            const res = await axios.get(urlBase + "/matriculas");
            setMatriculas(res.data);

        } catch (error) {
            toast.error(error);
        }
    };

    const getCursos = async () => {

        try {

            const res = await axios.get(urlBase + "/cursos");
            setCursos(res.data);
        } catch (error) {
            toast.error(error);
        }
    };
    const getAlunos = async () => {

        try {

            const res = await axios.get(urlBase + "/alunos");
            setAlunos(res.data);
        } catch (error) {
            toast.error(error);
        }
    };

    const getTurmas = async () =>{

        try {
            const res = await axios.get(urlBase + "/turmas");
            setTurmas(res.data);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getMatriculas();
        getCursos();
        getAlunos();
        getTurmas();
    }, [setMatriculas]);

    return exibeTabela ? (
        <TabelaCadastroMatriculas
            matriculas={matriculas}
            setMatriculas={setMatriculas}
            setOnEdit={setOnEdit}
            filtro={filtro}
            aoMudarFiltro={setFiltro}
            setExibeTabela={setExibeTabela}
        />
    ) : (
        <FormMatricula
            cursos={cursos}
            turmas ={turmas}
            alunos={alunos}
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getMatriculas={getMatriculas}
            setExibirTabela={setExibeTabela}
        />
    );

}