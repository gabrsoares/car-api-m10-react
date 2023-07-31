import React, { useState } from 'react'
import './Form.css'

export default function Form({marcas}) {

    const [idMarca, setIdMarca] = useState('')
    const [modelosData, setModelosData] = useState([])
    const [idModelo, setIdModelo] = useState('')
    const [anosData, setAnosData] = useState([])
    const [carroData, setCarroData] = useState('')
    const [valorCarro, setValorCarro] = useState('')
    const [error, setError] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)


    const changeBrand = (value) => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${value}/modelos`, {
            method:'GET'
        })
        .then(response => response.json())
        .then(data => {
            if(data === '' || data === undefined) {
                setError(true)
            } else {
                setModelosData(data.modelos)
                setError(false)
            }
        })
        .catch(err => console.log(err))

        //reseta ao alterar
        setIdMarca(value)
        setValorCarro('')
        setIsSubmitted(false)
        setModelosData('')
        setAnosData('')
        setCarroData('')
        console.log(valorCarro)
    }

    const changeModel = (value) => {
        if (!error) {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${value}/anos`, {
            method:'GET'
            })
            .then(response => response.json())
            .then(data => {
                if(data === '' || data === undefined) {
                    setError(true)
                } else {
                    setAnosData(data)
                    setError(false)
                }
            })
            .catch(err => console.log(err))
            
            setIdModelo(value)
            setValorCarro('')
            setIsSubmitted(false)
            setAnosData('')
            setCarroData('')
        }
        
    }

    const changeYear = (value) => {
        if (!error) {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos/${value}`, {
            method:'GET'
            })
            .then(response => response.json())
            .then(data => {
                if(data === '' || data === undefined) {
                    setError(true)
                } else {
                    setCarroData(data)
                    setError(false)
                }
            })
            .catch(err => console.log(err))

            setValorCarro('')
            setIsSubmitted(false)
            setCarroData('')
        }
    }

    const handleClick = () => {
        setValorCarro(carroData.Valor)
        setIsSubmitted(true)
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
                        {modelosData === '' ? '': modelosData.map((data, index) => (
                            <option key={index} value={data.codigo}>{data.nome}</option>
                            ))}
                    </select>
                </div>
                <div className='container ano'>
                    <label htmlFor="ano">Ano</label>
                    <select id="ano" onChange={(event) => changeYear(event.target.value)}>
                        <option value=''>Ano do carro</option>
                        {anosData === ''? '': anosData.map((data, index) => (
                            <option key={index} value={data.codigo}>{data.nome}</option>
                            ))}
                    </select>
                </div>
                <button onClick={handleClick}>Buscar</button>
            </div>
            <div className="results" style={{display: isSubmitted? 'block':'none'}}>
                <p>{(valorCarro === '' || valorCarro === undefined)? '': 'Preço:'}</p>
                <p>{(valorCarro === '' || valorCarro === undefined)? !isSubmitted? '' : 'Carro não encontrado / Campos não preenchidos.': valorCarro}</p>
                <p>{error? 'Não possível encontrar este veículo!': ''}</p>
            </div>
        </div>
    )
}
