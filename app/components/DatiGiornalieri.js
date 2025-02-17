import React from 'react';

export default function DatiGiornalieri({ dataSelezionata, datiMeteo }) {
  const giornoSelezionato = parseInt(dataSelezionata.slice(8, 10), 10);
  const meseSelezionato = parseInt(dataSelezionata.slice(5, 7), 10);
  let datiMeteoGiornoMeseSel = datiMeteo[meseSelezionato][giornoSelezionato]
  return (
    <div className="cardsContainerPrevGiorno">      

      <div className="card" id="precip">
        <h2>Precipitazioni</h2>
        <p className="valore">{ datiMeteoGiornoMeseSel.valPrecipitazioni }mm</p>
        <p className="ds">Deviazione Standard { datiMeteoGiornoMeseSel.dsPrecipitazioni }</p>
        <p className="minMax">
          MIN: {datiMeteoGiornoMeseSel.minPrecipitazioni}mm |
          MAX: {datiMeteoGiornoMeseSel.maxPrecipitazioni}mm
        </p>
      </div>

      <div className="card" id="temp-max">
        <h2>Temperatura Massima</h2>
        <p className="valore">{ datiMeteoGiornoMeseSel.valTempMAX }°C</p>
        <p className="ds">Deviazione Standard { datiMeteoGiornoMeseSel.dsTempMAX }</p>
        <p className="minMax">
          MIN: {datiMeteoGiornoMeseSel.minTempMAX}°C |
          MAX: {datiMeteoGiornoMeseSel.maxTempMAX}°C
        </p>
      </div>

      <div className="card" id="temp-min">
        <h2>Temperatura Minima</h2>
        <p className="valore">{ datiMeteoGiornoMeseSel.valTempMIN }°C</p>
        <p className="ds">Deviazione Standard { datiMeteoGiornoMeseSel.dsTempMIN }</p>
        <p className="minMax">
          MIN: {datiMeteoGiornoMeseSel.minTempMIN}°C |
          MAX: {datiMeteoGiornoMeseSel.maxTempMIN}°C
        </p>
      </div>


      <div className="card" id="umidita">
        <h2>Umidità</h2>
        <p className="valore">{ datiMeteoGiornoMeseSel.valUmidita }%</p>
        <p className="ds">Deviazione Standard { datiMeteoGiornoMeseSel.dsUmidita }</p>
        <p className="minMax">
          MIN: {datiMeteoGiornoMeseSel.minUmidita}% |
          MAX: {datiMeteoGiornoMeseSel.maxUmidita}%
        </p>
      </div> 
    </div>
  );
}
