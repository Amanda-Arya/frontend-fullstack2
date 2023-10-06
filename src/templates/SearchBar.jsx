import { Container, Form } from 'react-bootstrap';
import { faMagnifyingGlass, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';


export default function SearchBar({ placeholder, dados, campoChave, campoBusca, funcaoSelecao, valor }) {
    const [busca, setBusca] = useState(valor ? valor : "");
    const [dadosLista, setDadosLista] = useState([dados]);
    const [itemSelecionado, setItemSelecionado] = useState(false);
    const inputBusca = useRef();

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
        <Container>
            <div className='barra'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Form.Control type='text'
            ref={inputBusca}
                placeholder={placeholder}
                value={busca}
                required
                onChange={e => {

                    setBusca(e.target.value.toLocaleLowerCase());
                    filtrarResultado();
                    if(itemSelecionado){
                        e.target.setAttribute('aria-invalid', true);
                        e.target.setCustomValidity('erro');
                    }else{
                        e.target.removeAttribute("aria-invalid");
                        e.target.setCustomValidity('');
                    }
                }}>
            </Form.Control>
            <FontAwesomeIcon icon={faSquareXmark} onClick={()=>{
                setBusca('');
                filtrarResultado();
                setItemSelecionado(false);
                funcaoSelecao({});
                inputBusca.current.setAttribute('aria-invalid', true);
                inputBusca.target.setCustomValidity('erro');
            }}/>
            </div>
            <div className='resultado'>
                <ul data-resultado>
                    {
                        dadosLista.map(item => {
                            return <li key={item[campoChave]}
                                onClick={() => {
                                    setBusca(item[campoBusca]);
                                    setItemSelecionado(true); //validar se esta selecionado ou nao
                                    funcaoSelecao(item);
                                    inputBusca.current.setCustomValidity("");
                                    //deixa de exibir resultados
                                    let resultado = document.querySelector(['data-resultado']);
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