
import { useEffect } from 'react';
import styles from "../css/stimaraccolto.module.css";

const StimaRaccolto = ({ datiMeteo, setRaccolto }) => {
  // Fabbisogno idrico  mensile minimo in mm
  const fabbisognoMensileMinimo = 80; // Minimo fabbisogno per i mesi critici
  const mesi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const mesiRilevanti = [4, 5, 6, 7, 8];  // Da aprile ad agosto (mesi critici)
  const mesiRilevantiTesto = { 4: "Aprile", 5: "Maggio", 6: "Giugno", 7: "Luglio", 8: "Agosto" };
  const calcolaPrecipitazioniCumulate = () => {
    let totaleMesiRilevanti = 0;
    let totaleAnnuo = 0;
    let mesiCheNecessitanoIrrigazione = [];

    mesi.forEach(mese => {
      //recupera dallo stato il valore delle precipitazioni del mese selezionato
      const pioggiaMese = parseFloat(datiMeteo[mese].meseSommaPrecipitazioni);
      totaleAnnuo += pioggiaMese; //Accumulatore piogge dell'anno
      if (mesiRilevanti.includes(mese)) {//se il mese selezionato fa parte dei mesi critici
        totaleMesiRilevanti += pioggiaMese;//aggiungi la quantità di pioggia del mese
        //se il mese critico è sotto la soglia di 80mm aggiungilo tra i mesi che necessitano irrigazione
        if (pioggiaMese < fabbisognoMensileMinimo) {
          mesiCheNecessitanoIrrigazione.push({
            mese,
            precipitazioni: pioggiaMese,
            fabbisognoMancante: (fabbisognoMensileMinimo - pioggiaMese).toFixed(2),
          });
        }
      }
    });

    return {
      totaleAnnuo,
      totaleMesiRilevanti,
      mesiCheNecessitanoIrrigazione
    };
  };

  const stimaRaccolto = (precipitazioniTotali) => {
    const coefficientePioggia = 2.5;  
    const resaBase = 1500;  // Resa minima in kg
    return Math.max(resaBase, coefficientePioggia * precipitazioniTotali);
  };

  const { totaleAnnuo, mesiCheNecessitanoIrrigazione } = calcolaPrecipitazioniCumulate();
  const raccoltoStimato = stimaRaccolto(totaleAnnuo);
  //useEffect  aggiorna il valore  solo quando cambia
  useEffect(() => {
    setRaccolto(raccoltoStimato);
  }, [raccoltoStimato, setRaccolto]); 

  return (
    <div className="card" id="stima-raccolto">
      <h2 className="titolo-card">Stima Raccolto Annuale</h2>
      <p><strong>Precipitazioni cumulative:</strong></p>
      <p className={styles.precipCumulative}>{totaleAnnuo.toFixed(2)} mm</p>
      <p><strong>Resa stimata:</strong></p>
      <p className={styles.resaStimata}> {raccoltoStimato.toFixed(0)} kg</p>

      <p className={styles.mesiCheNecessitano}>Mesi che necessitano irrigazione</p>
      {mesiCheNecessitanoIrrigazione.length > 0 ? (
        <ul className={styles.mesiIrrigazione}>
          {mesiCheNecessitanoIrrigazione.map(({ mese, precipitazioni, fabbisognoMancante }) => (
            <li className={styles.mesiIrrigazioneEl} key={mese}>
              <strong>{mesiRilevantiTesto[mese]}:</strong> {precipitazioni.toFixed(2)} mm <span>⚠️ mancano {fabbisognoMancante} mm</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nessun mese ha bisogno di irrigazione.</p>
      )}
    </div>
  );
};

export default StimaRaccolto;
