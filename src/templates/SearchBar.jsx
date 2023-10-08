import { Container, Form, InputGroup } from 'react-bootstrap';
import { faMagnifyingGlass, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState} from 'react';


export default function SearchBar({ placeholder, dados, campoChave, campoBusca, funcaoSelecao, valor, name, ref }) {
    const [busca, setBusca] = useState(valor ?? "");
    const [dadosLista, setDadosLista] = useState([]);

    function filtrarResultado(valor) {
        console.log(valor);
        if (valor !== '')
            setDadosLista(dados.filter((item) => item[campoBusca].toLowerCase().includes(valor.toLowerCase())));
        else
            setDadosLista([]);
    }

    return (
        <Container>

            <InputGroup>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputGroup.Text>

                <Form.Control type='text'
                    name={name}
                    ref={ref}
                    placeholder={placeholder}
                    value={busca}
                    required
                    onChange={e => {
                        setBusca(e.target.value.toLocaleLowerCase());
                        filtrarResultado(e.target.value);
                    }}>
                </Form.Control>
                <InputGroup.Text>
                    <FontAwesomeIcon icon={faSquareXmark} onClick={() => {
                        setBusca('');
                        filtrarResultado('');
                        funcaoSelecao(null);
                    }} />
                </InputGroup.Text>
            </InputGroup>
            <div className='resultado mt-1'>
                <ul data-resultado>
                    {
                        dadosLista.map(item => {
                            return <li key={item[campoChave]}
                                onClick={() => {
                                    setBusca(item[campoBusca]);
                                    funcaoSelecao(item);
                                }}
                            >
                                {
                                    item[campoChave] + ' - ' + item[campoBusca]
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </Container >
    );
}