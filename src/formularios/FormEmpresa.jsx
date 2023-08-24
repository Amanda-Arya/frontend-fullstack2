import { Container, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import MenuFormulario from "../templates/MenuFormulario";
import Cabecalho2 from "../templates/Cabecalho2";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";
import { cep, cnpj, telefone } from "../utils/masks";

export default function FormEmpresa({
  onEdit,
  setExibeTabela,
  setOnEdit,
  getEmpresas,
}) {
  const [validated, setValidated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const empresa = ref.current;
      empresa.codigo.value = onEdit.codigo;
      empresa.cnpj.value = onEdit.cnpj;
      empresa.ie.value = onEdit.ie;
      empresa.razao_social.value = onEdit.razao_social;
      empresa.telefone.value = onEdit.telefone;
      empresa.email.value = onEdit.email;
      empresa.proprietario.value = onEdit.proprietario;
      empresa.endereco.value = onEdit.endereco;
      empresa.bairro.value = onEdit.bairro;
      empresa.cidade.value = onEdit.cidade;
      empresa.cep.value = onEdit.cep;
      empresa.uf.value = onEdit.uf;
    }
  }, [onEdit]);

  const handleCepMask = (e) => {
    cep(e);
  };

  const handleCnpjMask = (e) => {
    cnpj(e);
  };

  const handleTelMask = (e) => {
    telefone(e);
  };

  const clearForm = (empresa) => {
    empresa.codigo.value = "";
    empresa.cnpj.value = "";
    empresa.ie.value = "";
    empresa.razao_social.value = "";
    empresa.telefone.value = "";
    empresa.email.value = "";
    empresa.proprietario.value = "";
    empresa.endereco.value = "";
    empresa.bairro.value = "";
    empresa.cidade.value = "";
    empresa.cep.value = "";
    empresa.uf.value = "";
  };

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const empresa = ref.current;

    if (form.checkValidity()) {
      if (onEdit) {
        await axios
          .put(`${urlBase}/empresas/`, {
            codigo: empresa.codigo.value,
            cnpj: empresa.cnpj.value,
            ie: empresa.ie.value,
            razao_social: empresa.razao_social.value,
            telefone: empresa.telefone.value,
            email: empresa.email.value,
            proprietario: empresa.proprietario.value,
            endereco: empresa.endereco.value,
            bairro: empresa.bairro.value,
            cidade: empresa.cidade.value,
            cep: empresa.cep.value,
            uf: empresa.uf.value,
          })
          .then(({ data }) => {
            toast.info(data.mensagem);
            clearForm(empresa);
          })
          .catch(({ response }) => {
            toast.error(response.data.mensagem);
          });
      } else {
        await axios
          .post(`${urlBase}/empresas/`, {
            cnpj: empresa.cnpj.value,
            ie: empresa.ie.value,
            razao_social: empresa.razao_social.value,
            telefone: empresa.telefone.value,
            email: empresa.email.value,
            proprietario: empresa.proprietario.value,
            endereco: empresa.endereco.value,
            bairro: empresa.bairro.value,
            cidade: empresa.cidade.value,
            cep: empresa.cep.value,
            uf: empresa.uf.value,
          })
          .then(({ data }) => {
            toast.info(data.mensagem);
            clearForm(empresa);
          })
          .catch(({ response }) => {
            toast.error(response.data.mensagem);
          });
      }

      if (setValidated) {
        setValidated(false);
      }

      getEmpresas();
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Empresa"} />
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
                <Form.Label>CNPJ</Form.Label>
                <Form.Control
                  onKeyUp={handleCnpjMask}
                  type="text"
                  name="cnpj"
                  placeholder="Digite o CNPJ da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CNPJ da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Inscrição Estadual</Form.Label>
                <Form.Control
                  type="text"
                  name="ie"
                  maxLength={12}
                  placeholder="Digite a I.E. da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  IE da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Razão Social</Form.Label>
                <Form.Control
                  type="text"
                  name="razao_social"
                  placeholder="Digite a razão social da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Razão social da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Proprietário</Form.Label>
                <Form.Control
                  type="text"
                  name="proprietario"
                  placeholder="Digite o proprietário da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Razão social da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Endereco</Form.Label>
                <Form.Control
                  type="text"
                  name="endereco"
                  placeholder="Digite o endereço da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Logradouro é obrigatório!
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
                  placeholder="Digite o bairro da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Bairro é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  name="cidade"
                  placeholder="Digite a cidade da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Município da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>UF</Form.Label>
                <Form.Select name="uf" required>
                  <option value="">Selecione</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                  <option value="EX">Estrangeiro</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  UF é obrigatório!
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
                  placeholder="Digite o CEP da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  CEP da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  onKeyUp={handleTelMask}
                  type="text"
                  name="telefone"
                  placeholder="Digite o telefone da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Telefone da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Digite o email da empresa"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  E-mail da empresa é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
