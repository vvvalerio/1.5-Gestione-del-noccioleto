'use client';
import { useState } from 'react';
import Meteo from './services/Meteo';
import StimaPrezzi from './services/StimaPrezzi';
import StimaGuadagno from './services/StimaGuadagno';
import styles from "./css/page.module.css";


export default function Page() {

  /******************************* SELEZIONE DATA CON DATA ODIERNA DEFAULT ***************************/
  // Ottiene la data corrente 
  const dataOdierna = () => {
    const oggi = new Date();
    const giorno = String(oggi.getDate()).padStart(2, '0');  // Aggiunge uno zero se necessario
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');  // Mese inizia da 0, quindi aggiunge 1
    const anno = oggi.getFullYear();    
    return `${anno}-${mese}-${giorno}`;  // Formato YYYY-MM-DD per input type="date"
  };
  //imposta lo stato della data con il valore predefinito della data odierna
  const [dataSelezionata, setDataSelezionata] = useState(dataOdierna());
  const [annoCorrente, setAnnoCorrente] = useState(dataSelezionata.slice(0, 4));

  // Funzione che gestisce il cambio data sul calendario
  const handleDatePicker = (e) => {
    const nuovaData = e.target.value;
    setDataSelezionata(nuovaData);
    setAnnoCorrente(nuovaData.slice(0, 4));
  };

  // Funzione per cambiare la data selezionata di un giorno
  const cambiaGiorno = (incremento) => {
    const data = new Date(dataSelezionata);
    data.setDate(data.getDate() + incremento);
    
    // Converte la data in formato YYYY-MM-DD
    const nuovaDataFormattata = data.toISOString().split('T')[0];
    setDataSelezionata(nuovaDataFormattata);
    setAnnoCorrente(nuovaDataFormattata.slice(0, 4));
  };


  const initialDatiMeteo = () => {
    const mesi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const strutturaBase = {
      valPrecipitazioni: "--",
      valUmidita: "--",
      valTempMIN: "--",
      valTempMAX: "--",
      minPrecipitazioni: "--",
      maxPrecipitazioni: "--",
      minUmidita:  "--",
      maxUmidita:  "--",
      minTempMIN: "--",
      maxTempMIN: "--",
      minTempMAX: "--",
      maxTempMAX: "--",
      dsPrecipitazioni: "--",
      dsUmidita: "--",
      dsTempMIN: "--",
      dsTempMAX: "--",
      
    };
  
    // Creazione di una struttura con 12 mesi e 31 giorni per ciascuno
    const struttura = {};
    mesi.forEach((mese) => {
      struttura[mese] = {
        meseSommaPrecipitazioni: "--",
        meseMediaTemperatura: "--",
        meseMAXTemperatura: "--",
        meseMINTemperatura: "--",
        meseMediaUmidita: "--",
      };
      for (let giorno = 1; giorno <= 31; giorno++) {
        struttura[mese][giorno] = { ...strutturaBase }; // Clona la struttura di base per ogni giorno
      }
    });
  
    return struttura;
  };
  

  // Stato per i dati meteorologici
  const [datiMeteo, setDatiMeteo] = useState(initialDatiMeteo);
  //Array di nomi dei mesi da visualizzare nell'home quando viene selezionato il mese corrente
  const mesiDellAnno = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const chiaveMesiDellAnno= parseInt(dataSelezionata.slice(5, 7));

  const [raccolto, setRaccolto] = useState(0); // Stato globale per la stima del raccolto

  return (
    <div>
      <div className="dashboardHeader">
        <div className={styles.header}>
          <div className={styles.logo}>
              <img src='/logo-albero.jpg' alt='Noccioleto di Manziana'></img>
              <img src='/logo-noccioleto.jpg' alt='Noccioleto di Manziana'></img>
          </div> 
          <div className={styles.meseSelezionato}>
            <p>Il mese selezionato è:</p>
            <h1>{ mesiDellAnno[chiaveMesiDellAnno -1] }</h1>
          </div>
          <div className={styles.selezionaData}>
            <h2>Seleziona una Data</h2>
            <div className={styles.containerCalendario}>
                <button className={styles.freccia} onClick={() => cambiaGiorno(-1)}>←</button>
                <input 
                  type="date"
                  value={dataSelezionata} 
                  onChange={handleDatePicker} 
                  className={styles.calendario} 
                />
                <button className={styles.freccia} onClick={() => cambiaGiorno(1)}>→</button>
              </div>          
          </div>
        </div>
        
      </div>
      <div className="dashboardContainer">  
        <Meteo 
          dataSelezionata={dataSelezionata} setDataSelezionata={setDataSelezionata} 
          datiMeteo={datiMeteo} setDatiMeteo={setDatiMeteo} setRaccolto={setRaccolto}/>
      </div>
      <div className="dashboardContainerFooter">

        <div className="card">
          <h2>Webcam</h2>
          <video autoPlay loop muted className={styles.webcamVideo}>
            <source src="/video/noccioleto.mp4" type="video/mp4" />
            Il tuo browser non supporta il tag video.
          </video>
        </div>

        <div className="card">
          <StimaPrezzi />
        </div>
        <div className="card">
          <StimaGuadagno raccolto={raccolto} />
        </div>

        
        
      </div>
    </div>
  );
}

       