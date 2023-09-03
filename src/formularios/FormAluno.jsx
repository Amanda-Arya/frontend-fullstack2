import { Container, Col, Form, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import MenuFormulario from '../templates/MenuFormulario';
import Cabecalho2 from '../templates/Cabecalho2';
import { urlBase } from '../utils/definicoes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { rg, cpf, cep, telefone } from '../utils/masks';

export default function FormAluno({
  onEdit,
  setExibeTabela,
  setOnEdit,
  getAlunos,
}) {
  const [validated, setValidated] = useState(false);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const ref = useRef();

  useEffect(() => {
    axios.get(`${urlBase}/estados`).then((response) => {
      setEstados(response.data);
    });
  }, []);

  useEffect(() => {
    if (onEdit) {
      const aluno = ref.current;
      aluno.codigo.value = onEdit.codigo;
      aluno.rg.value = onEdit.rg;
      aluno.cpf.value = onEdit.cpf;
      aluno.nome_mae.value = onEdit.nome_mae;
      aluno.dt_nasc.value = onEdit.dt_nasc;
      aluno.escola.value = onEdit.escola;
      aluno.serie.value = onEdit.serie;
      aluno.periodo.value = onEdit.periodo;
      aluno.nome.value = onEdit.nome;
      aluno.telefone.value = onEdit.telefone;
      aluno.email.value = onEdit.email;
      aluno.endereco.value = onEdit.endereco;
      aluno.bairro.value = onEdit.bairro;
      aluno.cidade.value = onEdit.cidade;
      aluno.cep.value = onEdit.cep;
      aluno.uf.value = onEdit.uf;
    }
  }, [onEdit]);

  const handleRgMask = (e) => {
    rg(e);
  };

  const handleCpfMask = (e) => {
    cpf(e);
  };

  const handleCepMask = (e) => {
    cep(e);
  };

  const handleTelMask = (e) => {
    telefone(e);
  };

  const clearForm = (aluno) => {
    aluno.codigo.value = '';
    aluno.rg.value = '';
    aluno.cpf.value = '';
    aluno.nome_mae.value = '';
    aluno.dt_nasc.value = '';
    aluno.escola.value = '';
    aluno.serie.value = '';
    aluno.periodo.value = '';
    aluno.nome.value = '';
    aluno.telefone.value = '';
    aluno.email.value = '';
    aluno.endereco.value = '';
    aluno.bairro.value = '';
    aluno.cidade.value = '';
    aluno.cep.value = '';
    aluno.uf.value = '';
  };
  const handleCidade = async (id_estado) => {
    const response = await axios.get(`${urlBase}/cidades/${id_estado}`);
    setCidades(response.data);
  };
  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const aluno = ref.current;

    if (form.checkValidity()) {
      if (onEdit) {
        await axios
          .put(`${urlBase}/alunos/`, {
            codigo: aluno.codigo.value,
            rg: aluno.rg.value,
            cpf: aluno.cpf.value,
            nome_mae: aluno.nome_mae.value,
            dt_nasc: aluno.dt_nasc.value,
            escola: aluno.escola.value,
            serie: aluno.serie.value,
            periodo: aluno.periodo.value,
            nome: aluno.nome.value,
            telefone: aluno.telefone.value,
            email: aluno.email.value,
            endereco: aluno.endereco.value,
            bairro: aluno.bairro.value,
            cidade: aluno.cidade.value,
            cep: aluno.cep.value,
            uf: aluno.uf.value,
          })
          .then(({ data }) => {
            toast.info(data.mensagem);
            clearForm(aluno);
          })
          .catch(({ response }) => {
            toast.error(response.data.mensagem);
          });
      } else {
        await axios
          .post(`${urlBase}/alunos/`, {
            rg: aluno.rg.value,
            cpf: aluno.cpf.value,
            nome_mae: aluno.nome_mae.value,
            dt_nasc: aluno.dt_nasc.value,
            escola: aluno.escola.value,
            serie: aluno.serie.value,
            periodo: aluno.periodo.value,
            nome: aluno.nome.value,
            telefone: aluno.telefone.value,
            email: aluno.email.value,
            endereco: aluno.endereco.value,
            bairro: aluno.bairro.value,
            cidade: aluno.cidade.value,
            cep: aluno.cep.value,
            uf: aluno.uf.value,
          })
          .then(({ data }) => {
            toast.info(data.mensagem);
            clearForm(aluno);
          })
          .catch(({ response }) => {
            toast.error(response.data.mensagem);
          });
      }

      getAlunos();

      if (validated) {
        setValidated(false);
      }
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={'Cadastro'} texto2={'Aluno'} />
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
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control type="text" name="codigo" disabled />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Digite o nome do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Nome do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nome da Mãe</Form.Label>
                <Form.Control
                  type="text"
                  name="nome_mae"
                  placeholder="Digite o nome da mãe"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Nome da mãe é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>RG</Form.Label>
                <Form.Control
                  onKeyUp={handleRgMask}
                  type="text"
                  name="rg"
                  placeholder="Digite o RG do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  RG do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  onKeyUp={handleCpfMask}
                  type="text"
                  name="cpf"
                  placeholder="Digite o CPF do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CPF do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control type="date" name="dt_nasc" required />
                <Form.Control.Feedback type="invalid">
                  Data de nascimento do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  name="endereco"
                  placeholder="Digite o endereço"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Endereço do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  name="bairro"
                  placeholder="Digite o bairro"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Bairro do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  name="uf"
                  required
                  onChange={(e) => handleCidade(e.currentTarget.value)}
                >
                  <option value="">Selecione</option>
                  {estados.map((estado) => {
                    return (
                      <option value={estado.id} key={estado.id}>
                        {estado.nome}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  UF é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Cidade</Form.Label>
                <Form.Select name="cidade" required>
                  <option value="">Selecione</option>
                  {cidades.map((cidade) => {
                    return (
                      <option value={cidade.id} key={cidade.id}>
                        {cidade.nome}
                      </option>
                    );
                  })}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  Cidade do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  onKeyUp={handleCepMask}
                  type="text"
                  name="cep"
                  placeholder="Digite o CEP do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CEP do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Telefone/Celular</Form.Label>
                <Form.Control
                  onKeyUp={handleTelMask}
                  type="text"
                  name="telefone"
                  placeholder="Digite o telefone/celular do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Telefone do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Digite o email do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  E-mail do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Escola</Form.Label>
                <Form.Control
                  type="text"
                  name="escola"
                  placeholder="Digite a escola do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Escola do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Serie</Form.Label>
                <Form.Control
                  type="text"
                  name="serie"
                  placeholder="Digite a série escolar do aluno"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Serie escolar do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Período</Form.Label>
                <Form.Select name="periodo" required>
                  <option value="">Selecione</option>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Noturno">Noturno</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Período escolar do aluno é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
