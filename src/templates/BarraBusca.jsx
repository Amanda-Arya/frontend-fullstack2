import { Container, Form } from 'react-bootstrap';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import './styles/BarraBusca.css';

export default function BarraBusca({ placeholder, dados, campoChave, campoBusca, funcaoSelecao, valor }) {
    const inputBusca = useRef();
    const [busca, setBusca] = useState(valor ? valor : "");
    const [dadosLista, setDadosLista] = useState(dados);
    const [itemSelecionado, setItemSelecionado] = useState(false);

    function filtrarResultado() {
        setDadosLista(dados.filter((item) => {
            return (
                busca.lenght > 1 ? item[campoBusca].toLowerCase().includes(busca.toLowerCase()) : false
            );

        })
        );
        let resultado = document.querySelector(['data-resultado']);
        if (dadosLista.lenght > 0) {
            resultado.style.display = "block";
        }
        else {
            resultado.style.display = "none";
        }
    }

    return (
        <Container className='barraBusca'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Form.Control type='text'
                ref={inputBusca}
                placeholder={placeholder}
                value={busca}
                required
                onChange={e => {

                    setBusca(e.target.value.toLocaleLowerCase());
                    filtrarResultado();
                    if (!itemSelecionado) {
                        e.target.setAttribute('aria-invalid', true);
                    }
                    else {
                        e.target.removeAttribute('aria-invalid');
                        e.target.setCustomValidity("");
                    }
                }}>
            </Form.Control>
            <FontAwesomeIcon icon={faXmark} onClick={() => {
                setBusca('');
                filtrarResultado();
                setItemSelecionado(false);
                funcaoSelecao({});
                inputBusca.current.setAttribute('aria-invalid',true);
                
            }} />
            <div className='resultado'>
                <ul data-resultado>
                    {
                        dadosLista.map(item => {
                            return <li key={item[campoChave]}
                                onClick={() => {
                                    setBusca(item[campoBusca]);
                                    setItemSelecionado(true);
                                    funcaoSelecao(item);
                                    // informar se o componente esta limpo ou valido
                                    inputBusca.current.setCustomValidity("");
                                    // deixa de exibir a lista
                                    let resultado = document.querySelector('[data-resultado');
                                    resultado.style.display = 'none';
                                }}
                            >

                                {
                                    item[campoChave] + '-' + item[campoBusca]
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </Container>
    );
}