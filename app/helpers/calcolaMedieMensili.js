const calcolaMedieMensili = (dati) => {
  // Creazione di una copia dell'oggetto dati
  const datiAggiornati = { ...dati };
  //Iterazione di ogni mese
  Object.keys(datiAggiornati).forEach((mese) => {   
    let sommaPrecipitazioni = 0;
    let sommaTempMin = 0;
    let sommaTempMax = 0;
    let sommaTempMedia = 0;
    let sommaUmidita = 0;
    let numeroGiorniMese = 0;
    //Iterazione di ogni giorno del mese
    Object.keys(datiAggiornati[mese]).forEach((giorno) => {
      if (giorno !== "meseSommaPrecipitazioni" && giorno !== "meseMediaTemperatura" &&
          giorno !== "meseMAXTemperatura" && giorno !== "meseMINTemperatura" &&
          giorno !== "meseMediaUmidita") {
          
          //Estrazione dei dati dal giorno selezionato
          const giornoDati = datiAggiornati[mese][giorno];
          //Se il valore della rilevazione è valido, viene sommato al totale mensile
          if (giornoDati.valPrecipitazioni !== "--" && giornoDati.valPrecipitazioni.length !== 0) {
            sommaPrecipitazioni += parseFloat(giornoDati.valPrecipitazioni) || 0;
            sommaTempMin += parseFloat(giornoDati.valTempMIN) || 0;
            sommaTempMax += parseFloat(giornoDati.valTempMAX) || 0;
            sommaTempMedia += parseFloat(giornoDati.valTempMEDIA) || 0;
            sommaUmidita += parseFloat(giornoDati.valUmidita) || 0;
            numeroGiorniMese++;//viene incrementato il numero dei giorni del mese elaborati
          }
      }
    });
    //Viene assegnato il valore totale delle precipitazioni e calcolate le medie mensili degli altri valori
    if (numeroGiorniMese > 0) {
      datiAggiornati[mese].meseSommaPrecipitazioni = sommaPrecipitazioni;
      datiAggiornati[mese].meseMINTemperatura = (sommaTempMin / numeroGiorniMese).toFixed(2);
      datiAggiornati[mese].meseMAXTemperatura = (sommaTempMax / numeroGiorniMese).toFixed(2);
      datiAggiornati[mese].meseMediaTemperatura = (sommaTempMedia / numeroGiorniMese).toFixed(2);
      datiAggiornati[mese].meseMediaUmidita = (sommaUmidita / numeroGiorniMese).toFixed(2);
    } else {
      //Se non ci sono dati validi viene assegnato un valore di default
      datiAggiornati[mese].meseSommaPrecipitazioni = "--";
      datiAggiornati[mese].meseMINTemperatura = "--";
      datiAggiornati[mese].meseMAXTemperatura = "--";
      datiAggiornati[mese].meseMediaTemperatura = "--";
      datiAggiornati[mese].meseMediaUmidita = "--";
    }
  });

  return datiAggiornati;
};

export default calcolaMedieMensili;
