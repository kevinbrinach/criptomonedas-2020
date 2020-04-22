import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([])
    const [ error, guardarError ] = useState(false)

    const MONEDAS = [
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'USD', nombre: 'Dolar Americano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]

    //Utilizar use moneda
    const [ moneda, Seleccionar ] = useMoneda('Elige tu moneda', '', MONEDAS)

    // Utilizar criptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    //Ejecutar llamado a la api
    useEffect( () => {
      const consultarApi = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const resultado = await axios.get(url)
        guardarCriptomonedas(resultado.data.Data);
      }
      consultarApi()
    }, [])

    // Cuando el usuario envia el form
    const cotizarMoneda = (e) => {
      e.preventDefault();
      
      //Validar si ambos campos estan llenos
      if (moneda === '' || criptomoneda === '') {
          guardarError(true)
          return
      }
      guardarError(false)
      guardarMoneda(moneda)
      guardarCriptomoneda(criptomoneda)

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
            <Seleccionar />
            <SelectCripto />
            <Boton 
                type="submit" 
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;