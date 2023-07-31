import React, { useState } from 'react'
import './Form.css'

export default function Form({marcas}) {

    const [idMarca, setIdMarca] = useState('')
    const [modelosData, setModelosData] = useState([])
    const [idModelo, setIdModelo] = useState('')
    const [anosData, setAnosData] = useState([])
    const [carroData, setCarroData] = useState('')
    const [valorCarro, setValorCarro] = useState('')


    const changeBrand = (value) => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${value}/modelos`, {
            method:'GET'
        })
        .then(response => response.json())
        .then(data => setModelosData(data.modelos))
        .catch(err => console.log(err))

        setIdMarca(value)
        setValorCarro('')//reseta o valor do carro mostrado
    }

    const changeModel = (value) => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${value}/anos`, {
            method:'GET'
        })
        .then(response => response.json())
        .then(data => setAnosData(data))
        .catch(err => console.log(err))
        
        setIdModelo(value)
        setValorCarro('')
    }

    const changeYear = (value) => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos/${value}`, {
            method:'GET'
        })
        .then(response => response.json())
        .then(data => {console.log(typeof(data)); setCarroData(data)})
        .catch(err => console.log(err))

        setValorCarro('')
    }

    const handleClick = () => {
        setValorCarro(carroData.Valor)
    }

    return (
        <div id='form'>
            <h1>Loja de carros</h1>
            <div className="data">
                <div className="container marca">
                    <label htmlFor="marcas">Marca</label>
                    <select id="marcas" onChange={(event) => changeBrand(event.target.value)}>
                        <option value=''>Escolha uma marca</option>
                        {marcas.map((data, index) => (
                            <option key={index} value={data.codigo}>{data.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="container modelo">
                    <label htmlFor="modelo">Modelo</label>
                    <select id="modelo" onChange={(event) => changeModel(event.target.value)}>
                        <option value=''>Modelo do carro</option>
                        {modelosData.map((data, index) => (
                            <option key={index} value={data.codigo}>{data.nome}</option>
                            ))}
                    </select>
                </div>
                <div className='container ano'>
                    <label htmlFor="ano">Ano</label>
                    <select id="ano" onChange={(event) => changeYear(event.target.value)}>
                        <option value=''>Ano do carro</option>
                        {anosData.map((data, index) => (
                            <option key={index} value={data.codigo}>{data.nome}</option>
                            ))}
                    </select>
                </div>
                <button onClick={handleClick}>Buscar</button>
            </div>
            <div className="results">
                <p style={{display: valorCarro === ''? 'none':'block'}}>Preço:</p>
                <p>{valorCarro}</p>
            </div>
        </div>
    )
}
