import { useState, useEffect } from "react";
import recuperaPrezziNocciole from '../helpers/recupera-prezzi-nocciole-da-csv';


const StimaGuadagno = ({ raccolto }) => {
  const [varieta, setVarieta] = useState(""); // Stato per la varietà selezionata
  const [prezziNocciole, setPrezziNocciole] = useState([]); // Stato per i prezzi recuperati
  const [prezzoPerKg, setPrezzoPerKg] = useState(3.50); // Prezzo base per kg

  // Funzione per aggiornare la varietà e il prezzo
  const cambioSelezione = (event) => {
    
    const nuovaVarieta = event.target.value;//Varietà selezionata nella dashboard
    setVarieta(nuovaVarieta); //Viene aggiornata la varietà nello stato con quella selezionata

    // Trova la varietà selezionata tra valori presenti nel CSV e salvati nello stato
    const datiVarieta = prezziNocciole.find(p => p.Prodotti === nuovaVarieta);

    if (datiVarieta) {
      // Seleziona una data a caso e prende il valore corrispondente
      const chiaviDate = Object.keys(datiVarieta).slice(1); // Esclude "Prodotti"
      const dataCasuale = chiaviDate[Math.floor(Math.random() * chiaviDate.length)];
      setPrezzoPerKg(parseFloat(datiVarieta[dataCasuale].replace(",", ".")));
    }
    
  };

  useEffect(() => {
    const recuperoPrezzi = async () => {
      try {
        const prezzi = await recuperaPrezziNocciole();
        setPrezziNocciole(prezzi);
      } catch (error) {
        console.error("Errore nel recupero dei prezzi:", error);
      }
    };

    recuperoPrezzi();
  }, []);

  // 🔹 Aggiorniamo il guadagno solo quando prezzoPerKg cambia
  const guadagnoStimato = (raccolto * prezzoPerKg).toFixed(2);

  return (
    <div>
      <h2 className="titolo-card">Seleziona la varietà</h2>
       <select id="selvarieta" value={varieta} onChange={cambioSelezione}>
        <option value="">-- Scegli una varietà --</option>
        <option value="Lunga San Giovanni">Lunga San Giovanni</option>
        <option value="Tonda avellinese">Tonda avellinese</option>
        <option value="Tonda di giffoni">Tonda di giffoni</option>
        <option value="Tonda gentile trilobata">Tonda gentile trilobata</option>
        <option value="Tonda romana">Tonda romana</option>
      </select>
      <p><strong>Prezzo di vendita: {prezzoPerKg} €/kg</strong></p>
      <h2 className="titolo-card">Stima Guadagno</h2>
      <p><strong>Guadagno lordo stimato:</strong></p>
      <p className="valore" id="stima-guadagno">{guadagnoStimato} €</p>
    </div>
  );
};

export default StimaGuadagno;
