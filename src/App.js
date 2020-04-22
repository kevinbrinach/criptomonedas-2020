import React, { useState, useEffect } from 'react';
import cryptomonedas from './cryptomonedas.png';
import styled from '@emotion/styled'
import Formulario from './components/Formulario';
import Axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width:992px) {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }  
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;  
`;

function App() {

  //state
  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('')
  const [ resultado, guardarResultado ] = useState({})
  const [ cargando, guardarCargando ] = useState(false)

  useEffect(() => {
    // evitar la ejecucion la primera vez
    
    const cotizarCriptomoneda = async () => {
      if(moneda === '') return
      
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
  
      const resultado = await Axios.get(url)

      //Mostrar spinner
      guardarCargando(true)

      //ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        //cambiar el estado de cambiando
        guardarCargando(false)

        // guardar resultado de consulta a la api
      }, 3000);
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
  
    }
    cotizarCriptomoneda()

  }, [moneda, criptomoneda])

  //Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={cryptomonedas}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas Al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;