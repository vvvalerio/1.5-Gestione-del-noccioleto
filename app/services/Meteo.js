import React, { useEffect, useState } from 'react';
import DatiGiornalieri from '../components/DatiGiornalieri';
import GraficoMese from '../components/GraficoMese';
import StimaRaccolto from './StimaRaccolto';
import calcolaStatistica from '../helpers/statistica';
import calcolaMedieMensili from '../helpers/calcolaMedieMensili';
import recuperaDatiFiltrati from '../helpers/recupera-dati-filtrati-da-csv';
import styles from "../css/meteo.module.css";

export default function Meteo({ setDataSelezionata, dataSelezionata, datiMeteo, setDatiMeteo, setRaccolto }) {
 const mesi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
 const giorni = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
 const annoSelezionato = dataSelezionata.slice(0, 4);
 const meseSelezionato = parseInt(dataSelezionata.slice(5, 7), 10);
 const giornoSelezionato = parseInt(dataSelezionata.slice(8, 10));
 const [annoCorrente, setAnnoCorrente] = useState(null);
 const [loading, setLoading] = useState(false);  // Stato per la barra di caricamento

 useEffect(() => {
  // Evita di rieseguire la funzione se l'anno è già stato processato
  if (annoCorrente === annoSelezionato) return;
   
  const recuperaDatiPerAnno = async () => {    
    setLoading(true);  // Attiva la barra di caricamento
    try {
      let datiTemporanei = { ...datiMeteo };
      //tramite due cicli for annidati recupero ed elaboro i dati di ogni mese giorno per giorno
      for (const mese of mesi) {
          for (const giorno of giorni) {
            const dati = await recuperaDatiFiltrati(mese, giorno);
            
            // Controllo se ci sono dati validi
            if (dati.length > 0) {
              //*******************************+** PRECIPITAZIONI TOTALI **************************************************/     
              //RECUPERO VALORI GIORNALIERI, NE FACCIO LA MEDIA E CALCOLO LA DEVIAZIONE STANDARD, MINIMO E MASSIMO ASSOLUTI
              const precipitazioni = dati.filter(item => item.Grandezza === "PREC_TOTG");
              const precipitazioniVal = precipitazioni.map(item => 
                  parseFloat(item.Valore.toString().replace(',', '.'))
              );
              const { media: mediaPioggia, deviazione: deviazionePioggia, minimo: minPioggia, massimo: maxPioggia} = calcolaStatistica(precipitazioniVal);
              
              //************************************ TEMPERATURA MINIMA ***************************************************/        
              //RECUPERO VALORI GIORNALIERI, NE FACCIO LA MEDIA E CALCOLO LA DEVIAZIONE STANDARD, MINIMO E MASSIMO ASSOLUTI
              const temperaturaMIN = dati.filter(item => item.Grandezza === "TEMPARIA2M_MING");
              const TempMINVal = temperaturaMIN.map(item => 
                  parseFloat(item.Valore.toString().replace(',', '.'))
              );
              const { media: mediaTempMIN, deviazione: deviazioneTempMIN, minimo: minTempMIN, massimo: maxTempMIN } = calcolaStatistica(TempMINVal);

              //*********************************** TEMPERATURA MASSIMA ***************************************************/        
              //RECUPERO VALORI GIORNALIERI, NE FACCIO LA MEDIA E CALCOLO LA DEVIAZIONE STANDARD, MINIMO E MASSIMO ASSOLUTI
              const temperaturaMAX = dati.filter(item => item.Grandezza === "TEMPARIA2M_MAXG");
              const TempMAXVal = temperaturaMAX.map(item => 
                  parseFloat(item.Valore.toString().replace(',', '.'))
              );
              const { media: mediaTempMAX, deviazione: deviazioneTempMAX, minimo: minTempMAX, massimo: maxTempMAX } = calcolaStatistica(TempMAXVal);
              
              
              //******************************* PERCENTUALE UMIDITà DELL'ARIA *********************************************/        
              //RECUPERO VALORI GIORNALIERI, NE FACCIO LA MEDIA E CALCOLO LA DEVIAZIONE STANDARD, MINIMO E MASSIMO ASSOLUTI
              const umidita = dati.filter(item => item.Grandezza === "UMARIA2M_MEDG");
              const umiditaVal = umidita.map(item => 
                  parseFloat(item.Valore.toString().replace(',', '.'))
              );
              const { media: mediaUmidita, deviazione: deviazioneUmidita, minimo: minUmidita, massimo: maxUmidita } = calcolaStatistica(umiditaVal);                              
              datiTemporanei = {
                ...datiTemporanei,
                [mese]: {
                  ...datiTemporanei[mese],
                  [giorno]: {
                    ...datiTemporanei[mese][giorno],
                    valPrecipitazioni: Math.max(0, mediaPioggia), // se il valore è negativo lo cambia in zero
                    valUmidita: Math.min(mediaUmidita, 100), // il valore generato non supera 100
                    valTempMIN: mediaTempMIN,
                    valTempMAX: mediaTempMAX, 
                    dsPrecipitazioni: deviazionePioggia,
                    dsUmidita: deviazioneUmidita,
                    dsTempMIN: deviazioneTempMIN,
                    dsTempMAX: deviazioneTempMAX,
                    minPrecipitazioni: minPioggia,
                    maxPrecipitazioni: maxPioggia,
                    minUmidita: minUmidita,
                    maxUmidita: maxUmidita,
                    minTempMIN: minTempMIN,
                    maxTempMIN: maxTempMIN,
                    minTempMAX: minTempMAX,
                    maxTempMAX: maxTempMAX,
                  }
                }
              };
            }
          } //chiude for giorni
      }//chiude for mesi
      // Calcola le medie mensili prima di aggiornare lo stato
      const datiConMedie = calcolaMedieMensili(datiTemporanei);
            
      // Aggiornamento dello stato con i dati calcolati
      setDatiMeteo(datiConMedie);
      setAnnoCorrente(annoSelezionato);  // Imposta l'anno processato per evitare ulteriori chiamate
    } catch (error) {
      console.error('*** Si è verificato un errore durante il recupero dei dati ***', error);
    } finally {
      setLoading(false);  // Disattiva la barra di caricamento
    }
  };

    recuperaDatiPerAnno();
  }, [annoSelezionato, setDatiMeteo]);
  return(
    <div className="dashboardContainer">  
      {loading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
            <p className={styles.loaderText}>Caricamento in corso...</p>
          </div>
        </div>
      )}    
      <div className="dashboardContenutoSX">
        <StimaRaccolto datiMeteo={datiMeteo} setRaccolto={setRaccolto}/>
        <div className="card">
          <h2>Previsioni del giorno { giornoSelezionato}/{meseSelezionato}</h2>
          <DatiGiornalieri dataSelezionata={dataSelezionata} datiMeteo={datiMeteo} />
        </div>      
        
      </div>
      

      <div className="dashboardContenutoDX">

        <GraficoMese 
          dataSelezionata={dataSelezionata}
          setDataSelezionata={setDataSelezionata}
          datiMeteo={datiMeteo[meseSelezionato]}
          datasets={[
            {
              dataKey: "valPrecipitazioni",
              label: "Precipitazioni (mm)",
              color: "navy"
            }
          ]}
          optionsConfig={{
            titleX: "Giorni del mese",
            titleY: "Precipitazioni (mm)",
            maxY: 50,
            stepSizeY: 5
          }}
        />
        <GraficoMese 
          dataSelezionata={dataSelezionata}
          setDataSelezionata={setDataSelezionata}
          datiMeteo={datiMeteo[meseSelezionato]}
          datasets={[
            {
              dataKey: "valTempMIN",
              label: "Temperatura Minima (°C)",
              color: "blue"
            },

            {
              dataKey: "valTempMAX",
              label: "Temperatura Massima (°C)",
              color: "red"
            }
          ]}
          optionsConfig={{
            titleX: "Giorni del mese",
            titleY: "Temperatura (°C)",
            maxY: 50,
            stepSizeY: 5
          }}
        />
        <GraficoMese 
          dataSelezionata={dataSelezionata}
          setDataSelezionata={setDataSelezionata}
          datiMeteo={datiMeteo[meseSelezionato]}
          datasets={[
            {
              dataKey: "valUmidita",
              label: "Umidità (%)",
              color: "purple"
            }
          ]}
          optionsConfig={{
            titleX: "Giorni del mese",
            titleY: "Umidità (%)",
            maxY: 100,
            stepSizeY: 5
          }}
        />          
      </div>
    </div>
  
  );
}
