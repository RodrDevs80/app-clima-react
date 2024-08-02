import { useState } from 'react';
import './App.css'

function App() {
  const urlBase= 'https://api.openweathermap.org/data/2.5/weather';
  const APIKEY= '8212b11f893368cbb2a4f299974dee95';
  const diferenciaKelvin= 273.15;
  const lang= 'sp, es'
  const [dataClima, setDataClima] = useState(null);
  const [ciudad,setCiudad]= useState('');
  const onInput=(e)=>{
    setCiudad(e.target.value);
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    if (ciudad.length >0) {
      dataFetch();
    }
  }
  const dataFetch= async ()=>{
    try {
      const respuesta = await fetch(`${urlBase}?q=${ciudad}&appid=${APIKEY}&lang=${lang}`);
      const d = await respuesta.json();
      setDataClima(d);
    } catch (error) {
      console.log(`Se produjo un error: ${error}`);
    } 
  }
 
  return (
    <main className='container'> 
      <h1>APP-CLIMA-CIUDADES</h1>
    <form onSubmit={onSubmit}>
      <input 
      type="text" 
      placeholder='Ingrese una Ciudad'
      name='ciudad'
      value={ciudad} 
      onChange={onInput}
      />
      <button type='submit'>Buscar</button>
    </form>
    {dataClima && (
      <div key={dataClima.id}>
        <h2>Ciudad: {dataClima.name}</h2>
        <p>Temperatura: {parseInt(dataClima.main.temp-diferenciaKelvin)}°C</p>
        <p>Humedad: {dataClima.main.humidity}%</p>
        <p>País: {dataClima.sys.country}</p>
        <p>Longitud: {dataClima.coord.lon}</p>
        <p>Latitud: {dataClima.coord.lat}</p>
        <p>Condición Meteorológica: {dataClima.weather[0].description}</p>
        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt={dataClima.weather[0].description} />
      </div>
    )

    }
    </main>
  )
}

export default App
